export const TemplateType = {
    COMPONENT: "template:component",
    LIST: "template:list"
}
export type TemplateType = (typeof TemplateType)[keyof typeof TemplateType];

export interface Template {
    name: string;
    path: string;
    content: string;
    type: TemplateType;
    extension: string;
}