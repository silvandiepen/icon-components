#!/usr/bin/env node
import rimraf from 'rimraf';

import { getFiles } from './get';
import { buildFiles } from './build';
import { createLists } from './list';

import { settings } from './settings';
import * as clog from 'cli-block';

// If remove old is set, the destination folder will be removed in order to be sure all files are new.
() => {
	if (settings().removeOld)
		rimraf(settings().dest + '/*', () => {
			console.log('Cleaned destination folder');
		});
};

getFiles(settings())
	.then((res) => {
		console.log(res);
		return res;
	})
	.then(buildFiles)
	.then(createLists)
	.then(() => {
		clog.BLOCK_END('Done!');
	});
// console.log(tempSettings);

// getFiles(settings()).then(getTemplates).then(buildFiles);
// .then(createLists);
