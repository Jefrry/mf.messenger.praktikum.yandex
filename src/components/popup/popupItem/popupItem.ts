import {Block} from '../../block/block.js'
import {Templator} from "../../../modules/templator.js";
import {template} from './popupItem.tmpl.js'
import { IPopupCompPropsItem } from '../popup.type.js';
class PopupItemComp extends Block {
    constructor(protected props: IPopupCompPropsItem) {
        super("li", props, {"class": `popup__item ${props.class ?? ''}`});
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}

export {PopupItemComp}