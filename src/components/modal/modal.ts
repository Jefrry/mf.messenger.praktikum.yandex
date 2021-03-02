import {Block} from '../block.js'
import {Templator} from "../../services/templator.js";
import {template} from './modal.tmpl.js'
import { IModalCompProps } from '../../types/index.js';
class ModalComp extends Block {
    constructor(protected props: IModalCompProps) {
        super("div", props, {class: `modal d-none ${props.class}`});
    }

    componentDidRender() {
        this.element.onclick = (e: Event) => {
            e.preventDefault()

            let target = e.target as HTMLHtmlElement

            if (target.classList.contains('modal')) {
                this.hide()
            }
        }
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}

export {ModalComp}