export declare const WAIT: (time?: number) => Promise<unknown>;
export declare const asyncForEach: (array: any, callback: any) => Promise<void>;
export declare const fileName: (str: string, settings?: any) => string;
export declare const removeTags: (str: string, tags: Array<string>) => string;
export declare const asyncRemoveTags: (str: string, tags: Array<string>) => Promise<string>;
export declare const removeAttrs: (str: string, attrs: Array<string>) => string;
export declare const asyncRemoveAttrs: (str: string, attrs: Array<string>) => Promise<string>;
export declare const svgOnly: (str: string) => string;
export declare const prefixedName: (name: string, prefix: string) => string;
export declare const getExtension: (file: string) => string;
export declare const fixJsx: (str: string) => string;
export declare const createAFolder: (dir: string) => Promise<void>;
export declare const getTagData: (str: string, tag: string) => string;
export declare const formatFile: (str: string, ext: string) => string;
export declare const dirExist: (dir: string) => boolean;
