import { SettingsType, StyleFilesType } from '../types';
export declare const getStyleData: (settings: SettingsType, name: string, filedata: string) => {
    data: string;
    ext: string;
};
export declare const getStyleFileList: (settings: SettingsType) => Promise<StyleFilesType[]>;
export declare const getStyles: (settings: SettingsType) => Promise<SettingsType>;
