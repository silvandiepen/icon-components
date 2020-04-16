export declare const WAIT: (time?: number) => Promise<unknown>;
export declare const asyncForEach: (array: any, callback: any) => Promise<void>;
export declare const fileName: (str: string, settings?: any) => string;
export declare const removeTags: (str: string, tags: string[]) => string;
export declare const removeAttrs: (str: any, attrs: string[]) => string;
export declare const prefixedName: (name: string, prefix: string) => string;
export declare const getExtension: (file: string) => string;
export declare const fixJsx: (str: string) => string;
