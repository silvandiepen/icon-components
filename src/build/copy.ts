
import { lstat, copyFile } from 'fs/promises';
import { basename, join } from 'path';
import { blockLineSuccess, blockMid } from 'cli-block';

import { asyncForEach } from '@/helpers';
import { SettingsType } from '@/types';


const toArray = (input: string | string[]) => {
	if (typeof input === 'string') return input.split(',').map((item) => item.trim());
	return input.map((item) => item.trim());

}


export const copyFiles = async (settings: SettingsType): Promise<void> => {

	const copyArray = toArray(settings.copy);
	await asyncForEach(copyArray, async (item: string) => {
		const baseFile = item.includes('=') ? item.split('=')[0] : item;
		const targetFile = item.includes('=') ? item.split('=')[1] : basename(item);


		const baseStat = await lstat(baseFile);

		blockMid(`Copy`);

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
