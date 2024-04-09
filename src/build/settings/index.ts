import { getArgs } from "@sil/args";

import { Settings } from "@/types";
import { defaultSettings } from "./default";
import { isDefined } from "@/utils";

export * from "./default";



export const getSettings = (): {
    settings: Settings, errors: string[]
} => {
    const settings = {
        ...defaultSettings
    };
    const args = getArgs();

    console.log(args);

    for (const key in defaultSettings) {
        isDefined(args[key]) && (settings[key] = args[key]);
    }

    return {
        settings,
        errors: []
    };

}