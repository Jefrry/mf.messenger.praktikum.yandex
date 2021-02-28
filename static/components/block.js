import EventBus from '../services/eventBus.js';
class Block {
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     * @param containerAttrs
     * @returns {void}
     */
    constructor(tagName = "div", props, containerAttrs) {
        this.setProps = (nextProps) => {
            const oldProps = this.props;
            this.props = this._makePropsProxy(nextProps); // newProps
            this.eventBus.emit(this.EVENTS.FLOW_CDU, oldProps, this.props);
            return true;
        };
        const eventBus = new EventBus();
        if (containerAttrs)
            this.containerAttrs = containerAttrs;
        this._meta = {
            tagName,
            props
        };
        this.EVENTS = {
            INIT: "init",
            FLOW_CDM: "flow:component-did-mount",
            FLOW_RENDER: "flow:render",
            FLOW_CDU: "flow:component-did-update",
            FLOW_CDR: "flow:component-did-render",
        };
        this.props = this._makePropsProxy(props);
        this.eventBus = eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(this.EVENTS.INIT);
    }
    _registerEvents(eventBus) {
        eventBus.on(this.EVENTS.INIT, this.init.bind(this));
        eventBus.on(this.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(this.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(this.EVENTS.FLOW_CDR, this._componentDidRender.bind(this));
        eventBus.on(this.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    _createResources() {
        this._element = Block._createDocumentElement(this._meta.tagName);
        if (this.containerAttrs) {
            for (const containerAttrsKey in this.containerAttrs) {
                this._element.setAttribute(containerAttrsKey, this.containerAttrs[containerAttrsKey]);
            }
        }
    }
    init() {
        this._createResources();
        this.eventBus.emit(this.EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
        this.componentDidMount();
        this.eventBus.emit(this.EVENTS.FLOW_RENDER);
    }
    _componentDidRender() {
        this.componentDidRender();
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidMount() { }
    componentDidRender() { }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus.emit(this.EVENTS.FLOW_RENDER);
        }
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
        return {
            oldProps,
            newProps
        };
    }
    _addEvents() {
        if (this.props.events) {
            const events = this.props.events;
            Object.keys(events).forEach(eventName => {
                // ругается No overload matches this call. непонятно почему
                // @ts-ignore
                this.element.addEventListener(eventName, events[eventName]);
            });
        }
    }
    _removeEvents() {
        if (this.props.events) {
            const events = this.props.events;
            Object.keys(events).forEach(eventName => {
                // ругается No overload matches this call. непонятно почему
                // @ts-ignore
                this.element.removeEventListener(eventName, events[eventName]);
            });
        }
    }
    get element() {
        return this._element;
    }
    _render() {
        const block = this.render();
        if (typeof block === "string") {
            this._removeEvents();
            this._element.innerHTML = block;
            this._addEvents();
            this.eventBus.emit(this.EVENTS.FLOW_CDR);
        }
    }
    // Может переопределять пользователь, необязательно трогать
    render() {
        return true;
    }
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
        return new Proxy(props, {
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }
    static _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    show() {
        this.getContent().classList.remove('d-none');
    }
    hide() {
        this.getContent().classList.add('d-none');
    }
    toggleVisability() {
        this.getContent().classList.toggle('d-none');
    }
}
export default Block;
//# sourceMappingURL=block.js.map