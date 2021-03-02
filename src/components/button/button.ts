import {Block} from '../block.js'
import {Templator} from "../../services/templator.js";
import {template} from './button.tmpl.js'
import { IButtonCompProps } from '../../types/index.js';
class ButtonComp extends Block {
    constructor(protected props: IButtonCompProps) {
        super("button", props, {"class": `button ${props.class ?? ''}`});
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}

export {ButtonComp}