"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStyles = exports.getStyleFileList = exports.getStyleData = void 0;
const fs = require('fs').promises;
const path_1 = require("path");
const case_1 = require("@sil/case");
const helpers_1 = require("@/helpers");
const getStyleData = (settings, name, filedata) => {
    const tagData = (0, helpers_1.getTagData)(filedata, 'style');
    const cssFile = settings.styles
        ? settings.styles.find((style) => style.name === name)
        : null;
    return {
        data: tagData + (cssFile ? cssFile.data : ''),
        // ext: cssFile.extension || 'css',
        ext: 'css'
    };
};
exports.getStyleData = getStyleData;
const getStyleFileList = async (settings) => {
    const fileDirectory = settings.styleDir ? settings.styleDir : settings.src;
    if (!(0, helpers_1.dirExist)(fileDirectory))
        return [];
    const files = await fs.readdir(fileDirectory);
    const filelist = [];
    await (0, helpers_1.asyncForEach)(files, async (file) => {
        if (!['.css', '.scss', '.sass', '.less', '.stylus'].includes((0, path_1.extname)(file)))
            return;
        const fileData = await fs.readFile((0, path_1.join)(fileDirectory, file)).then((f) => {
            return f.toString();
        });
        filelist.push({
            name: (0, case_1.kebabCase)((0, helpers_1.fileName)(file)).replace(settings.removePrefix, ''),
            extension: (0, path_1.extname)(file),
            data: fileData || ''
        });
    });
    return filelist;
};
exports.getStyleFileList = getStyleFileList;
const getStyles = async (settings) => {
    try {
        const styles = await (0, exports.getStyleFileList)(settings).then((result) => result);
        return { ...settings, styles: styles };
    }
    catch (err) {
        console.log(err);
    }
};
exports.getStyles = getStyles;
//# sourceMappingURL=styles.js.map