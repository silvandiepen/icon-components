#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const svgo_1 = __importDefault(require("svgo"));
const settings_1 = require("./settings");
const get_1 = require("./get");
const build_1 = require("./build");
// If remove old is set, the destination folder will be removed in order to be sure all files are new.
if (settings_1.settings.removeOld)
    svgo_1.default(settings_1.settings.dest + '/*', () => {
        console.log('Cleaned destination folder');
    });
get_1.getSourceFiles(settings_1.settings)
    .then(get_1.getFileList)
    .then(get_1.getDataFromFiles)
    .then(build_1.buildComponents);
//# sourceMappingURL=cli.js.map