"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dirExist = exports.formatFile = exports.getAttrData = exports.getTagData = exports.createAFolder = exports.fixJsx = exports.getExtension = exports.prefixedName = exports.svgOnly = exports.removeStyle = exports.asyncRemoveAttrs = exports.removeAttrs = exports.asyncRemoveTags = exports.removeTags = exports.fileName = exports.asyncForEach = exports.WAIT = void 0;
const path_1 = __importDefault(require("path"));
const { mkdir } = require('fs').promises;
const fs_1 = require("fs");
const prettier_1 = require("prettier");
const case_1 = require("@sil/case");
const WAIT = async (time = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, time);
    });
};
exports.WAIT = WAIT;
const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};
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
const asyncRemoveTags = async (str, tags) => {
    await (0, exports.asyncForEach)(tags, (tag) => {
        str = str.replace(tagsRegex(tag), '');
    });
    return str;
};
exports.asyncRemoveTags = asyncRemoveTags;
const attrRegex = (attr) => new RegExp(` ${attr}="[^"]*"`, 'gi');
const removeAttrs = (str, attrs) => {
    attrs.forEach((attr) => {
        str = str.replace(attrRegex(attr), '');
    });
    return str;
};
exports.removeAttrs = removeAttrs;
const asyncRemoveAttrs = async (str, attrs) => {
    await (0, exports.asyncForEach)(attrs, (attr) => {
        str = str.replace(attrRegex(attr), '');
    });
    return str;
};
exports.asyncRemoveAttrs = asyncRemoveAttrs;
const removeStyle = (str) => {
    return str.replace(/<style.*?>.*?<\/style>/ig, '');
};
exports.removeStyle = removeStyle;
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
        .replaceAll('fill-rule', 'fillRule')
        .replaceAll('clip-rule', 'clipRule')
        .replace('xlink:href', 'xlinkHref')
        .replace('xmlns:xlink', 'xmlnsXlink');
};
exports.fixJsx = fixJsx;
const createAFolder = async (dir) => {
    try {
        await mkdir(dir, {
            recursive: true,
            mode: 0o775
        });
    }
    catch (error) {
        console.log(`error creating folder ${dir}`);
    }
    return;
};
exports.createAFolder = createAFolder;
const getTagData = (str, tag) => {
    const regex = new RegExp(`<${tag}>(.|\n)*?<\/${tag}>`, 'gi');
    const matches = str.match(regex);
    return matches ? (0, exports.removeTags)(matches[0], [tag]) : '';
};
exports.getTagData = getTagData;
const getAttrData = (str, tag) => {
    const regex = new RegExp(`${tag}="(.|\n)*?"`, 'gi');
    const matches = str.match(regex);
    return matches ? (0, exports.removeTags)(matches[0], [tag]) : '';
};
exports.getAttrData = getAttrData;
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
            case 'jsx':
                parserFormat = 'babel';
                break;
            case 'ts':
            case 'tsx':
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
const dirExist = (dir) => {
    try {
        if ((0, fs_1.existsSync)(dir)) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (e) {
        return false;
    }
};
exports.dirExist = dirExist;
//# sourceMappingURL=helpers.js.map