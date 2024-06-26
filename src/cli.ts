#!/usr/bin/env node
import rimraf from 'rimraf';
import { blockFooter } from 'cli-block';

import { getData } from '@/get';
import { buildFiles, copyFiles } from '@/build';
import { createListType } from '@/list';

import { settings } from '@/settings';

// If remove old is set, the destination folder will be removed in order to be sure all files are new.
() => {
	settings().removeOld &&
		rimraf(settings().dest + '/*', () => {
			console.log('Cleaned destination folder');
		});
};

getData(settings())
	.then(buildFiles)
	.then(async (s) => {
		await createListType(s, 'list');
		await createListType(s, 'index');
		await createListType(s, 'types');
		if (s.copy.length > 0) await copyFiles(s);
	})
	.then(() => {
		blockFooter('Done!');
	});
