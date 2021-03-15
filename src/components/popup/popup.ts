import {Block} from '../block/block.js'
import { IPopupCompProps, IPopupCompPropsItem } from './popup.type.js';
import {PopupItemComp} from './popupItem/popupItem.js'
class PopupComp extends Block {
    constructor(protected props: IPopupCompProps) {
        super("ul", props, {"class": `popup shadow d-none ${props.class ?? ''}`});
    }

    componentDidRender() {
        this.props.items.forEach((x: IPopupCompPropsItem ) => {
            this.element.appendChild((new PopupItemComp(x).getContent()))
        });
    }

    render() {
        return '';
    }
}

export {PopupComp}