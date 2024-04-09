export const toArray = (input: string | string[]): string[] => {
    if (Array.isArray(input)) {
        return input;
    }
    return [input];
}