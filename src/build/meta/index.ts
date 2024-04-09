import { extname, join } from "path";
import { constCase, pascalCase, slugCase } from "@sil/case";

import { FileMeta, Payload, TemplateType } from "@/types"
import { toArray } from "@/utils";

export const getAttributeValue = (data: string, attribute: string): string => {
    const regex = new RegExp(`${attribute}="(.*?)"`);
    const match = data.match(regex);
    return match ? match[1] : "";
}

export const getFileMeta = (args: {
    fileData: string,
    pathName: string, payload: Payload
}): FileMeta => {

    const { inRoot, dest } = args.payload.settings;
    const { pathName, payload } = args;

    const ogFileName = pathName.split("/").pop() || "";
    const ogFilePath = pathName; ``


    // Replacers for file name
    const fixedFileName = toArray(payload.settings.replace).reduce((acc, cur) => {
        return acc.replace(cur, "");
    }, ogFileName).split(".")[0];


    const width = getAttributeValue(args.fileData, "width");
    const height = getAttributeValue(args.fileData, "height");
    const viewBox = getAttributeValue(args.fileData, "viewBox");

    const fileName = slugCase(fixedFileName);
    const extension = extname(ogFileName);
    const fileDirectoryPath = join(process.cwd(), dest, inRoot ? '' : fileName);
    const componentName = pascalCase(fileName);
    const constName = constCase(fileName);
    const template = payload.templates[TemplateType.COMPONENT];


    return {
        width, 
        height, 
        viewBox,
        ogFilePath,
        ogFileName,
        componentName,
        constName,
        fileName,
        fileDirectoryPath,
        extension,
        template,
    }
}