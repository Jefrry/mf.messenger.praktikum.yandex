import { IPopupCompProps, IPopupCompPropsItem } from '../../types/index.js';
import {Block} from '../block.js'
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