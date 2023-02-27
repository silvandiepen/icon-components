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
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFiles = exports.buildComponents = exports.startBuild = exports.CombineTemplateWithData = exports.writeAFile = void 0;
const path_1 = require("path");
const { mkdir, stat, writeFile } = require('fs').promises;
const ejs_1 = require("ejs");
const kleur_1 = require("kleur");
const cli_block_1 = require("cli-block");
const helpers = __importStar(require("../helpers"));
const helpers_1 = require("../helpers");
const case_1 = require("@sil/case");
/*

    Create the path if it doesn't exist.

    */
const makePath = async (filePath) => {
    const directoryName = (0, path_1.dirname)(filePath);
    if ((await stat(directoryName)).isDirectory()) {
        return true;
    }
    mkdir(directoryName);
};
/*

    Write the file

    */
const writeAFile = async (settings, file) => {
    const dest = file.dest ? file.dest : settings.dest;
    const filePath = (0, path_1.join)(dest, file.name + (file.ext ? file.ext : ''));
    const data = settings.prependLine
        ? `${settings.prependLine}\n${file.data}`
        : file.data;
    try {
        await makePath(filePath);
        await writeFile(filePath, data, {
            encoding: 'utf8',
            flag: 'w'
        });
    }
    catch (err) {
        console.log(err);
        // blockErrors(['Woops, something happened during writing. ', err]);
    }
};
exports.writeAFile = writeAFile;
/*

    Build/Combine the template with the data using EJS

    */
const CombineTemplateWithData = async (file, template, settings) => {
    return (0, ejs_1.render)(template.data, {
        ...settings,
        ...file,
        ...helpers,
        PascalCase: case_1.PascalCase,
        kebabCase: case_1.kebabCase,
        upperSnakeCase: case_1.upperSnakeCase
    });
};
exports.CombineTemplateWithData = CombineTemplateWithData;
/*

    Write a single Component

    */
const buildComponent = async function (settings, file) {
    await (0, helpers_1.asyncForEach)(settings.templates, async (template) => {
        try {
            const data = await (0, exports.CombineTemplateWithData)(file, template, settings);
            const ext = (0, helpers_1.getExtension)(template.file);
            await (0, exports.writeAFile)(settings, {
                data: (0, helpers_1.formatFile)(data, ext),
                ext,
                name: (0, case_1.kebabCase)((0, helpers_1.fileName)(file.name)),
                dest: settings.dest
            });
            (0, cli_block_1.blockLineSuccess)(`${file.name}${(0, kleur_1.blue)((0, helpers_1.getExtension)(template.file))}${file.style ? ` ${(0, kleur_1.blue)('+ style')}` : ''}`);
            if (!(!settings.inRoot && settings.parentIndex))
                return;
            const indexData = `export * from "./${file.name}";`;
            const indexExt = ['.ts', '.tsx'].includes(ext) ? '.ts' : '.js';
            await (0, exports.writeAFile)(settings, {
                data: (0, helpers_1.formatFile)(indexData, indexExt),
                ext: indexExt,
                name: 'index',
                dest: settings.dest
            });
        }
        catch (err) {
            (0, cli_block_1.blockLineError)(`${file.name}${(0, kleur_1.blue)((0, helpers_1.getExtension)(template.file))} ${err}`);
        }
    });
};
/*

    Start the building process

    */
const startBuild = async (settings) => {
    // Log it all\
    (0, cli_block_1.blockHeader)(`Generating Icons`);
    (0, cli_block_1.blockMid)(`Settings`);
    if (settings.src && settings.dest) {
        const showSettings = {
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
            types: settings.types ? settings.types : false,
            typesTemplate: settings.typesTemplate ? settings.typesTemplate : false,
            parentIndex: settings.parentIndex ? settings.parentIndex : false,
            totalFiles: settings.files.length,
            iconFolder: settings.iconFolder ? settings.iconFolder : false,
            inRoot: settings.inRoot ? settings.inRoot : false
        };
        await (0, cli_block_1.blockSettings)(showSettings);
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
};
exports.startBuild = startBuild;
const buildComponents = async (settings) => {
    if (settings.files.length > 0) {
        (0, cli_block_1.blockMid)(`${(0, kleur_1.bold)('Files')} ${(0, kleur_1.blue)().bold('(' + settings.files.length + ')')}`);
        await (0, helpers_1.asyncForEach)(settings.files, async (file) => {
            let newFolder = (0, path_1.join)(settings.dest);
            if (settings.iconFolder && !settings.inRoot)
                newFolder = (0, path_1.join)(settings.dest, settings.iconFolder, (0, helpers_1.fileName)(file.name));
            else if (!settings.inRoot)
                newFolder = (0, path_1.join)(settings.dest, (0, helpers_1.fileName)(file.name));
            else if (settings.iconFolder)
                newFolder = (0, path_1.join)(settings.dest, settings.iconFolder);
            await (0, helpers_1.createAFolder)(newFolder);
            buildComponent({ ...settings, dest: newFolder }, file);
        });
    }
    await (0, helpers_1.WAIT)(100);
};
exports.buildComponents = buildComponents;
/*

    Build the files!

    */
const buildFiles = async (settings) => {
    await (0, exports.startBuild)(settings);
    await (0, exports.buildComponents)(settings);
    return settings;
};
exports.buildFiles = buildFiles;
//# sourceMappingURL=build.js.map