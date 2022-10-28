"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIndexes = exports.createLists = exports.writeLists = exports.buildLists = exports.getIndexTemplates = exports.getListTemplates = void 0;
const path_1 = require("path");
const { readdir, readFile, lstat } = require('fs').promises;
const ejs_1 = __importDefault(require("ejs"));
const helpers_1 = require("../helpers");
const cli_block_1 = require("cli-block");
const build_1 = require("../build");
const case_1 = require("@sil/case");
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
const getListTemplates = async (settings) => {
    if (settings.listTemplate[0] == null || settings.listTemplate.length < 1)
        return await getLocalTemplates('../../src/templates/list');
    const templates = getTemplateFiles(settings.listTemplate);
    return templates;
};
exports.getListTemplates = getListTemplates;
const getIndexTemplates = async (settings) => {
    if (settings.indexTemplate[0] == null || settings.indexTemplate.length < 1)
        return await getLocalTemplates('../../src/templates/index');
    const templates = getTemplateFiles(settings.indexTemplate);
    return templates;
};
exports.getIndexTemplates = getIndexTemplates;
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
        await (0, build_1.writeAFile)(settings, file);
        (0, cli_block_1.blockLineSuccess)(file.name);
    });
};
exports.writeLists = writeLists;
const createLists = async (settings) => {
    if (!settings.list)
        return;
    (0, cli_block_1.blockMid)('Lists');
    settings.inRoot = true;
    const templates = await (0, exports.getListTemplates)(settings);
    const files = await (0, exports.buildLists)(settings, templates);
    await (0, exports.writeLists)(settings, files);
};
exports.createLists = createLists;
const createIndexes = async (settings) => {
    if (!settings.index)
        return;
    (0, cli_block_1.blockMid)('Indexes');
    settings.inRoot = true;
    const templates = await (0, exports.getIndexTemplates)(settings);
    const files = await (0, exports.buildLists)(settings, templates);
    await (0, exports.writeLists)(settings, files);
};
exports.createIndexes = createIndexes;
//# sourceMappingURL=list.js.map