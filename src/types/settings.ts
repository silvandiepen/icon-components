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
	dest?: string;
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
	inRoot: boolean;
	stripStyle: boolean;
	files?: FilesType[];
	styles?: StyleFilesType[];
	error?: Array<string>;
	removeOld: boolean;
	removePrefix: string;
	removeAffix: string;
	removeString: string;
	removeTags: Array<string>;
	removeAttrs: Array<string>;
	removeStyle: boolean;
	svgOnly: boolean;
	copy: string[];
	template: string;
	templates?: Array<TemplateFileType>;
	index: boolean;
	indexTemplate: string[];
	indexTemplates?: Array<TemplateFileType>;
	list: boolean;
	listTemplate: string[];
	listTemplates?: Array<TemplateFileType>;
	types: boolean;
	typesTemplate: string[];
	typesTemplates?: Array<TemplateFileType>;
	parentIndex: boolean;
	prependLine: string;
	iconFolder: string;
	filter: string;
}
