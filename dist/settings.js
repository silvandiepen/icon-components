"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
exports.settings = yargs_1.default.options({
    src: { type: 'string', default: null },
    dest: { type: 'string', default: null },
    ext: { type: 'string', default: null },
    filelist: { type: 'array', default: [] },
    files: { type: 'array', default: [] },
    error: { type: 'array', default: [] },
    template: { type: 'string', default: null },
    inRoot: { type: 'boolean', default: false },
    removeOld: { type: 'boolean', default: false },
    prefix: { type: 'string', default: '' },
    list: { type: 'array', default: [] }
}).argv;
//# sourceMappingURL=settings.js.map