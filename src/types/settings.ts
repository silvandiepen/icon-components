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
	style: string;
}
export interface StyleFilesType {
	name: string;
	extension: string;
	data: string;
}
export interface ListFilesType {
	file: string;
	extension: string;
	data: string;
}

export interface SettingsType {
	src: string;
	dest: string;
	styleDir: string;
	prefix: string;
	optimize: boolean;
	removeOld: boolean;
	removePrefix: string;
	inRoot: boolean;
	stripStyle: boolean;
	files?: FilesType[];
	styles?: StyleFilesType[];
	error?: Array<string>;
	removeTags: Array<string>;
	removeAttrs: Array<string>;
	svgOnly: boolean;
	type: string;
	template: string;
	templates?: Array<TemplateFileType>;
	index: boolean;
	indexTemplate: string[];
	indexTemplates?: Array<TemplateFileType>;
	list: boolean;
	listTemplate: string[];
	listTemplates?: Array<TemplateFileType>;
}
