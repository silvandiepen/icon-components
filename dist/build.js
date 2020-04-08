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
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const fs = require('fs').promises;
const kleur_1 = require("kleur");
const files_1 = require("./files");
const helpers_1 = require("./helpers");
const list_1 = require("./list");
const makePath = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const dirname = path.dirname(filePath);
    if ((yield fs.stat(dirname)).isDirectory()) {
        return true;
    }
    makePath(dirname);
    fs.mkdir(dirname);
});
const buildFile = (data, file) => __awaiter(void 0, void 0, void 0, function* () {
    file.path = path.join(data.dest, helpers_1.fileName(file.name), helpers_1.kebabCase(helpers_1.fileName(file.name)) + (file.ext ? file.ext : ''));
    if (data.inRoot)
        file.path = path.join(data.dest, helpers_1.kebabCase(helpers_1.fileName(file.name)) + (file.ext ? file.ext : ''));
    yield makePath(file.path);
    yield fs.writeFile(file.path, file.data, {
        encoding: 'utf8',
        flag: 'w'
    });
});
const writeComponent = function (data, file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if the tedmplate is a path. If so.. we can try to get those files and run them.
            if (data.template.indexOf('/') > 0) {
                yield buildFile(data, {
                    data: yield files_1.FROM_TEMPLATE(file, data),
                    ext: path.extname(data.template.replace('.template', '')),
                    name: file.name
                });
            }
            else if (data.template) {
                switch (data.template) {
                    case 'stencil':
                        yield buildFile(data, {
                            data: yield files_1.STENCIL_TSX(file, data),
                            ext: '.ts',
                            name: file.name
                        });
                        yield buildFile(data, {
                            data: yield files_1.STENCIL_CSS(file, data),
                            ext: '.css',
                            name: file.name
                        });
                        yield buildFile(data, {
                            data: yield files_1.STENCIL_E2E(file, data),
                            ext: '.e2e.ts',
                            name: file.name
                        });
                        yield buildFile(data, {
                            data: yield files_1.STENCIL_SPEC(file, data),
                            ext: '.spec.ts',
                            name: file.name
                        });
                        break;
                    case 'react-material':
                        yield buildFile(data, {
                            data: yield files_1.REACT_MATERIAL(file, data),
                            ext: '.js',
                            name: file.name
                        });
                        break;
                    case 'react':
                        yield buildFile(data, {
                            data: yield files_1.REACT(file, data),
                            ext: '.js',
                            name: file.name
                        });
                        break;
                }
            }
            console.log(`\t${kleur_1.green('✔')} ${file.name}`);
        }
        catch (err) {
            console.log(`\t${kleur_1.red('×')} ${file.name} ${err}`);
        }
    });
};
exports.buildComponents = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Log it all\
    console.log('\n');
    console.log(`\t${kleur_1.bold('Generating')} ${kleur_1.bgBlue().black(' ' + data.template.toUpperCase() + ' ')} ${kleur_1.bold('components from svg files.')}`);
    console.log('\n');
    if (data.src && data.dest) {
        if (data.files && data.files.length > 0)
            console.log(`\tsrc:\t ${kleur_1.green().italic(data.src)} `);
        else
            console.log(`\tsrc:\t ${kleur_1.yellow().italic(data.src)} ${kleur_1.red("Your source folder doesn't contain any") +
                kleur_1.red().bold(' .svg ') +
                kleur_1.red('files.')}`);
        console.log(`\tdest:\t ${kleur_1.green().italic(data.dest)}`);
        console.log(`\n`);
        if (data.files && data.files.length > 0) {
            console.log(`\t${kleur_1.bold('Files')} ${kleur_1.blue().bold('(' + data.files.length + ')')}`);
            if (data.list)
                list_1.writeList(data);
            data.files.forEach((file, i) => __awaiter(void 0, void 0, void 0, function* () {
                if (!data.inRoot)
                    yield fs.mkdir(path.join(data.dest, helpers_1.fileName(file.name)), {
                        recursive: true,
                        mode: 0o775
                    });
                writeComponent(data, file);
                if (data.files.length == i + 1) {
                    setTimeout(() => {
                        console.log(' Done! ');
                        console.log(`\n`);
                    }, 1000);
                }
            }));
        }
    }
    else {
        console.log(`\tdefine --src and --dest`);
        process.exit(1);
    }
});
//# sourceMappingURL=build.js.map