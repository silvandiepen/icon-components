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
exports.formatFile = exports.getTagData = exports.createAFolder = exports.fixJsx = exports.getExtension = exports.prefixedName = exports.svgOnly = exports.asyncRemoveAttrs = exports.removeAttrs = exports.asyncRemoveTags = exports.removeTags = exports.fileName = exports.asyncForEach = exports.WAIT = void 0;
const path_1 = __importDefault(require("path"));
const { mkdir } = require('fs').promises;
const prettier_1 = require("prettier");
const case_1 = require("@sil/case");
const WAIT = (time = 0) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, time);
    });
});
exports.WAIT = WAIT;
const asyncForEach = (array, callback) => __awaiter(void 0, void 0, void 0, function* () {
    for (let index = 0; index < array.length; index++) {
        yield callback(array[index], index, array);
    }
});
exports.asyncForEach = asyncForEach;
const fileName = (str, settings = null) => {
    if (settings)
        return `${settings.prefix}${path_1.default
            .basename(str)
            .replace('.template', '')
            .replace(path_1.default.extname(str), '')}`;
    else
        return `${path_1.default
            .basename(str)
            .replace('.template', '')
            .replace(path_1.default.extname(str), '')}`;
};
exports.fileName = fileName;
const tagsRegex = (tag) => new RegExp(`<[\/]{0,1}(${tag}|${tag})[^><]*>`, 'g');
const removeTags = (str, tags) => {
    tags.forEach((tag) => {
        str = str.replace(tagsRegex(tag), '');
    });
    return str;
};
exports.removeTags = removeTags;
const asyncRemoveTags = (str, tags) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.asyncForEach)(tags, (tag) => {
        str = str.replace(tagsRegex(tag), '');
    });
    return str;
});
exports.asyncRemoveTags = asyncRemoveTags;
const attrRegex = (attr) => new RegExp(` ${attr}="[^"]*"`, 'gi');
const removeAttrs = (str, attrs) => {
    attrs.forEach((attr) => {
        str = str.replace(attrRegex(attr), '');
    });
    return str;
};
exports.removeAttrs = removeAttrs;
const asyncRemoveAttrs = (str, attrs) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.asyncForEach)(attrs, (attr) => {
        str = str.replace(attrRegex(attr), '');
    });
    return str;
});
exports.asyncRemoveAttrs = asyncRemoveAttrs;
const svgOnly = (str) => {
    return str.substring(str.indexOf('<svg'), str.indexOf('</svg>') + '</svg>'.length);
};
exports.svgOnly = svgOnly;
const prefixedName = (name, prefix) => {
    if (prefix === '')
        return (0, case_1.kebabCase)((0, exports.fileName)(name));
    return prefix
        ? `${prefix}-${(0, case_1.kebabCase)((0, exports.fileName)(name))}`
        : `icon-${(0, case_1.kebabCase)((0, exports.fileName)(name))}`;
};
exports.prefixedName = prefixedName;
const getExtension = (file) => {
    let names = path_1.default.basename(file.replace('.template', '')).split('.');
    names[0] = '';
    return names.join('.');
};
exports.getExtension = getExtension;
const fixJsx = (str) => {
    return str
        .replace('xlink:href', 'xlinkHref')
        .replace('xmlns:xlink', 'xmlnsXlink');
};
exports.fixJsx = fixJsx;
const createAFolder = (dir) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mkdir(dir, {
            recursive: true,
            mode: 0o775
        });
    }
    catch (error) {
        console.log(`error creating folder ${dir}`);
    }
    return;
});
exports.createAFolder = createAFolder;
const getTagData = (str, tag) => {
    const regex = new RegExp(`<${tag}>(.|\n)*?<\/${tag}>`, 'gi');
    const matches = str.match(regex);
    return matches ? (0, exports.removeTags)(matches[0], [tag]) : '';
};
exports.getTagData = getTagData;
const formatFile = (str, ext) => {
    let parserFormat = null;
    const allowed = [
        'scss',
        'css',
        'less',
        'graphql',
        'html',
        'vue',
        'yaml',
        'mdx'
    ];
    if (allowed.includes(ext)) {
        parserFormat = ext;
    }
    else {
        switch (ext) {
            case 'js':
                parserFormat = 'babel';
                break;
            case 'ts':
                parserFormat = 'typescript';
                break;
            case 'json':
                parserFormat = 'json5';
                break;
            case 'md':
                parserFormat = 'markdown';
                break;
        }
    }
    return parserFormat ? (0, prettier_1.format)(str, { parser: parserFormat }) : str;
};
exports.formatFile = formatFile;
//# sourceMappingURL=helpers.js.map