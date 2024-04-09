
export interface Settings {
    input: string;
    output: string;

    // Replacers
    replace: string;
    filter: string | string[];

    // Prefixes and Affixes
    prefix: string;
    affix: string;

    // Templates
    listTemplate: string | string[];
    componentTemplate: string | string[];
}
