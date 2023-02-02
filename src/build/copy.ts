import { asyncForEach } from '../helpers';
import { SettingsType } from '../types';
import { lstat, copyFile } from 'fs/promises';
import { basename, join } from 'path';
import { blockLineSuccess } from 'cli-block';

export const copyFiles = async (settings: SettingsType): Promise<void> => {
	await asyncForEach(settings.copy, async (item) => {
		const stats = await lstat(item);
		if (stats.isFile()) {
			const input = join(item);
			const output = join(settings.dest, basename(item));

			await copyFile(input, output);
			blockLineSuccess(`Copied ${basename(item)}`);
		}
		if (stats.isDirectory()) {
			const input = join(item);
			const output = join(
				settings.dest,
				item.split('/')[item.split('/').length - 1]
			);

			await copyFile(input, output);
			blockLineSuccess(`Copied ${basename(item)}`);
		}
	});
};
