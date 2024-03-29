"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFiles = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const cli_block_1 = require("cli-block");
const helpers_1 = require("@/helpers");
const copyFiles = async (settings) => {
    await (0, helpers_1.asyncForEach)(settings.copy, async (item) => {
        const baseFile = item.includes('=') ? item.split('=')[0] : item;
        const targetFile = item.includes('=') ? item.split('=')[1] : (0, path_1.basename)(item);
        const baseStat = await (0, promises_1.lstat)(baseFile);
        if (baseStat.isDirectory()) {
            const input = (0, path_1.join)(baseFile);
            const output = (0, path_1.join)(settings.dest, baseFile.split('/')[baseFile.split('/').length - 1]);
            await (0, promises_1.copyFile)(input, output);
            (0, cli_block_1.blockLineSuccess)(`Copied ${targetFile}`);
        }
        else {
            const input = (0, path_1.join)(baseFile);
            const output = (0, path_1.join)(settings.dest, targetFile);
            await (0, promises_1.copyFile)(input, output);
            (0, cli_block_1.blockLineSuccess)(`Copied ${targetFile}`);
        }
    });
};
exports.copyFiles = copyFiles;
//# sourceMappingURL=copy.js.map