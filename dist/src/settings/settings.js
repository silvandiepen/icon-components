"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = exports.defaultSettings = void 0;
// @ts-nocheck
const yargs_1 = __importDefault(require("yargs"));
exports.defaultSettings = {
    src: '',
    dest: '',
    styleDir: '',
    optimize: true,
    template: null,
    inRoot: false,
    copy: [],
    removeOld: false,
    removePrefix: '',
    stripStyle: false,
    prefix: '',
    list: false,
    listTemplate: [],
    type: '',
    removeStyle: false,
    removeAttrs: ['fill', 'id', 'class'],
    removeTags: ['svg'],
    svgOnly: false,
    index: false,
    indexTemplate: [],
    types: false,
    typesTemplate: [],
    parentIndex: false,
    prependLine: '',
    iconFolder: '',
    filter: ''
};
const settings = () => {
    const cs = yargs_1.default.options({
        src: { required: true, type: 'string', default: exports.defaultSettings.src, alias: 'source' },
        dest: {
            required: true,
            type: 'string',
            default: exports.defaultSettings.dest,
            alias: 'destination'
        },
        sd: { required: true, type: 'string', default: exports.defaultSettings.styleDir, alias: 'styleDir' },
        o: { required: false, type: 'boolean', default: exports.defaultSettings.optimize, alias: 'optimize' },
        t: { required: false, type: 'string', default: exports.defaultSettings.template, alias: 'template' },
        p: { required: false, type: 'string', default: exports.defaultSettings.prefix, alias: 'prefix' },
        c: { required: false, type: 'array', default: exports.defaultSettings.copy, alias: 'copy' },
        l: {
            required: false,
            type: 'boolean',
            default: exports.defaultSettings.list,
            alias: 'list'
        },
        lt: {
            required: false,
            type: 'array',
            default: exports.defaultSettings.listTemplate,
            alias: 'listTemplate'
        },
        ir: { required: false, type: 'boolean', default: exports.defaultSettings.inRoot, alias: 'inRoot' },
        type: {
            required: false,
            type: 'string',
            default: exports.defaultSettings.type,
        },
        ra: {
            required: false,
            type: 'array',
            default: exports.defaultSettings.removeAttrs,
            alias: 'removeAttrs'
        },
        rt: {
            required: false,
            type: 'array',
            default: exports.defaultSettings.removeTags,
            alias: 'removeTags'
        },
        rs: {
            required: false,
            type: 'boolean',
            default: exports.defaultSettings.removeStyle,
            alias: 'removeStyle'
        },
        ro: { type: 'boolean', default: exports.defaultSettings.removeOld, alias: 'removeOld' },
        rp: { type: 'string', default: exports.defaultSettings.removePrefix, alias: 'removePrefix' },
        ss: { type: 'boolean', default: exports.defaultSettings.stripStyle, alias: 'stripStyle' },
        svg: { type: 'boolean', default: exports.defaultSettings.svgOnly, alias: 'svgOnly' },
        idx: {
            required: false,
            type: 'boolean',
            default: exports.defaultSettings.index,
            alias: 'index'
        },
        idxt: {
            required: false,
            type: 'array',
            default: exports.defaultSettings.indexTemplate,
            alias: 'indexTemplate'
        },
        tps: {
            required: false,
            type: 'boolean',
            default: exports.defaultSettings.types,
            alias: 'types'
        },
        tpst: {
            required: false,
            type: 'array',
            default: exports.defaultSettings.typesTemplate,
            alias: 'typesTemplate'
        },
        pidx: {
            required: false,
            type: 'boolean',
            default: exports.defaultSettings.parentIndex,
            alias: 'parentIndex'
        },
        ppl: {
            required: false,
            type: 'string',
            default: exports.defaultSettings.prependLine,
            alias: 'prependLine'
        },
        if: {
            required: false,
            type: 'string',
            default: exports.defaultSettings.iconFolder,
            alias: 'iconFolder'
        },
        ft: {
            required: false,
            type: 'string',
            default: exports.defaultSettings.filter,
            alias: 'filter'
        }
    }).argv;
    return {
        src: cs.src,
        dest: cs.dest,
        styleDir: cs.sd,
        optimize: cs.o,
        template: cs.t,
        inRoot: cs.ir,
        copy: cs.c,
        removeOld: cs.ro,
        removePrefix: cs.rp,
        stripStyle: cs.ss,
        prefix: cs.p,
        list: cs.lt.filter(Boolean).length > 0 ? true : cs.l,
        listTemplate: cs.lt,
        type: cs.type,
        removeStyle: cs.rs,
        removeAttrs: cs.ra,
        removeTags: cs.rt,
        svgOnly: cs.svg,
        index: cs.idxt.filter(Boolean).length > 0 ? true : cs.idx,
        indexTemplate: cs.idxt,
        types: cs.tpst.filter(Boolean).length > 0 ? true : cs.tps,
        typesTemplate: cs.tpst,
        parentIndex: cs.pidx,
        prependLine: cs.ppl,
        iconFolder: cs.if,
        filter: cs.ft
    };
};
exports.settings = settings;
//# sourceMappingURL=settings.js.map