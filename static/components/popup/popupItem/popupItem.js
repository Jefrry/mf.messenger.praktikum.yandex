import Block from '../../block.js';
import Templator from "../../../services/templator.js";
import template from './popupItem.tmpl.js';
export default class PopupItem extends Block {
    constructor(props) {
        super("li", props, { "class": `popup__item ${props.class ?? ''}` });
        this.props = props;
    }
    render() {
        return (new Templator(template)).compile(this.props);
    }
}
//# sourceMappingURL=popupItem.js.map