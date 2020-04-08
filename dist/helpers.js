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
exports.WAIT = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, 0);
    });
});
exports.asyncForEach = (array, callback) => __awaiter(void 0, void 0, void 0, function* () {
    for (let index = 0; index < array.length; index++) {
        yield callback(array[index], index, array);
    }
});
exports.kebabCase = (str) => str
    .match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
    .filter(Boolean)
    .map((x) => x.toLowerCase())
    .join('-');
exports.fileName = (str, settings = null) => {
    if (settings)
        return `${settings.prefix}${path_1.default
            .basename(str)
            .replace(path_1.default.extname(str), '')}`;
    else
        return `${path_1.default.basename(str).replace(path_1.default.extname(str), '')}`;
};
exports.PascalCase = (str) => str
    .replace('-', ' ')
    .match(/[a-zA-Z0-9]+/gi)
    .map(function (word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
})
    .join('');
exports.removeTags = (str, tags) => {
    if (Array.isArray(tags)) {
        let value = str;
        tags.forEach((tag) => {
            value = exports.removeTags(value, tag);
        });
        return value;
    }
    else {
        const regex = new RegExp(`<[\/]{0,1}(${tags}|${tags})[^><]*>`, 'g');
        return str.replace(regex, '');
    }
};
exports.removeAttrs = (str, attrs) => {
    if (Array.isArray(attrs)) {
        let value = str;
        attrs.forEach((attr) => {
            value = exports.removeAttrs(value, attr);
        });
        return value;
    }
    else {
        const regex = new RegExp(`/${attrs}="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/gi`, 'g');
        return str.replace(regex, '');
    }
};
exports.prefixedName = (name, prefix) => {
    return prefix
        ? `${prefix}-${exports.kebabCase(exports.fileName(name))}`
        : `icon-${exports.kebabCase(exports.fileName(name))}`;
};
//# sourceMappingURL=helpers.js.map