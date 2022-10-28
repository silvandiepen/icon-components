#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rimraf_1 = __importDefault(require("rimraf"));
const get_1 = require("./get");
const build_1 = require("./build");
const list_1 = require("./list");
const settings_1 = require("./settings");
const cli_block_1 = require("cli-block");
// If remove old is set, the destination folder will be removed in order to be sure all files are new.
() => {
    (0, settings_1.settings)().removeOld &&
        (0, rimraf_1.default)((0, settings_1.settings)().dest + '/*', () => {
            console.log('Cleaned destination folder');
        });
};
(0, get_1.getData)((0, settings_1.settings)())
    .then(build_1.buildFiles)
    .then(async (s) => {
    await (0, list_1.createLists)(s);
    await (0, list_1.createIndexes)(s);
})
    .then(() => {
    (0, cli_block_1.blockFooter)('Done!');
});
//# sourceMappingURL=cli.js.map