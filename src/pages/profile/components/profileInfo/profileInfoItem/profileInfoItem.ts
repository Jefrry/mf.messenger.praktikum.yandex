import {Block} from '../../../../../components/block/block.js';
import {Templator} from '../../../../../modules/templator.js';
import {template} from './profileInfoItem.tmpl.js';
import {IProfileInfoCompPropsItem} from '../profileInfo.type.js';
class ProfileInfoItemComp extends Block {
	constructor(protected props: IProfileInfoCompPropsItem) {
		super('li', props, {class: `profile-info__item relative d-flex justify-space-between mt-5 ${props.class ?? ''}`});
	}

	render() {
		return (new Templator(template)).compile(this.props);
	}
}

export {ProfileInfoItemComp};
