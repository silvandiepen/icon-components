import { type Payload, type Template, TemplateType } from "@/types";
import { getFile } from "@/build/system";
import { toArray } from "@/utils";
import { extname, join } from "path";

interface TemplateLoad {
    data: {
        [keyof in TemplateType]: Template[]
    },
    error: string[]
}

export const getTemplate = async (type: TemplateType, payload: Payload): Promise<TemplateLoad> => {
    let templateArray = [];
    let templateErrors = [];

    const { settings } = payload;

    switch (type) {
        case TemplateType.COMPONENT:
            templateArray = toArray(settings.componentTemplate);
            break;
        case TemplateType.LIST:
            templateArray = toArray(settings.listTemplate);
            break;

    }
    const templates = [];

    for (const template of templateArray) {

        let templateFile = template;
        let newFileName = '';
        if(template.includes('=')){
             [templateFile, newFileName] = template.split('=');
        }

        const templateFilePath = join(__dirname, "../", templateFile);

        const { data, error } = await getFile(templateFilePath, payload);

        if (error) {

            error.forEach((err) => {
                templateErrors.push(err);
            });
        }
        if (data) {
            templates.push({
                name: data.name,
                path: data.path,
                fileName: newFileName || data.name,
                content: data.content,
                type: TemplateType.COMPONENT,
                extension: extname(data.name.replace('.template', '').replace('.ejs', ''))
            });
        }
    }

    const returnData = {};
    returnData[type] = templates;

    return {
        data: returnData,
        error: templateErrors
    }

}

export const getComponentTemplates = async (payload: Payload): Promise<TemplateLoad> => {
    return getTemplate(TemplateType.COMPONENT, payload);
}
export const getListTemplates = async (payload: Payload): Promise<TemplateLoad> => {
    return getTemplate(TemplateType.LIST, payload);
}

export const getTemplates = async (payload: Payload): Promise<TemplateLoad
> => {
    const componentTemplates = await getComponentTemplates(payload);
    // const indexTemplates = await getIndexTemplates(payload);
    const listTemplates = await getListTemplates(payload);
    // const typeTemplates = await getTypeTemplates(payload);

    const errors = [componentTemplates.error, listTemplates.error].flat() as string[];

    return {
        data: {
            [TemplateType.COMPONENT]: componentTemplates.data[TemplateType.COMPONENT],
            [TemplateType.LIST]: listTemplates.data[TemplateType.LIST],
        },
        error: errors
    }
}