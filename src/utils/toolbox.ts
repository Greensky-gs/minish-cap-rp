export const removeKey = <T, K extends keyof T>(obj: T, key: K): Omit<T, K> => {
    const { [key]: _, ...rest } = obj;
    return rest;
};
