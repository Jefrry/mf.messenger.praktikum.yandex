function pathToObject(obj: { [key: string]: any }, path: string, defaultValue?: any): any {
    const keys = path.split('.');
    if (keys.length < 1 || path === '') throw Error('Путь должен быть строкой и содержать символ "." разделения');

    let result = obj;
    for (let key of keys) {
        result = result[key];

        if (!result) {
            return defaultValue;
        }
    }

    return result ?? defaultValue;
};
export { pathToObject }