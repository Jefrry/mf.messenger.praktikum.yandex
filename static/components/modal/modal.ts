import Block from '../block.js'
import Templator from "../../services/templator.js";
import template from './modal.tmpl.js'
export default class Modal extends Block {
    constructor(protected props: { [key:string]: any, content: string, class?: string }) {
        super("div", props, {class: `modal d-none ${props.class}`});
    }

    componentDidRender() {
        this.element.onclick = (e: Event) => {
            e.preventDefault()

            let target = e.target as HTMLHtmlElement

            if (target.classList?.contains('modal')) {
                this.hide()
            }
        }
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}