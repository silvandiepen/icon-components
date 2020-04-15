"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
exports.settings = () => {
    const cs = yargs_1.default.options({
        src: { required: true, type: 'string', default: null, alias: 'source' },
        dest: {
            required: true,
            type: 'string',
            default: null,
            alias: 'destination'
        },
        o: { required: false, type: 'boolean', default: true, alias: 'optimize' },
        t: { required: false, type: 'string', default: null, alias: 'template' },
        p: { required: false, type: 'string', default: '', alias: 'prefix' },
        l: {
            required: false,
            type: 'boolean',
            default: false,
            alias: 'list'
        },
        lt: {
            required: false,
            type: 'string',
            default: null,
            alias: 'listTemplate'
        },
        ir: { required: false, type: 'boolean', default: false, alias: 'inRoot' },
        type: {
            required: false,
            type: 'string',
            default: null
        },
        ro: { type: 'boolean', default: false, alias: 'removeOld' }
    }).argv;
    return {
        src: cs.src,
        dest: cs.dest,
        optimize: cs.o,
        template: cs.t,
        inRoot: cs.ir,
        removeOld: cs.ro,
        prefix: cs.p,
        list: cs.lt ? cs.lt : cs.l,
        listTemplate: cs.lt,
        type: cs.type
    };
};
//# sourceMappingURL=settings.js.map