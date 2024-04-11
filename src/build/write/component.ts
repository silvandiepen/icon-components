import { Payload, File, TemplateType, Template, ResultFile } from "@/types";
import { createFile } from "../system";
import { asyncForEach, escapeQuotes, fixJsx, svgDataOnly, removeNewLines, safeComponentName } from "@/utils";
import { join } from "path";
import ejs from "ejs";


const removeTemplate = (name: string) => {
    return name.replace('.template', '').replace('.ejs', '');
}
const replaceMeta = (name: string, meta: File['meta']) => {
    let done = false;
    let newName = name;

    while (!done) {
        const replaceKey = newName.match(/\[(.*?)\]/)?.[1] || '';
        if (replaceKey && meta[replaceKey]) {
            newName = newName.replace(`[${replaceKey}]`, meta[replaceKey]);
        } else {
            done = true;
        }
    }
    return newName;
}




const getComponentFileName = (args: {
    file: File,
    template: Template
}) => {

    const name = replaceMeta(removeTemplate(args.file.meta.fileName), args.file.meta);

    return name+args.template.extension;

}


export const renderComponents = async (args: {
    file: File, payload: Payload
}): Promise<ResultFile[]> => {
    const templates = args.payload.templates[TemplateType.COMPONENT] || [];

    const files = templates.map((template) => {
        return {
            template,
            fileName: getComponentFileName({ file: args.file, template }),
            file: args.file,
            component: ejs.render(template.content, {
                ...args.file.meta,
                svg: args.file.content,
                fixJsx,
                svgDataOnly,
                removeNewLines,
                escapeQuotes,
                safeComponentName
            }),
        }
    });
    return files;
}




export const writeComponentFiles = async (args: {
    payload: Payload
}): Promise<{
    data: ResultFile[],
    error: string[]
}> => {

    const errors = [];
    const allFiles = [];
    const { files } = args.payload;

    await asyncForEach(files, async (file) => {

        const renderedComponents = await renderComponents({ file, payload: args.payload });

        await asyncForEach(renderedComponents, async (f) => {

            await createFile({ path: join(f.file.meta.fileDirectoryPath, f.fileName), content: f.component }).then((r) => {
                if (r.error.length) r.error.forEach((err) => errors.push(err));

                allFiles.push(f);
            });
        });
    });

    return {
        data: allFiles,
        error: errors
    }

}