
import { lstat, copyFile } from 'fs/promises';
import { basename, join } from 'path';
import { blockLineSuccess } from 'cli-block';

import { asyncForEach } from '@/helpers';
import { SettingsType } from '@/types';

export const copyFiles = async (settings: SettingsType): Promise<void> => {
	await asyncForEach(settings.copy, async (item: string) => {
		const baseFile = item.includes('=') ? item.split('=')[0] : item;
		const targetFile = item.includes('=') ? item.split('=')[1] : basename(item);

		const baseStat = await lstat(baseFile);

		if (baseStat.isDirectory()) {
			const input = join(baseFile);
			const output = join(
				settings.dest,
				baseFile.split('/')[baseFile.split('/').length - 1]
			);

			await copyFile(input, output);
			blockLineSuccess(`Copied ${targetFile}`);
		} else {
			const input = join(baseFile);
			const output = join(settings.dest, targetFile);
			await copyFile(input, output);
			blockLineSuccess(`Copied ${targetFile}`);
		}
	});
};
