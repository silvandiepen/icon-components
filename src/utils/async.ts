export const asyncForEach = async (array: any[], callback: (item: any, index: number, array: any[]) => Promise<void>) => {
    await Promise.all(array.map(callback));
}