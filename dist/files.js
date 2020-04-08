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
const fs_1 = require("fs");
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("./helpers");
const svg_to_jsx_1 = __importDefault(require("svg-to-jsx"));
// Get the template
exports.getTemplate = (srcFileName, external = false) => __awaiter(void 0, void 0, void 0, function* () {
    let currentPath = external
        ? srcFileName
        : path_1.default.join(__dirname, '../src/templates', srcFileName + '.template');
    try {
        return fs_1.promises.readFile(currentPath).then((file) => {
            return file.toString();
        });
    }
    catch (err) {
        console.warn(err);
    }
});
exports.FROM_TEMPLATE = (fileData, settings) => __awaiter(void 0, void 0, void 0, function* () {
    let template = yield exports.getTemplate(settings.template, true);
    return ejs_1.default.render(template, Object.assign(Object.assign({}, settings), { data: fileData, data_clean: helpers_1.removeAttrs(fileData.data, ['id', 'fill']), data_stripped: helpers_1.removeAttrs(helpers_1.removeTags(fileData.data, ['svg', 'title']), [
            'id',
            'fill'
        ]), name: fileData.name, title: helpers_1.PascalCase(fileData.name), title_lowercase: fileData.name.toLowerCase(), fileName: helpers_1.prefixedName(fileData.name, settings.prefix), componentName: helpers_1.PascalCase(helpers_1.prefixedName(fileData.name, settings.prefix)) }));
});
exports.STENCIL = {
    SPEC: (fileData, settings) => __awaiter(void 0, void 0, void 0, function* () {
        const currentFileName = helpers_1.prefixedName(fileData.name, settings.prefix);
        let template = yield exports.getTemplate('stencil_spec');
        return ejs_1.default.render(template, {
            title: helpers_1.PascalCase(currentFileName),
            filename: settings.prefix
                ? settings.prefix
                : `icon-${helpers_1.kebabCase(helpers_1.fileName(fileData.name))}`
        });
    }),
    E2E: (fileData, settings) => __awaiter(void 0, void 0, void 0, function* () {
        const currentFileName = helpers_1.prefixedName(fileData.name, settings.prefix);
        let template = yield exports.getTemplate('stencil_e2e');
        return ejs_1.default.render(template, {
            title: helpers_1.PascalCase(currentFileName),
            filename: settings.prefix
                ? settings.prefix
                : `icon-${helpers_1.kebabCase(helpers_1.fileName(fileData.name))}`
        });
    }),
    CSS: (fileData, settings) => __awaiter(void 0, void 0, void 0, function* () {
        let template = yield exports.getTemplate('stencil_css');
        return ejs_1.default.render(template);
    }),
    TSX: (fileData, settings) => __awaiter(void 0, void 0, void 0, function* () {
        const currentFileName = helpers_1.prefixedName(fileData.name, settings.prefix);
        let template = yield exports.getTemplate('stencil_tsx');
        return yield svg_to_jsx_1.default(fileData.data).then(function (jsx) {
            return ejs_1.default.render(template, {
                data: jsx,
                fileName: currentFileName,
                title_lowercase: helpers_1.kebabCase(helpers_1.fileName(fileData.name)),
                title: helpers_1.PascalCase(currentFileName)
            });
        });
    })
};
exports.REACT_MATERIAL = (fileData, options) => __awaiter(void 0, void 0, void 0, function* () {
    const currentFileName = helpers_1.prefixedName(fileData.name, options.prefix);
    let template = yield exports.getTemplate('react-material');
    return ejs_1.default.render(template, {
        data: helpers_1.removeTags(fileData.data, ['svg', 'title']),
        title: helpers_1.PascalCase(currentFileName)
    });
});
exports.REACT = (fileData, options) => __awaiter(void 0, void 0, void 0, function* () {
    const currentFileName = helpers_1.prefixedName(fileData.name, options.prefix);
    let template = yield exports.getTemplate('react');
    let svg = fileData.data;
    return yield svg_to_jsx_1.default(svg).then(function () {
        return ejs_1.default.render(template, {
            data: svg,
            title: helpers_1.PascalCase(currentFileName)
        });
    });
});
//# sourceMappingURL=files.js.map