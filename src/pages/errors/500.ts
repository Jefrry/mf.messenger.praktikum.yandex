import {template} from './errors.tmpl.js';
import {Templator} from '../../modules/templator.js';
import {data500} from './mocks.js';
import {Block} from '../../components/block/block.js';
export default class Page500 extends Block {
	constructor(protected props: any) {
		super('div', props, {class: `page page-error d-flex flex-column justify-center align-center ${props.class ?? ''}`});
	}

	render() {
		return (new Templator(template)).compile(data500);
	}
}
