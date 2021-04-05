import {Block} from '../block/block.js';
import {Templator} from '../../modules/templator.js';
import {template} from './button.tmpl.js';
import {IButtonCompProps} from './button.type.js';
class ButtonComp extends Block {
	constructor(protected props: IButtonCompProps) {
		super('button', props, {class: `button ${props.class ?? ''}`});
	}

	render() {
		return (new Templator(template)).compile(this.props);
	}
}

export {ButtonComp};
