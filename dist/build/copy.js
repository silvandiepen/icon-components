"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFiles = void 0;
const helpers_1 = require("../helpers");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const cli_block_1 = require("cli-block");
const copyFiles = async (settings) => {
    await (0, helpers_1.asyncForEach)(settings.copy, async (item) => {
        const stats = await (0, promises_1.lstat)(item);
        if (stats.isFile()) {
            const input = (0, path_1.join)(item);
            const output = (0, path_1.join)(settings.dest, (0, path_1.basename)(item));
            await (0, promises_1.copyFile)(input, output);
            (0, cli_block_1.blockLineSuccess)(`Copied ${(0, path_1.basename)(item)}`);
        }
        if (stats.isDirectory()) {
            const input = (0, path_1.join)(item);
            const output = (0, path_1.join)(settings.dest, item.split('/')[item.split('/').length - 1]);
            await (0, promises_1.copyFile)(input, output);
            (0, cli_block_1.blockLineSuccess)(`Copied ${(0, path_1.basename)(item)}`);
        }
    });
};
exports.copyFiles = copyFiles;
//# sourceMappingURL=copy.js.map