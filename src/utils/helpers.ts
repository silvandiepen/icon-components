export const isDefined = (value: any) => {
    return value !== undefined && value !== null;
}


export const removeNewLines = (value: string) => {
    return value.replace(/\n/g, "");
}

