#!/usr/bin/env node
'use strict';

const steps = require("./lib/steps");

const log = require("cli-block");

settings
	.HAS_NECESSARY_ARGUMENTS()
	.then((r) => {
		log.START("Convert Icons to Components");
		return r;
	})
	.then((r) => {
		log.BLOCK_START("Settings");
		return r;
	})
	.then((r) => {
		log.BLOCK_SETTINGS(r.settings);
		return r;
	})
	.then(files.CLEANUP_DEST)
	.then(check.DOES_SRC_EXIST)
	.then(files.GET_FILES)
	.then(files.GET_DEEP_FILES)
	.then(files.CAST_TYPES)
	.then(files.FILTER_TYPES)
	.then((r) => {
		// log.NO_FILES;
		return r;
	})
	.then((r) => {
		log.BLOCK_MID(r, "Get SVG files");
		return r;
	})
	.then((r) => {
		// log.FILES;
		return r;
	})
	.then(templates.IS_EXT_TEMPLATE)
	.then(templates.GET_INT_TEMPLATE)
	.then(templates.GET_EXT_TEMPLATE)
	.then(templates.GET_EXT_TEMPLATES)
	.then(files.REMOVE_DOTFILES)
	.then(files.REMOVE_FOLDERS)
	.then(files.GET_FILE_DATA)
	.then(templates.GET_TEMPLATE_DATA)
	.then(write.CREATE_COMPONENTS)
	.then(check.DOES_DEST_EXIST)
	.then((r) => {
		log.BLOCK_MID("Build Components");
		return r;
	})
	.then(write.WRITE_COMPONENTS)
	.then((r) => {
		log.END_BLOCK;
		return r;
	})
	.then(list.GET_LIST_TEMPLATES)
	.then(list.CREATE_LISTS)
	.then(list.WRITE_LISTS)
	.then((result) => {
		result.settings.log ? console.log(result.list) : null;
	});

// settings
// 	.HAS_NECESSARY_ARGUMENTS()
// 	.then((r) => {
// 		log.START("Convert Icons to Components");
// 		return r;
// 	})
// 	.then((r) => {
// 		log.BLOCK_START("Settings");
// 		return r;
// 	})
// 	.then((r) => {
// 		log.BLOCK_SETTINGS(r.settings);
// 		return r;
// 	})
// 	.then(files.CLEANUP_DEST)
// 	.then(check.DOES_SRC_EXIST)
// 	.then(files.GET_FILES)
// 	.then(files.GET_DEEP_FILES)
// 	.then(files.CAST_TYPES)
// 	.then(files.FILTER_TYPES)
// 	.then((r) => {
// 		// log.NO_FILES;
// 		return r;
// 	})
// 	.then((r) => {
// 		log.BLOCK_MID(r, "Get SVG files");
// 		return r;
// 	})
// 	.then((r) => {
// 		// log.FILES;
// 		return r;
// 	})
// 	.then(templates.IS_EXT_TEMPLATE)
// 	.then(templates.GET_INT_TEMPLATE)
// 	.then(templates.GET_EXT_TEMPLATE)
// 	.then(templates.GET_EXT_TEMPLATES)
// 	.then(files.REMOVE_DOTFILES)
// 	.then(files.REMOVE_FOLDERS)
// 	.then(files.GET_FILE_DATA)
// 	.then(templates.GET_TEMPLATE_DATA)
// 	.then(write.CREATE_COMPONENTS)
// 	.then(check.DOES_DEST_EXIST)
// 	.then((r) => {
// 		log.BLOCK_MID("Build Components");
// 		return r;
// 	})
// 	.then(write.WRITE_COMPONENTS)
// 	.then((r) => {
// 		log.END_BLOCK;
// 		return r;
// 	})
// 	.then(list.GET_LIST_TEMPLATES)
// 	.then(list.CREATE_LISTS)
// 	.then(list.WRITE_LISTS)
// 	.then((result) => {
// 		result.settings.log ? console.log(result.list) : null;
// 	});
