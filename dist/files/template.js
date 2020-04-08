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
const get_1 = require("../get");
exports.FROM_TEMPLATE = (fileData, settings) => __awaiter(void 0, void 0, void 0, function* () {
    let template = yield get_1.getTemplate(settings.template, true);
    return ejs_1.default.render(template, Object.assign(Object.assign({}, settings), { data: fileData, data_clean: helpers_1.removeAttrs(fileData.data, ['id', 'fill']), data_stripped: helpers_1.removeAttrs(helpers_1.removeTags(fileData.data, ['svg', 'title']), [
            'id',
            'fill'
        ]), name: fileData.name, title: helpers_1.PascalCase(fileData.name), title_lowercase: fileData.name.toLowerCase(), fileName: helpers_1.prefixedName(fileData.name, settings.prefix), componentName: helpers_1.PascalCase(helpers_1.prefixedName(fileData.name, settings.prefix)) }));
});
//# sourceMappingURL=template.js.map