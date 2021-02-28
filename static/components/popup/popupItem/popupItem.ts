import Block from '../../block.js'
import Templator from "../../../services/templator.js";
import template from './popupItem.tmpl.js'
export default class PopupItem extends Block {
    constructor(protected props: { [key:string]: any, icon: string, text: string, events?: {[key:string]: Function}, class?: string }) {
        super("li", props, {"class": `popup__item ${props.class ?? ''}`});
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}