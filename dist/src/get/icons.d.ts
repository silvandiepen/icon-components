import { SettingsType, FilesType, FilesDataType } from '@/types';
export declare const getData: (settings: SettingsType) => Promise<SettingsType>;
export declare const getFiles: (settings: SettingsType) => Promise<SettingsType>;
export declare const getFileData: (filedata: FilesDataType, srcFileName: string) => Promise<any>;
export declare const getSizes: (file: string) => {
    width: number;
    height: number;
};
export declare const getFileList: (settings: SettingsType) => Promise<FilesType[]>;
