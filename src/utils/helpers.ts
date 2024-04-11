export const isDefined = (value: any) => {
    return value !== undefined && value !== null;
}


export const removeNewLines = (value: string) => {
    return value.replace(/\n/g, "");
}


export const safeComponentName = (name: string) => {
    // when string starts with a number, add an underscore
    if (/^\d/.test(name)) {
        return `_${name}`;
    }
    return name;
}