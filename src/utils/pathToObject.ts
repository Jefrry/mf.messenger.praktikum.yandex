function pathToObject (obj: { [key:string]: any }, path: string, defaultValue?: any): any {
    const keys = path.split('.');

    let result = obj;
    for (let key of keys) {
        result = result[key];

        if (!result) {
            return defaultValue;
        }
    }

    return result ?? defaultValue;
};
export {pathToObject}