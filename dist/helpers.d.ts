export declare const WAIT: () => Promise<unknown>;
export declare const asyncForEach: (array: any, callback: any) => Promise<void>;
export declare const kebabCase: (str: string) => string;
export declare const fileName: (str: string, settings?: any) => string;
export declare const PascalCase: (str: string) => string;
export declare const removeTags: (str: string, tags: string | string[]) => string;
export declare const removeAttrs: (str: any, attrs: string | string[]) => string;
export declare const prefixedName: (name: string, prefix: string) => string;
