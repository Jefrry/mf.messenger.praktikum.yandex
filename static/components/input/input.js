import Block from '../block.js';
import Validation from '../validationError/validationError.js';
import Templator from "../../services/templator.js";
import template from './input.tmpl.js';
export default class Input extends Block {
    constructor(props) {
        super("div", props, { class: 'field' });
        this.props = props;
    }
    componentDidRender() {
        this._inputEl = this.element.querySelector('input');
        if (this.props.validation) {
            this._setValidation(this.props.validation.text);
        }
    }
    isValid() {
        if (!this.props.validation)
            throw Error('Валидация отсутствует');
        if (!this.props.validation.fn(this._inputEl?.value)) {
            this._showValidationError();
            return false;
        }
        else {
            return true;
        }
    }
    get value() {
        return this._inputEl?.value;
    }
    get name() {
        return this._inputEl?.name;
    }
    _hideValidationError() {
        this._validation.hide();
    }
    _showValidationError() {
        this._validation.show();
    }
    _setValidation(text) {
        this._validation = new Validation({ text });
        this._inputEl?.parentElement?.appendChild(this._validation.element);
        this._validation.hide();
        this._inputEl?.addEventListener('focus', () => {
            this._hideValidationError();
        });
        this._inputEl?.addEventListener('blur', () => {
            this.isValid();
        });
    }
    render() {
        return (new Templator(template)).compile(this.props);
    }
}
//# sourceMappingURL=input.js.map