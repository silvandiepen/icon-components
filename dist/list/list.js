"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const getLocalTemplates = (dir) => __awaiter(void 0, void 0, void 0, function* () {
    let templates = [];
    try {
        let localTemplateDir = yield readdir((0, path_1.join)(__dirname, dir));
        yield (0, helpers_1.asyncForEach)(localTemplateDir, (template) => __awaiter(void 0, void 0, void 0, function* () {
            let fileData = yield readFile((0, path_1.join)(__dirname, dir, template));
            templates.push({
                file: template,
                data: fileData.toString()
            });
        }));
        return templates;
    }
    catch (error) {
        (0, cli_block_1.blockErrors)(["Couldn't get the template ", error]);
    }
});
const getTemplateFiles = (list) => __awaiter(void 0, void 0, void 0, function* () {
    let templates = [];
    yield (0, helpers_1.asyncForEach)(list, (templateFile) => __awaiter(void 0, void 0, void 0, function* () {
        const stats = yield lstat(templateFile);
        if (stats.isDirectory()) {
            let templateFiles = yield readdir(templateFile);
            try {
                yield (0, helpers_1.asyncForEach)(templateFiles, (template) => __awaiter(void 0, void 0, void 0, function* () {
                    let fileData = yield readFile((0, path_1.join)(templateFile, template));
                    templates.push({
                        file: template,
                        data: fileData.toString()
                    });
                }));
            }
            catch (error) {
                (0, cli_block_1.blockErrors)(["Couldn't get the template ", error, templateFiles]);
            }
        }
        else {
            try {
                let fileData = yield readFile(templateFile);
                templates.push({
                    file: templateFile,
                    data: fileData.toString()
                });
            }
            catch (error) {
                (0, cli_block_1.blockErrors)(["Couldn't get the template ", error, templateFile]);
            }
        }
    }));
    return templates;
});
const getListTemplates = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    if (settings.listTemplate[0] == null || settings.listTemplate.length < 1)
        return yield getLocalTemplates('../../src/templates/list');
    const templates = getTemplateFiles(settings.listTemplate);
    return templates;
});
exports.getListTemplates = getListTemplates;
const getIndexTemplates = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    if (settings.indexTemplate[0] == null || settings.indexTemplate.length < 1)
        return yield getLocalTemplates('../../src/templates/index');
    const templates = getTemplateFiles(settings.indexTemplate);
    return templates;
});
exports.getIndexTemplates = getIndexTemplates;
const buildLists = (settings, templates) => __awaiter(void 0, void 0, void 0, function* () {
    let files = [];
    try {
        yield (0, helpers_1.asyncForEach)(templates, (template) => {
            files.push({
                name: (0, helpers_1.fileName)(template.file),
                ext: (0, helpers_1.getExtension)(template.file),
                data: ejs_1.default.render(template.data, Object.assign(Object.assign({}, settings), { PascalCase: case_1.PascalCase,
                    kebabCase: case_1.kebabCase,
                    upperSnakeCase: case_1.upperSnakeCase }))
            });
        });
    }
    catch (error) {
        console.warn(error);
    }
    return files;
});
exports.buildLists = buildLists;
const writeLists = (settings, lists) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, helpers_1.asyncForEach)(lists, (file) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, build_1.writeAFile)(settings, file);
        (0, cli_block_1.blockLineSuccess)(file.name);
    }));
});
exports.writeLists = writeLists;
const createLists = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    if (!settings.list)
        return;
    (0, cli_block_1.blockMid)('Lists');
    settings.inRoot = true;
    const templates = yield (0, exports.getListTemplates)(settings);
    const files = yield (0, exports.buildLists)(settings, templates);
    yield (0, exports.writeLists)(settings, files);
});
exports.createLists = createLists;
const createIndexes = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    if (!settings.index)
        return;
    (0, cli_block_1.blockMid)('Indexes');
    settings.inRoot = true;
    const templates = yield (0, exports.getIndexTemplates)(settings);
    const files = yield (0, exports.buildLists)(settings, templates);
    yield (0, exports.writeLists)(settings, files);
});
exports.createIndexes = createIndexes;
//# sourceMappingURL=list.js.map