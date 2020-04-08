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
const ejs_1 = __importDefault(require("ejs"));
const helpers_1 = require("../helpers");
const svg_to_jsx_1 = __importDefault(require("svg-to-jsx"));
const get_1 = require("../get");
exports.STENCIL_SPEC = (fileData, settings) => __awaiter(void 0, void 0, void 0, function* () {
    const currentFileName = helpers_1.prefixedName(fileData.name, settings.prefix);
    let template = yield get_1.getTemplate('stencil_spec');
    return ejs_1.default.render(template, {
        title: helpers_1.PascalCase(currentFileName),
        filename: settings.prefix
            ? settings.prefix
            : `icon-${helpers_1.kebabCase(helpers_1.fileName(fileData.name))}`
    });
});
exports.STENCIL_E2E = (fileData, settings) => __awaiter(void 0, void 0, void 0, function* () {
    const currentFileName = helpers_1.prefixedName(fileData.name, settings.prefix);
    let template = yield get_1.getTemplate('stencil_e2e');
    return ejs_1.default.render(template, {
        title: helpers_1.PascalCase(currentFileName),
        filename: settings.prefix
            ? settings.prefix
            : `icon-${helpers_1.kebabCase(helpers_1.fileName(fileData.name))}`
    });
});
exports.STENCIL_CSS = (fileData, settings) => __awaiter(void 0, void 0, void 0, function* () {
    let template = yield get_1.getTemplate('stencil_css');
    return ejs_1.default.render(template, {
        settings: settings,
        file: fileData
    });
});
exports.STENCIL_TSX = (fileData, settings) => __awaiter(void 0, void 0, void 0, function* () {
    const currentFileName = helpers_1.prefixedName(fileData.name, settings.prefix);
    let template = yield get_1.getTemplate('stencil_tsx');
    return yield svg_to_jsx_1.default(fileData.data).then(function (jsx) {
        return ejs_1.default.render(template, {
            data: jsx,
            fileName: currentFileName,
            title_lowercase: helpers_1.kebabCase(helpers_1.fileName(fileData.name)),
            title: helpers_1.PascalCase(currentFileName)
        });
    });
});
//# sourceMappingURL=stencil.js.map