import { SettingsType, TemplateFileType, ListFilesType } from '../types';
export declare const getListTemplates: (settings: SettingsType, type?: string) => Promise<TemplateFileType[]>;
export declare const buildLists: (settings: SettingsType, templates: TemplateFileType[]) => Promise<ListFilesType[]>;
export declare const writeLists: (settings: SettingsType, lists: ListFilesType[]) => Promise<void>;
export declare const createListType: (settings: SettingsType, type?: string) => Promise<void>;
