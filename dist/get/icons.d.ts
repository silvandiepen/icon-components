import { SettingsType, FilesType } from '../types';
export declare const getData: (settings: SettingsType) => Promise<SettingsType>;
export declare const getFiles: (settings: SettingsType) => Promise<SettingsType>;
export declare const getFileList: (settings: SettingsType) => Promise<FilesType[]>;
