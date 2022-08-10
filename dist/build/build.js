"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.buildFiles = exports.buildComponents = exports.startBuild = exports.CombineTemplateWithData = exports.writeAFile = void 0;
const path_1 = require("path");
const { mkdir, stat, writeFile } = require('fs').promises;
const ejs_1 = __importDefault(require("ejs"));
const kleur_1 = require("kleur");
const cli_block_1 = require("cli-block");
const helpers = __importStar(require("../helpers"));
const helpers_1 = require("../helpers");
const case_1 = require("@sil/case");
/*

    Create the path if it doesn't exist.

    */
const makePath = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const directoryName = (0, path_1.dirname)(filePath);
    if ((yield stat(directoryName)).isDirectory()) {
        return true;
    }
    makePath(directoryName);
    mkdir(directoryName);
});
/*

    Write the file

    */
const writeAFile = (settings, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filePath = (0, path_1.join)(settings.dest, (0, case_1.kebabCase)((0, helpers_1.fileName)(file.name)), (0, case_1.kebabCase)((0, helpers_1.fileName)(file.name)) + (file.ext ? file.ext : ''));
        if (settings.inRoot)
            filePath = (0, path_1.join)(settings.dest, (0, case_1.kebabCase)((0, helpers_1.fileName)(file.name)) + (file.ext ? file.ext : ''));
        yield makePath(filePath);
        yield writeFile(filePath, file.data, {
            encoding: 'utf8',
            flag: 'w'
        });
    }
    catch (err) {
        (0, cli_block_1.blockErrors)(['Woops, something happened during writing. ', err]);
    }
});
exports.writeAFile = writeAFile;
/*

    Build/Combine the template with the data using EJS

    */
const CombineTemplateWithData = (file, template, settings) => __awaiter(void 0, void 0, void 0, function* () {
    return ejs_1.default.render(template.data, Object.assign(Object.assign(Object.assign(Object.assign({}, settings), file), helpers), { PascalCase: case_1.PascalCase,
        kebabCase: case_1.kebabCase,
        upperSnakeCase: case_1.upperSnakeCase }));
});
exports.CombineTemplateWithData = CombineTemplateWithData;
/*

    Write a single Component

    */
const buildComponent = function (settings, file) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helpers_1.asyncForEach)(settings.templates, (template) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, exports.CombineTemplateWithData)(file, template, settings);
                const ext = (0, helpers_1.getExtension)(template.file);
                yield (0, exports.writeAFile)(settings, {
                    data: (0, helpers_1.formatFile)(data, ext),
                    ext,
                    name: file.name
                });
                (0, cli_block_1.blockLineSuccess)(`${file.name}${(0, kleur_1.blue)((0, helpers_1.getExtension)(template.file))}${file.style ? ` ${(0, kleur_1.blue)('+ style')}` : ''}`);
            }
            catch (err) {
                (0, cli_block_1.blockLineError)(`${file.name}${(0, kleur_1.blue)((0, helpers_1.getExtension)(template.file))} ${err}`);
            }
        }));
    });
};
/*

    Start the building process

    */
const startBuild = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    // Log it all\
    (0, cli_block_1.blockHeader)(`Generating ${settings.template ? settings.template : settings.type ? settings.type : ''}`);
    (0, cli_block_1.blockMid)(`Settings`);
    if (settings.src && settings.dest) {
        let showSettings = {
            destination: settings.dest,
            source: settings.src,
            prefix: settings.prefix,
            template: settings.template ? settings.template : settings.type,
            optimize: settings.optimize,
            removeOld: settings.removeOld,
            removeAttrs: settings.removeAttrs,
            removeTags: settings.removeTags,
            list: settings.list ? settings.list : false,
            listTemplate: settings.listTemplate ? settings.listTemplate : false,
            index: settings.index ? settings.index : false,
            indexTemplate: settings.indexTemplate ? settings.indexTemplate : false,
            totalFiles: settings.files.length
        };
        yield (0, cli_block_1.blockSettings)(showSettings);
        if (settings.files.length < 1) {
            (0, cli_block_1.blockMid)(`Warnings`);
            (0, cli_block_1.blockRowLine)([
                'src',
                `${(0, kleur_1.yellow)().italic(settings.src)} ${(0, kleur_1.red)("Your source folder doesn't contain any") +
                    (0, kleur_1.red)().bold(' .svg ') +
                    (0, kleur_1.red)('files.')}`,
                ''
            ]);
        }
    }
});
exports.startBuild = startBuild;
const buildComponents = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    if (settings.files.length > 0) {
        (0, cli_block_1.blockMid)(`${(0, kleur_1.bold)('Files')} ${(0, kleur_1.blue)().bold('(' + settings.files.length + ')')}`);
        yield (0, helpers_1.asyncForEach)(settings.files, (file) => __awaiter(void 0, void 0, void 0, function* () {
            if (!settings.inRoot)
                yield (0, helpers_1.createAFolder)((0, path_1.join)(settings.dest, (0, helpers_1.fileName)(file.name)));
            buildComponent(settings, file);
        }));
    }
    yield (0, helpers_1.WAIT)(100);
});
exports.buildComponents = buildComponents;
/*

    Build the files!

    */
const buildFiles = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.startBuild)(settings);
    yield (0, exports.buildComponents)(settings);
    return settings;
});
exports.buildFiles = buildFiles;
//# sourceMappingURL=build.js.map