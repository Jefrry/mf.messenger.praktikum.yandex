import {Block} from '../block/block.js';
import {Templator} from '../../modules/templator.js';
import {template} from './modal.tmpl.js';
import {IModalCompProps} from './modal.type.js';
class ModalComp extends Block {
	content: string | HTMLElement;
	constructor(protected props: IModalCompProps) {
		super('div', props, {class: 'modal d-none'});
		this.content = props.content;
	}

	componentDidRender() {
		if (this.content instanceof HTMLElement) {
			this.element.appendChild(this.content);
		}

		this.element.onclick = (e: Event) => {
			e.stopPropagation();
			let target = e.target as HTMLHtmlElement;

			if (target.classList.contains('modal')) {
				this.hide();
			}
		};
	}

	render() {
		return (new Templator(template)).compile({});
	}
}

export {ModalComp};
