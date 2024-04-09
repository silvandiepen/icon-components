
export interface Settings {
    src: string;
    dest: string;

    // Output
    inRoot: boolean;

    // Replacers
    replace: string;
    filter: string | string[];

    // Prefixes and Affixes
    prefix: string;
    affix: string;

    // Cleanup
    removeTags: string | string[];
    removeAttributes: string | string[];

    // Templates
    listTemplate: string | string[];
    componentTemplate: string | string[];
}
