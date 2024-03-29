import {EventBus} from '../../modules/eventBus.js';
import {IBlockCompProps} from './block.type.js';

class Block {
	private _element: HTMLElement;
	private eventBus: EventBus;
	protected props: IBlockCompProps;
	private readonly EVENTS: { [index: string]: string };
	readonly _meta: { tagName: string, props: object };
	private readonly containerAttrs: { [key: string]: string };

	/** TSDoc
	 * @param {string} tagName
	 * @param {Object} props
	 * @param containerAttrs
	 * @returns {void}
	 */
	constructor(tagName: string = 'div', props: IBlockCompProps, containerAttrs?: { [key: string]: string }) {
		const eventBus = new EventBus();

		if (containerAttrs) {
			this.containerAttrs = containerAttrs;
		}

		this._meta = {
			tagName,
			props
		};

		this.EVENTS = {
			INIT: 'init',
			FLOW_CDM: 'flow:component-did-mount',
			FLOW_RENDER: 'flow:render',
			FLOW_CDU: 'flow:component-did-update',
			FLOW_CDR: 'flow:component-did-render'
		};

		this.props = this._makePropsProxy(props);

		this.eventBus = eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(this.EVENTS.INIT);
	}

	private _registerEvents(eventBus: EventBus) {
		eventBus.on(this.EVENTS.INIT, this.init.bind(this));
		eventBus.on(this.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(this.EVENTS.FLOW_RENDER, this._render.bind(this));
		eventBus.on(this.EVENTS.FLOW_CDR, this._componentDidRender.bind(this));
		eventBus.on(this.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
	}

	private _createResources() {
		this._element = Block._createDocumentElement(this._meta.tagName);
		if (this.containerAttrs) {
			for (const containerAttrsKey in this.containerAttrs) {
				if (Object.prototype.hasOwnProperty.call(this.containerAttrs, containerAttrsKey)) {
					this._element.setAttribute(containerAttrsKey, this.containerAttrs[containerAttrsKey]);
				}
			}
		}
	}

	init() {
		this._createResources();
		this.eventBus.emit(this.EVENTS.FLOW_CDM);
	}

	private async _componentDidMount() {
		await this.componentDidMount();
		this.eventBus.emit(this.EVENTS.FLOW_RENDER);
	}

	private _componentDidRender() {
		this.componentDidRender();
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount() { }
	componentDidRender() { }

	private _componentDidUpdate(oldProps: string, newProps: string) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (response) {
			this.eventBus.emit(this.EVENTS.FLOW_RENDER);
		}
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps: string, newProps: string): { [key: string]: string } {
		return {
			oldProps,
			newProps
		};
	}

	private _addEvents(): void {
		if (this.props.events) {
			const events = this.props.events;
			Object.keys(events).forEach(eventName => {
				this.element.addEventListener(eventName, e => {
					events[eventName](this, e);
				});
			});
		}
	}

	private _removeEvents(): void {
		if (this.props.events) {
			const events = this.props.events;
			Object.keys(events).forEach(eventName => {
				this.element.removeEventListener(eventName, e => {
					events[eventName](this, e);
				});
			});
		}
	}

	setProps = (nextProps: object): boolean => {
		const oldProps = this.props;
		this.props = this._makePropsProxy(nextProps); // NewProps

		this.eventBus.emit(this.EVENTS.FLOW_CDU, oldProps, this.props);

		return true;
	};

	get element(): HTMLElement {
		return this._element;
	}

	private async _render() {
		let block;
		await (() => {
			block = this.render();
		})();

		if (typeof block === 'string') {
			this._removeEvents();

			this._element.innerHTML = block;

			this._addEvents();
		}

		this.eventBus.emit(this.EVENTS.FLOW_CDR);
	}

	// Может переопределять пользователь, необязательно трогать
	render(): string | boolean {
		return true;
	}

	getContent(): HTMLElement {
		return this.element;
	}

	private _makePropsProxy(props: object) {
		return new Proxy(props, {
			deleteProperty(): never {
				throw new Error('Нет доступа');
			}
		});
	}

	private static _createDocumentElement(tagName: string): HTMLElement {
		return document.createElement(tagName);
	}

	show(): void {
		this.getContent().classList.remove('d-none');
	}

	hide(): void {
		this.getContent().classList.add('d-none');
	}

	toggleVisibility(): void {
		this.getContent().classList.toggle('d-none');
	}

	remove(): void {
		const block = this.getContent();

		block.parentNode?.removeChild(block);
	}
}
export {Block};
