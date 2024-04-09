import { Settings, } from "./settings";
import { Template, TemplateType } from "./templates";

import { File } from "@/types";

export interface Payload {
    settings: Settings;
    files: File[];
    templates: {
        [key in TemplateType]: Template[]
    },
    errors: string[];
}