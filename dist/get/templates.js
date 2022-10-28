"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileTemplates = void 0;
const path_1 = __importDefault(require("path"));
const fs = require('fs').promises;
const helpers_1 = require("../helpers");
/*
  When there is no Template given, but a type. The templates will be gotten from the package.
*/
const getLocalTemplates = async (settings) => {
    if (!settings.type)
        return;
    let templates = [];
    try {
        let localTemplateDir = await fs.readdir(path_1.default.join(__dirname, '../../src/templates', settings.type));
        await (0, helpers_1.asyncForEach)(localTemplateDir, async (template) => {
            let fileData = await fs.readFile(path_1.default.join(__dirname, '../../src/templates/', settings.type, template));
            templates.push({
                file: template,
                data: fileData.toString()
            });
        });
        return templates;
    }
    catch (err) {
        console.error('Type does not exist');
    }
};
/*
  Get all templates.
*/
const getFileTemplates = async (settings) => {
    if (settings.template == null) {
        return await getLocalTemplates(settings);
    }
    let templates = [];
    const stats = await fs.lstat(settings.template);
    if (stats.isDirectory()) {
        let templateFiles = await fs.readdir(settings.template);
        await (0, helpers_1.asyncForEach)(templateFiles, async (template) => {
            let fileData = await fs.readFile(path_1.default.join(settings.template, template));
            templates.push({
                file: template,
                data: fileData.toString()
            });
        });
    }
    else {
        let fileData = await fs.readFile(path_1.default.join(settings.template)
        // path.join(__dirname, '../../', settings.template)
        );
        templates.push({
            file: settings.template,
            data: fileData.toString()
        });
    }
    return templates;
};
exports.getFileTemplates = getFileTemplates;
//# sourceMappingURL=templates.js.map