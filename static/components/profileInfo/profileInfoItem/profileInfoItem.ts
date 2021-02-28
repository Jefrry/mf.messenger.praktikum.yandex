import Block from '../../block.js'
import Templator from "../../../services/templator.js";
import template from './profileInfoItem.tmpl.js'
export default class PopupItem extends Block {
    constructor(protected props: { [key:string]: any, name: string, value: string, class?: string }) {
        super("li", props, {"class": `profile-info__item relative d-flex justify-space-between mt-5 ${props.class ?? ''}`});
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}