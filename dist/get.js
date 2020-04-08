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
const svgo_1 = __importDefault(require("svgo"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const helpers_1 = require("./helpers");
exports.getSourceFiles = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    yield helpers_1.WAIT();
    return Object.assign({}, settings);
});
const getFileData = (filedata, srcFileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return fs_1.promises.readFile(path_1.default.join(filedata.src, srcFileName)).then((file) => {
            return file.toString();
        });
    }
    catch (err) {
        console.warn(err);
    }
});
exports.getFileList = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Genereate a list of svg files from the source folder.
    let files = yield fs_1.promises.readdir(data.src);
    yield helpers_1.asyncForEach(files, (fileName) => __awaiter(void 0, void 0, void 0, function* () {
        if (path_1.default.extname(fileName) == '.svg') {
            try {
                data.filelist.push(fileName);
            }
            catch (err) {
                console.log(err);
            }
        }
    }));
    return data;
});
exports.getDataFromFiles = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const svgo = new svgo_1.default({
        removeAttrs: {
            attrs: ['xmlns']
        }
    });
    yield helpers_1.asyncForEach(data.filelist, (file) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield getFileData(data, file).then((fileData) => {
                const optimizedSVG = svgo.optimize(fileData).then((result) => {
                    if (data.optimize)
                        fileData = optimizedSVG.data;
                });
                data.files.push({ name: helpers_1.kebabCase(helpers_1.fileName(file)), data: fileData });
            });
        }
        catch (err) {
            console.warn(err);
        }
    }));
    return data;
});
// Get the template
exports.getTemplate = (srcFileName, external = false) => __awaiter(void 0, void 0, void 0, function* () {
    let currentPath = external
        ? srcFileName
        : path_1.default.join(__dirname, '../src/templates', srcFileName + '.template');
    try {
        return fs_1.promises.readFile(currentPath).then((file) => {
            return file.toString();
        });
    }
    catch (err) {
        console.warn(err);
    }
});
//# sourceMappingURL=get.js.map