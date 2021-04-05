import {Block} from '../../../../components/block/block.js';
import {ButtonComp} from '../../../../components/button/button.js';
import {InputComp} from '../../../../components/input/input.js';
import {Templator} from '../../../../modules/templator.js';
import {validationEmpty, validationNumber} from '../../../../utils/validator.js';

class ModalContent extends Block {
	input: InputComp;

	constructor(protected props: any) {
		super('div', props, {class: 'modal-content add-remove-user d-flex flex-column justify-space-between align-center pa-6'});
	}

	render() {
		return (new Templator('')).compile({});
	}

	async componentDidRender() {
		await this._initComp();
		this.contentFilled();
	}

	private _initComp() {
		this.input = new InputComp({
			type: 'input',
			placeholder: 'ID пользователя',
			name: 'id',
			validation: {
				text: 'ID должен быть числом',
				fn: (val: string) => validationNumber(val) && validationEmpty(val)
			}
		});

		this.element.appendChild(this.input.getContent());
		this.element.appendChild((new ButtonComp({
			text: 'Применить',
			class: 'primary mt-4',
			events: {
				click: () => this.changeUsers()
			}
		}).getContent()));
	}

	changeUsers() { }
	contentFilled() { }
}

export {ModalContent};
