#!/usr/bin/env node
import { blockFooter, blockHeader, blockLine, blockLineError, blockLineSuccess, blockMid, blockRowLine, blockSettings, blue, bold, dim, green } from "cli-block";

import { getSettings } from "@/build/settings";
import { getFiles } from "@/build/system";
import { getTemplates } from "@/build/templates";
import { writeComponentFiles, writeListFiles } from "@/build/write";
import { Payload } from "@/types";

const { settings } = getSettings();



(async () => {

    blockHeader("Settings");
    await blockSettings(settings,
        {}, { exclude: ['componentTemplate', 'listTemplate'] }
    );


    const payload = {
        settings, templates: {}, errors: [], files: []
    } as Payload;

    // Lets get all the files.
    blockMid("Templates");
    await getTemplates(payload).then((r) => {
        if (r.error.length) r.error.forEach((err) => blockLineError(err));

        Object.keys(r.data).forEach((key) => {
            r.data[key].forEach((template, index) => {
                blockRowLine([index == 0 ? bold(key.replace('template:', '')) : '', `${blue(bold(template.name))}`]);
            });
        });

        payload.templates = r.data;
    });


    blockMid("Files");
    await getFiles({ payload }).then((r) => {
        if (r.error.length) r.error.forEach((err) => blockLineError(err));

        Object.values(r.data).forEach((file) => {
            blockLine(`${file.meta.ogFileName} ${dim('→')} ${blue(bold(file.meta.componentName))} ${file.style ? green(' + style') : ''}`);
        });


        payload.files = r.data;
    });



    blockMid('Write Components');
    await writeComponentFiles({ payload }).then((r) => {
        if (r.error.length) r.error.map((e) => e.toString()).forEach((err) => blockLineError(err));

        r.data.forEach((f) => {
            blockLineSuccess(`${f.file.meta.fileDirectoryPath.replace(process.cwd(), '')}/${blue(bold(f.fileName))}`);
        });

    });

    
    blockMid('Write Lists');
    await writeListFiles({ payload }).then((r) => {
        if (r.error.length) r.error.map((e) => e.toString()).forEach((err) => blockLineError(err));

        r.data.forEach((f) => {
            blockLineSuccess(`${payload.settings.dest}/${blue(bold(f.fileName))}`);
        });

    });



    blockFooter();



})()
