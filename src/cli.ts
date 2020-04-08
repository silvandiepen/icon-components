#!/usr/bin/env node
import rimraf from 'svgo';

import { settings } from './settings';
import { getSourceFiles, getFileList, getDataFromFiles } from './get';
import { buildComponents } from './build';

// If remove old is set, the destination folder will be removed in order to be sure all files are new.
if (settings.removeOld)
	rimraf(settings.dest + '/*', () => {
		console.log('Cleaned destination folder');
	});

getSourceFiles(settings)
	.then(getFileList)
	.then(getDataFromFiles)
	.then(buildComponents);
