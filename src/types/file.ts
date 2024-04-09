import { Template } from "./templates";

export interface FileMeta {
    ogFilePath: string;
    ogFileName: string;
    componentName: string;
    constName: string;
    fileName: string;
    fileDirectoryPath: string;
    extension: string;
    template: Template[];
    width: number | string;
    height: number | string;
    viewBox: string;
}

export interface File {
    name: string;
    path: string;
    content: string;
    extension: string;
    style: string;
    meta: FileMeta
}

export interface ResultFile {
    template: Template,
    fileName: string,
    file: File,
    component: string
}

export interface ResultList {
    template: Template,
    fileName: string,
    files: File[],
    list: string
}
