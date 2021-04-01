import {Templator} from '../../modules/templator.js';
import {Block} from '../block/block.js';
import {template} from './notification.tmpl.js';
import {INotificationProps} from './notification.type.js';

class NotificationComp extends Block {
	constructor(protected props: INotificationProps) {
		super('div', props, {class: `app-notification app-notification_${props.type} shadow ${props.class ?? ''}`});
	}

	componentDidRender() {
		document.querySelector('body')?.prepend(this.element);
		setTimeout(this.remove.bind(this), this.props.time || 2000);
	}

	render() {
		return (new Templator(template)).compile({text: this.props.text});
	}
}

export {NotificationComp};
