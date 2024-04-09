import { readFile, stat, mkdir, readdir, writeFile } from "fs/promises"
import { extname } from "path";

import { type File, type Payload } from "@/types";
import { removeAttributes, removeTags, toArray } from "@/utils";
import { getFileMeta } from "@/build/meta";

export const createFolder = async (path: string): Promise<{
    data: string, error: string[]
}> => {
    try {
        await mkdir(path, { recursive: true });
        return {
            data: path,
            error: []
        }
    } catch (error) {
        return {
            data: undefined,
            error: [`Error creating folder: ${path}`]
        }
    }
}


export const folderExists = async (path: string): Promise<boolean> => {
    try {
        const stats = await stat(path);
        return stats.isDirectory();
    } catch (error) {
        return false;
    }
}

export const fileExists = async (path: string): Promise<boolean> => {
    try {
        const stats = await stat(path);
        return stats.isFile();
    } catch (error) {
        return false;
    }
}

export const getStyleFile = async (args: { path: string, payload: Payload }): Promise<string> => {

    const fileWithoutExtension = args.path.replace('.svg', '');
    const stylePath = `${fileWithoutExtension}.css`;

    if (await fileExists(stylePath)) {
        try {
            const file = await readFile(stylePath, "utf-8");
            return file;
        } catch (error) {
            return "";
        }
    }
}


export const getFile = async (path: string, payload: Payload): Promise<{ data: File, error: string[] }> => {
    const errors = [];
    const exists = await fileExists(path);
    let fileData = "";

    if (exists) {
        try {
            fileData = await readFile(path, "utf-8");
        } catch (error) {
            errors.push(`Error reading file: ${path}`);
        }


        if (payload.settings.removeTags.length) {
            fileData = removeTags(fileData, payload.settings.removeTags);
        }
        if (payload.settings.removeAttributes.length) {
            fileData = removeAttributes(fileData, payload.settings.removeAttributes);
        }

        const style = await getStyleFile({ path, payload });


        return {
            data: {
                name: path.split("/").pop() || "",
                path: path,
                content: fileData,
                style,
                meta: getFileMeta({ fileData, pathName: path, payload })
            } as File,
            error: errors
        }

    } else {
        errors.push(`File does not exist: ${path}`);
        return {
            data: undefined,
            error: errors,
        };
    }

}




export const getFiles = async (args: { payload: Payload }): Promise<{ data: File[], error: string[] }> => {

    const { payload } = args;
    const { filter } = payload.settings;

    const errors = [];
    const files: File[] = [];
    const path = payload.settings.src;
    const exists = await folderExists(path);

    if (!exists) {
        errors.push(`Folder does not exist: ${path}`);
        return {
            data: files,
            error: errors
        }
    }

    const allFiles = await readdir(path);

    for (const file of allFiles) {

        // Only get SVG files
        if (extname(file) !== '.svg') {
            continue;
        }

        // Skip files that match the filter
        if (toArray(filter).length && toArray(filter).some((f) => file.includes(f))) {
            continue;
        }

        const { data, error } = await getFile(`${path}/${file}`, payload);

        if (error) {
            error.forEach((err) => errors.push(err));
        }
        if (data) {


            files.push({
                ...data
            });
        }
    }

    return {
        data: files,
        error: errors
    }
}

export const createFile = async (args: { path: string, content: string }): Promise<{
    data: string,
    error: string[]
}> => {
    const errors = [];


    const { path, content } = args;

    try {
        const pathWithoutFile = path.split("/").slice(0, -1).join("/");

        await createFolder(pathWithoutFile);
        await writeFile(path, content);
        return {
            data: content,
            error: errors

        }
    } catch (error) {
        return {
            data: undefined,
            error: [`Error creating file: ${path}`, error]
        }
    }
}
