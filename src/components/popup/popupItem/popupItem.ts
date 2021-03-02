import {Block} from '../../block.js'
import {Templator} from "../../../services/templator.js";
import {template} from './popupItem.tmpl.js'
import { IPopupCompPropsItem } from '../../../types/index.js';
class PopupItemComp extends Block {
    constructor(protected props: IPopupCompPropsItem) {
        super("li", props, {"class": `popup__item ${props.class ?? ''}`});
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}

export {PopupItemComp}