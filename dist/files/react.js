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
exports.REACT_MATERIAL = (fileData, options) => __awaiter(void 0, void 0, void 0, function* () {
    const currentFileName = helpers_1.prefixedName(fileData.name, options.prefix);
    let template = yield get_1.getTemplate('react-material');
    return ejs_1.default.render(template, {
        data: helpers_1.removeTags(fileData.data, ['svg', 'title']),
        title: helpers_1.PascalCase(currentFileName)
    });
});
exports.REACT = (fileData, options) => __awaiter(void 0, void 0, void 0, function* () {
    const currentFileName = helpers_1.prefixedName(fileData.name, options.prefix);
    let template = yield get_1.getTemplate('react');
    let svg = fileData.data;
    return yield svg_to_jsx_1.default(svg).then(function () {
        return ejs_1.default.render(template, {
            data: svg,
            title: helpers_1.PascalCase(currentFileName)
        });
    });
});
//# sourceMappingURL=react.js.map