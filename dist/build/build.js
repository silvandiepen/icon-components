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
const path = require('path');
const fs = require('fs').promises;
const ejs_1 = __importDefault(require("ejs"));
const kleur_1 = require("kleur");
const clog = __importStar(require("cli-block"));
const helpers = __importStar(require("../helpers"));
const helpers_1 = require("../helpers");
const str_convert_1 = require("str-convert");
/*

    Create the path if it doesnt exist.

    */
const makePath = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const dirname = path.dirname(filePath);
    if ((yield fs.stat(dirname)).isDirectory()) {
        return true;
    }
    makePath(dirname);
    fs.mkdir(dirname);
});
/*

    Write the file

    */
exports.writeFile = (settings, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filePath = path.join(settings.dest, str_convert_1.kebabCase(helpers_1.fileName(file.name)), str_convert_1.kebabCase(helpers_1.fileName(file.name)) + (file.ext ? file.ext : ''));
        if (settings.inRoot)
            filePath = path.join(settings.dest, str_convert_1.kebabCase(helpers_1.fileName(file.name)) + (file.ext ? file.ext : ''));
        yield makePath(filePath);
        yield fs.writeFile(filePath, file.data, {
            encoding: 'utf8',
            flag: 'w'
        });
    }
    catch (err) {
        clog.BLOCK_ERRORS(['Woops, something happened during writing. ', err]);
    }
});
/*

    Build/Combine the template with the data using EJS

    */
exports.CombineTemplateWithData = (file, template, settings) => __awaiter(void 0, void 0, void 0, function* () {
    return ejs_1.default.render(template.data, Object.assign(Object.assign(Object.assign(Object.assign({}, settings), file), helpers), { pascalCase: str_convert_1.pascalCase,
        kebabCase: str_convert_1.kebabCase }));
});
/*

    Write a single Component

    */
const buildComponent = function (settings, file) {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.asyncForEach(settings.templates, (template) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield exports.writeFile(settings, {
                    data: yield exports.CombineTemplateWithData(file, template, settings),
                    ext: helpers_1.getExtension(template.file),
                    name: file.name
                });
                clog.BLOCK_LINE(`${kleur_1.green('✔')} ${file.name}${kleur_1.blue(helpers_1.getExtension(template.file))}`);
            }
            catch (err) {
                clog.BLOCK_LINE(`${kleur_1.red('×')} ${file.name}${kleur_1.blue(helpers_1.getExtension(template.file))} ${err}`);
            }
        }));
    });
};
/*

    Start the building process

    */
exports.startBuild = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    // Log it all\
    clog.START(`Generating ${settings.template}`);
    clog.BLOCK_START(`Settings`);
    if (settings.src && settings.dest) {
        let showSettings = {
            destination: settings.dest,
            source: settings.src,
            prefix: settings.prefix,
            template: settings.template ? settings.template : settings.type,
            optimize: settings.optimize,
            removeOld: settings.removeOld,
            list: settings.list ? settings.list : false,
            totalFiles: settings.files.length
        };
        yield clog.BLOCK_SETTINGS(showSettings);
        if (settings.files.length < 1) {
            clog.BLOCK_MID(`Warnings`);
            clog.BLOCK_ROW_LINE([
                'src',
                `${kleur_1.yellow().italic(settings.src)} ${kleur_1.red("Your source folder doesn't contain any") +
                    kleur_1.red().bold(' .svg ') +
                    kleur_1.red('files.')}`,
                ''
            ]);
        }
    }
});
exports.buildComponents = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    if (settings.files.length > 0) {
        clog.BLOCK_MID(`${kleur_1.bold('Files')} ${kleur_1.blue().bold('(' + settings.files.length + ')')}`);
        yield helpers_1.asyncForEach(settings.files, (file) => __awaiter(void 0, void 0, void 0, function* () {
            if (!settings.inRoot)
                yield fs.mkdir(path.join(settings.dest, helpers_1.fileName(file.name)), {
                    recursive: true,
                    mode: 0o775
                });
            buildComponent(settings, file);
        }));
    }
    yield helpers_1.WAIT(100);
    // return settings;
});
/*

    Build the files!

    */
exports.buildFiles = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(settings);
    yield exports.startBuild(settings);
    yield exports.buildComponents(settings);
    return settings;
    // return settings;
    //
});
//# sourceMappingURL=build.js.map