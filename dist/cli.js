#!/usr/bin/env node
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rimraf_1 = __importDefault(require("rimraf"));
const get_1 = require("./get");
const build_1 = require("./build");
const list_1 = require("./list");
const settings_1 = require("./settings");
const clog = __importStar(require("cli-block"));
// If remove old is set, the destination folder will be removed in order to be sure all files are new.
() => {
    if (settings_1.settings().removeOld)
        rimraf_1.default(settings_1.settings().dest + '/*', () => {
            console.log('Cleaned destination folder');
        });
};
get_1.getFiles(settings_1.settings())
    .then(build_1.buildFiles)
    .then((s) => __awaiter(void 0, void 0, void 0, function* () {
    yield list_1.createLists(s);
    yield list_1.createIndexes(s);
}))
    .then(() => {
    clog.BLOCK_END('Done!');
});
// console.log(tempSettings);
// getFiles(settings()).then(getTemplates).then(buildFiles);
// .then(createLists);
//# sourceMappingURL=cli.js.map