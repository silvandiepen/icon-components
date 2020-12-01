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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs = require('fs').promises;
const ejs_1 = __importDefault(require("ejs"));
const helpers_1 = require("../helpers");
const clog = __importStar(require("cli-block"));
const build_1 = require("../build");
/*
  When there is no Template given, but a type. The templates will be gotten from the package.
*/
const getLocalListTemplates = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    let templates = [];
    try {
        let localTemplateDir = yield fs.readdir(path_1.join(__dirname, '../../src/templates/list'));
        yield helpers_1.asyncForEach(localTemplateDir, (template) => __awaiter(void 0, void 0, void 0, function* () {
            let fileData = yield fs.readFile(path_1.join(__dirname, '../../src/templates/list', template));
            templates.push({
                file: template,
                data: fileData.toString()
            });
        }));
        return templates;
    }
    catch (err) {
        clog.BLOCK_ERRORS(["Couldn't get the template ", err]);
    }
});
exports.getListTemplates = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    if (settings.listTemplate[0] == null || settings.listTemplate.length < 1)
        return yield getLocalListTemplates(settings);
    let templates = [];
    yield helpers_1.asyncForEach(settings.listTemplate, (templateFile) => __awaiter(void 0, void 0, void 0, function* () {
        const stats = yield fs.lstat(templateFile);
        if (stats.isDirectory()) {
            let templateFiles = yield fs.readdir(templateFile);
            try {
                yield helpers_1.asyncForEach(templateFiles, (template) => __awaiter(void 0, void 0, void 0, function* () {
                    let fileData = yield fs.readFile(path_1.join(templateFile, template));
                    templates.push({
                        file: template,
                        data: fileData.toString()
                    });
                }));
            }
            catch (error) {
                throw new Error(error);
            }
        }
        else {
            try {
                let fileData = yield fs.readFile(templateFile);
                templates.push({
                    file: templateFile,
                    data: fileData.toString()
                });
            }
            catch (error) {
                throw new Error(error);
            }
        }
    }));
    return templates;
});
exports.buildLists = (settings, templates) => __awaiter(void 0, void 0, void 0, function* () {
    let files = [];
    yield helpers_1.asyncForEach(templates, (template) => {
        files.push({
            name: helpers_1.fileName(template.file),
            ext: helpers_1.getExtension(template.file),
            data: ejs_1.default.render(template.data, settings)
        });
    });
    return files;
});
exports.writeLists = (settings, lists) => __awaiter(void 0, void 0, void 0, function* () {
    yield helpers_1.asyncForEach(lists, (file) => __awaiter(void 0, void 0, void 0, function* () {
        yield build_1.writeFile(settings, file);
        clog.BLOCK_LINE_SUCCESS(file.name);
    }));
});
exports.createLists = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    if (!settings.list)
        return settings;
    clog.BLOCK_MID('Lists');
    settings.inRoot = true;
    const templates = yield exports.getListTemplates(settings);
    const lists = yield exports.buildLists(settings, templates);
    yield exports.writeLists(settings, lists);
    return settings;
});
//# sourceMappingURL=list.js.map