import Block from '../block.js';
import PopupItem from './popupItem/popupItem.js';
export default class Popup extends Block {
    constructor(props) {
        super("ul", props, { "class": `popup shadow d-none ${props.class ?? ''}` });
        this.props = props;
    }
    componentDidRender() {
        this.props.items.forEach((x) => {
            this.element.appendChild((new PopupItem(x).getContent()));
        });
    }
    render() {
        return '';
    }
}
//# sourceMappingURL=popup.js.map