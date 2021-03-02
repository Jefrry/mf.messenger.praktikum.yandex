export default function pathToObject (obj: { [key:string]: any }, path: string, defaultValue?: any): any {
    const keys = path.split('.');

    let result = obj;
    for (let key of keys) {
        result = result[key];

        // изначально было просто result === undefind
        // но ревьюер сказал добавить null
        // однако первый вариант был в теории практикума
        if (result === undefined || result === null) {
            return defaultValue;
        }
    }

    return result ?? defaultValue;
};