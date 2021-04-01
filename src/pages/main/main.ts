
import {Block} from '../../components/block/block.js';
import {Templator} from '../../modules/templator.js';
import {template} from './main.tmpl.js';
export default class MainPage extends Block {
	constructor(protected props: any) {
		super('div', props, {class: `${props.class ?? ''}`});
	}

	render() {
		return (new Templator(template)).compile(this.props);
	}
}
