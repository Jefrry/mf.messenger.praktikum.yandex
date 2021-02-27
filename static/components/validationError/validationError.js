import Block from '../block.js';
import Templator from "../../services/templator.js";
import template from './validationError.tmpl.js';
export default class ValidationError extends Block {
    constructor(props) {
        super("span", props, { class: 'form__error' });
        this.props = props;
    }
    render() {
        return (new Templator(template)).compile(this.props);
    }
}
//# sourceMappingURL=validationError.js.map