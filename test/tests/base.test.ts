import { it, describe, expect, run } from "@sil/test";


describe('01: Base', () => {
    it('To have the output folder', () => {
        expect(process.cwd()+'/temp/icons').dirExists();
    })
    it('To have the right amount of files', () => {
        expect(process.cwd()+'/temp/icons').dirHasFilesLength(13);
    })
    it('To have an icon file', () => {
        expect(process.cwd()+'/temp/icons').dirIncludesFile('IconAdd.js');
    })

})

run();