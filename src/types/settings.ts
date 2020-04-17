export interface TemplateFileType {
	file: string;
	data: string;
}

export interface FilesDataType {
	src: string;
}
export interface WriteFileType {
	data: any;
	ext: string;
	name?: string;
	path?: string;
}

export interface DataCleanedType {
	attrs: string;
	tags: string;
	both: string;
}

export interface FilesType {
	og_name: string;
	name: string;
	data: any;
	title: string;
	title_lowercase: string;
	fileName: string;
	componentName: string;
	data_clean: DataCleanedType;
}
export interface ListFilesType {
	file: string;
	extension: string;
	data: string;
}

export interface SettingsType {
	src: string;
	dest: string;
	list: boolean;
	listTemplate: string;
	listTemplates?: Array<TemplateFileType>;
	prefix: string;
	optimize: boolean;
	removeOld: boolean;
	template: string;
	templates?: Array<TemplateFileType>;
	inRoot: boolean;
	type: string;
	files?: FilesType[];
	error?: Array<string>;
	removeTags: Array<string>;
	removeAttrs: Array<string>;
}
