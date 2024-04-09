import { toArray } from "./array";

export const fixJsx = (content: string): string => {
    let svg = content;
    let previousSvg;

    do {
        previousSvg = svg;
        svg = svg.replace(/(<\s*\w+\s+[^>]*?)([a-z]+):([a-z]+)([^>]*?>)/g, (match, p1, p2, p3, p4) => {
            return p1 + p2 + p3.charAt(0).toUpperCase() + p3.slice(1) + p4;
        });
    } while (svg !== previousSvg);

    return svg;
}

export const svgDataOnly = (content: string): string => {
    // Need to get all the contentn between the <svg></svg>, the opening svg can have alot of attributes. 
    const start = content.indexOf("<svg");
    const end = content.indexOf(">", start);
    const svg = content.slice(start, end + 1);

    return svg;
}


export const removeTags = (content: string, tags: string | string[]): string => {
    let newContent = content;

    const tagArray = toArray(tags);

    tagArray.forEach((tag) => {
        const regex = new RegExp(`<${tag}.*?>|<\\/${tag}>`, "g");
        newContent = newContent.replace(regex, "");
    });

    return newContent;
}

export const removeAttributes = (content: string, attributes: string | string[]): string => {
    let newContent = content;

    const attributeArray = toArray(attributes);

    attributeArray.forEach((attribute) => {
        const regex = new RegExp(`${attribute}=".*?"`, "g");
        newContent = newContent.replace(regex, "");
    });

    return newContent;
}
export const escapeQuotes = (content: string): string => {
    return content.replace(/"/g, '\\"');
}
