import pathToObject from "../../utils/pathToObject.js";
export default class Templator {
    constructor(template) {
        this._template = template;
        this.TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
    }
    compile(ctx) {
        return this._compileTemplate(ctx);
    }
    _compileTemplate(ctx) {
        let tmpl = this._template;
        let key = null;
        const regExp = this.TEMPLATE_REGEXP;
        while ((key = regExp.exec(tmpl))) {
            if (key[1]) {
                const tmplValue = key[1].trim();
                const data = pathToObject(ctx, tmplValue);
                if (typeof data === 'function') {
                    window[tmplValue] = data;
                    tmpl = tmpl.replace(new RegExp(key[0], 'gi'), `window.${key[1].trim()}()`);
                    continue;
                }
                tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data);
            }
        }
        return tmpl;
    }
}
//# sourceMappingURL=templator.js.map