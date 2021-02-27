import Block from '../block.js';
import Templator from "../../services/templator.js";
import template from './button.tmpl.js';
export default class Button extends Block {
    constructor(props) {
        super("button", props, { "class": `button ${props.class ?? ''}` });
        this.props = props;
    }
    render() {
        return (new Templator(template)).compile(this.props);
    }
}
//# sourceMappingURL=button.js.map