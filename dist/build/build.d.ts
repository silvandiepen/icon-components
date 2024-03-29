import { SettingsType, TemplateFileType, WriteFileType } from '@/types';
export declare const writeAFile: (settings: SettingsType, file: WriteFileType) => Promise<void>;
export declare const CombineTemplateWithData: (file: any, template: TemplateFileType, settings: SettingsType) => Promise<string>;
export declare const startBuild: (settings: SettingsType) => Promise<void>;
export declare const buildComponents: (settings: SettingsType) => Promise<void>;
export declare const buildFiles: (settings: SettingsType) => Promise<SettingsType>;
