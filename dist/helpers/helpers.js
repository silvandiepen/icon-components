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
const str_convert_1 = require("str-convert");
exports.WAIT = (time = 0) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, time);
    });
});
exports.asyncForEach = (array, callback) => __awaiter(void 0, void 0, void 0, function* () {
    for (let index = 0; index < array.length; index++) {
        yield callback(array[index], index, array);
    }
});
// export const kebabCase = (str: string): string =>
// 	str
// 		.match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
// 		.filter(Boolean)
// 		.map((x) => x.toLowerCase())
// 		.join('-');
exports.fileName = (str, settings = null) => {
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
// export const PascalCase = (str: string): string =>
// 	str
// 		.replace('-', ' ')
// 		.match(/[a-zA-Z0-9]+/gi)
// 		.map(function (word) {
// 			return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
// 		})
// 		.join('');
const tagsRegex = (tag) => new RegExp(`<[\/]{0,1}(${tag}|${tag})[^><]*>`, 'g');
exports.removeTags = (str, tags) => {
    tags.forEach((tag) => {
        str = str.replace(tagsRegex(tag), '');
    });
    return str;
};
exports.asyncRemoveTags = (str, tags) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.asyncForEach(tags, (tag) => {
        str = str.replace(tagsRegex(tag), '');
    });
    return str;
});
const attrRegex = (attr) => new RegExp(` ${attr}="[^"]*"`, 'gi');
exports.removeAttrs = (str, attrs) => {
    attrs.forEach((attr) => {
        str = str.replace(attrRegex(attr), '');
    });
    return str;
};
exports.asyncRemoveAttrs = (str, attrs) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.asyncForEach(attrs, (attr) => {
        str = str.replace(attrRegex(attr), '');
    });
    return str;
});
exports.svgOnly = (str) => {
    return str.substring(str.indexOf('<svg'), str.indexOf('</svg>') + '</svg>'.length);
};
exports.prefixedName = (name, prefix) => {
    if (prefix === '')
        return str_convert_1.kebabCase(exports.fileName(name));
    return prefix
        ? `${prefix}-${str_convert_1.kebabCase(exports.fileName(name))}`
        : `icon-${str_convert_1.kebabCase(exports.fileName(name))}`;
};
exports.getExtension = (file) => {
    let names = path_1.default.basename(file.replace('.template', '')).split('.');
    names[0] = '';
    return names.join('.');
};
exports.fixJsx = (str) => {
    return str
        .replace('xlink:href', 'xlinkHref')
        .replace('xmlns:xlink', 'xmlnsXlink');
};
//# sourceMappingURL=helpers.js.map