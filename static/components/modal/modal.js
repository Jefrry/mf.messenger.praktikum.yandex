import Block from '../block.js';
import Templator from "../../services/templator.js";
import template from './modal.tmpl.js';
export default class Modal extends Block {
    constructor(props) {
        super("div", props, { class: `modal d-none ${props.class}` });
        this.props = props;
    }
    componentDidRender() {
        this.element.onclick = (e) => {
            e.preventDefault();
            let target = e.target;
            if (target.classList?.contains('modal')) {
                this.hide();
            }
        };
    }
    render() {
        return (new Templator(template)).compile(this.props);
    }
}
//# sourceMappingURL=modal.js.map