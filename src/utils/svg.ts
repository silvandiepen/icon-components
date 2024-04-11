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
export const svgOnly = (content: string): string | null => {
    // Regular expression to match everything between <svg> and </svg> tags
    const regex = /<svg[^>]*>[\s\S]*<\/svg>/i;

    // Executing the regex on the content
    const match = regex.exec(content);

    if (!match) {
        // If no match is found, return null
        return null;
    }

    // Extract the matched content
    const svgContent = match[0].trim().replace(/>\s+</g, "><");
    
    return svgContent;
}

export const svgDataOnly = (content: string): string => {
    // Regular expression to match everything between <svg> and </svg> tags
    const regex = /<svg[^>]*>([\s\S]*)<\/svg>/i;

    // Executing the regex on the content
    const match = regex.exec(content);

    if (!match || !match[1]) {
        // If no match is found or the content between <svg> tags is empty, return null
        return null;
    }

    // Extract the matched content between <svg> tags
    const svgContent = match[1].trim();

    return svgContent;
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
