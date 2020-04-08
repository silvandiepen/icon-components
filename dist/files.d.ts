export declare const getTemplate: (srcFileName: string, external?: boolean) => Promise<string>;
export declare const FROM_TEMPLATE: (fileData: any, settings: any) => Promise<any>;
export declare const STENCIL: {
    SPEC: (fileData: any, settings: any) => Promise<any>;
    E2E: (fileData: any, settings: any) => Promise<any>;
    CSS: (fileData: any, settings: any) => Promise<any>;
    TSX: (fileData: any, settings: any) => Promise<any>;
};
export declare const REACT_MATERIAL: (fileData: any, options: any) => Promise<any>;
export declare const REACT: (fileData: any, options: any) => Promise<any>;
