"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListType = exports.writeLists = exports.buildLists = exports.getListTemplates = void 0;
const path_1 = require("path");
const cli_block_1 = require("cli-block");
const case_1 = require("@sil/case");
const { readdir, readFile, lstat } = require('fs').promises;
const ejs_1 = __importDefault(require("ejs"));
const helpers_1 = require("@/helpers");
const build_1 = require("@/build");
/*
  When there is no Template given, but a type. The templates will be gotten from the package.
*/
const getLocalTemplates = async (dir) => {
    let templates = [];
    try {
        let localTemplateDir = await readdir((0, path_1.join)(__dirname, dir));
        await (0, helpers_1.asyncForEach)(localTemplateDir, async (template) => {
            let fileData = await readFile((0, path_1.join)(__dirname, dir, template));
            templates.push({
                file: template,
                data: fileData.toString()
            });
        });
        return templates;
    }
    catch (error) {
        (0, cli_block_1.blockErrors)(["Couldn't get the template ", error]);
    }
};
const getTemplateFiles = async (list) => {
    let templates = [];
    await (0, helpers_1.asyncForEach)(list, async (templateFile) => {
        const stats = await lstat(templateFile);
        if (stats.isDirectory()) {
            let templateFiles = await readdir(templateFile);
            try {
                await (0, helpers_1.asyncForEach)(templateFiles, async (template) => {
                    let fileData = await readFile((0, path_1.join)(templateFile, template));
                    templates.push({
                        file: template,
                        data: fileData.toString()
                    });
                });
            }
            catch (error) {
                (0, cli_block_1.blockErrors)(["Couldn't get the template ", error, templateFiles]);
            }
        }
        else {
            try {
                let fileData = await readFile(templateFile);
                templates.push({
                    file: templateFile,
                    data: fileData.toString()
                });
            }
            catch (error) {
                (0, cli_block_1.blockErrors)(["Couldn't get the template ", error, templateFile]);
            }
        }
    });
    return templates;
};
const getListTemplates = async (settings, type = 'list') => {
    let listTemplate = [];
    switch (type) {
        case 'list':
            listTemplate = settings.listTemplate;
            break;
        case 'index':
            listTemplate = settings.indexTemplate;
            break;
        case 'types':
            listTemplate = settings.typesTemplate;
            break;
    }
    if (listTemplate[0] == null || listTemplate.length < 1) {
        const templateDir = `../../src/templates/${type}`;
        return await getLocalTemplates(templateDir);
    }
    return await getTemplateFiles(listTemplate);
};
exports.getListTemplates = getListTemplates;
const buildLists = async (settings, templates) => {
    let files = [];
    try {
        await (0, helpers_1.asyncForEach)(templates, (template) => {
            files.push({
                name: (0, helpers_1.fileName)(template.file),
                ext: (0, helpers_1.getExtension)(template.file),
                data: ejs_1.default.render(template.data, {
                    ...settings,
                    PascalCase: case_1.PascalCase,
                    kebabCase: case_1.kebabCase,
                    upperSnakeCase: case_1.upperSnakeCase
                })
            });
        });
    }
    catch (error) {
        console.warn(error);
    }
    return files;
};
exports.buildLists = buildLists;
const writeLists = async (settings, lists) => {
    await (0, helpers_1.asyncForEach)(lists, async (file) => {
        // console.log(file);
        await (0, build_1.writeAFile)(settings, {
            ...file,
            name: (0, path_1.basename)(file.name).replace((0, path_1.extname)(file.name), '')
        });
        (0, cli_block_1.blockLineSuccess)(file.name);
    });
};
exports.writeLists = writeLists;
const createListType = async (settings, type = 'list') => {
    if (!settings[type])
        return;
    (0, cli_block_1.blockMid)(type);
    const templates = await (0, exports.getListTemplates)(settings, type);
    const files = await (0, exports.buildLists)(settings, templates);
    await (0, exports.writeLists)(settings, files);
};
exports.createListType = createListType;
// export const createLists = async (settings: SettingsType): Promise<void> => {
// 	if (!settings.list) return;
// 	blockMid('Lists');
// 	settings.inRoot = true;
// 	const templates = await getListTemplates(settings);
// 	const files = await buildLists(settings, templates);
// 	await writeLists(settings, files);
// };
// export const createIndexes = async (settings: SettingsType): Promise<void> => {
// 	if (!settings.index) return;
// 	blockMid('Indexes');
// 	settings.inRoot = true;
// 	const templates = await getIndexTemplates(settings);
// 	const files = await buildLists(settings, templates);
// 	await writeLists(settings, files);
// };
// export const createTypes = async (settings: SettingsType): Promise<void> => {
// 	if (!settings.types) return;
// 	blockMid('Types');
// 	settings.inRoot = true;
// 	const templates = await getTypesTemplates(settings);
// 	const files = await buildLists(settings, templates);
// 	await writeLists(settings, files);
// };
//# sourceMappingURL=list.js.map