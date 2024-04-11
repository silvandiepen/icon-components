import { Payload, File, TemplateType, Template, ResultFile, ResultList } from "@/types";
import { createFile } from "../system";
import { constCase } from "@sil/case";
import { asyncForEach, fixJsx, svgDataOnly, removeNewLines, escapeQuotes, safeComponentName } from "@/utils";
import { join } from "path";
import { render } from "ejs";


const getListFileName = (args: {
    template: Template
}) => {
    let name = args.template.name.replace('.template', '').replace('.ejs', '');
    return name;
}


export const renderLists = async (args: {
    files: File[], payload: Payload
}): Promise<ResultList[]> => {
    const templates = args.payload.templates[TemplateType.LIST] || [];

    const files = templates.map((template) => {
        let renderedFile = ''
        try {
            renderedFile = render(template.content, {
                files: args.files,
                fixJsx,
                constCase,
                svgDataOnly,
                removeNewLines,
                escapeQuotes,
                safeComponentName
            });
        } catch (e) {
            console.log(e);
        }

        return {
            template,
            fileName: getListFileName({ template }),
            files: args.files,
            list: renderedFile
        }
    });
    return files;

    // return [];
}




export const writeListFiles = async (args: {
    payload: Payload
}): Promise<{
    data: ResultFile[],
    error: string[]
}> => {

    const errors = [];
    const allFiles = [];
    const { files } = args.payload;

    const renderedLists = await renderLists({ files, payload: args.payload });

    await asyncForEach(renderedLists, async (f) => {

        const destFile = join(process.cwd(), args.payload.settings.dest + '/' + f.fileName);
        const destContent = f.list;

        await createFile({ path: destFile, content: destContent }).then((r) => {
            if (r.error.length) r.error.forEach((err) => errors.push(err));

            allFiles.push(f);
        });
    });

    return {
        data: allFiles,
        error: errors
    }

}