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
const path_1 = __importDefault(require("path"));
const fs = require('fs').promises;
const helpers_1 = require("../helpers");
/*
  When there is no Template given, but a type. The templates will be gotten from the package.
*/
const getLocalTemplates = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    if (!settings.type)
        return;
    let templates = [];
    try {
        let localTemplateDir = yield fs.readdir(path_1.default.join(__dirname, '../../src/templates', settings.type));
        yield helpers_1.asyncForEach(localTemplateDir, (template) => __awaiter(void 0, void 0, void 0, function* () {
            let fileData = yield fs.readFile(path_1.default.join(__dirname, '../../src/templates/', settings.type, template));
            templates.push({
                file: template,
                data: fileData.toString()
            });
        }));
        return templates;
    }
    catch (err) {
        console.error('Type does not exist');
    }
});
/*
  Get all templates.
*/
exports.getFileTemplates = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    if (settings.template == null) {
        return yield getLocalTemplates(settings);
    }
    let templates = [];
    const stats = yield fs.lstat(settings.template);
    if (stats.isDirectory()) {
        let templateFiles = yield fs.readdir(settings.template);
        yield helpers_1.asyncForEach(templateFiles, (template) => __awaiter(void 0, void 0, void 0, function* () {
            let fileData = yield fs.readFile(path_1.default.join(settings.template, template));
            templates.push({
                file: template,
                data: fileData.toString()
            });
        }));
    }
    else {
        let fileData = yield fs.readFile(path_1.default.join(settings.template)
        // path.join(__dirname, '../../', settings.template)
        );
        templates.push({
            file: settings.template,
            data: fileData.toString()
        });
    }
    return templates;
});
//# sourceMappingURL=templates.js.map