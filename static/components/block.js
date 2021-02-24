import EventBus from '../services/eventBus.js';
class Block {
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
        this.setProps = (nextProps) => {
            const oldProps = this.props;
            this.props = this._makePropsProxy(nextProps); // newProps
            this.eventBus.emit(this.EVENTS.FLOW_CDU, oldProps, this.props);
            return true;
        };
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };
        this.EVENTS = {
            INIT: "init",
            FLOW_CDM: "flow:component-did-mount",
            FLOW_RENDER: "flow:render",
            FLOW_CDU: "flow:component-did-update"
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
        eventBus.on(this.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    _createResources() {
        this._element = Block._createDocumentElement(this._meta.tagName);
    }
    init() {
        this._createResources();
        this.eventBus.emit(this.EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
        this.componentDidMount();
        this.eventBus.emit(this.EVENTS.FLOW_RENDER);
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidMount() { }
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
    get element() {
        return this._element;
    }
    _render() {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        if (typeof block === "string") {
            this._element.innerHTML = block;
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
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }
    show() {
        this.getContent().style.display = "block";
    }
    hide() {
        this.getContent().style.display = "none";
    }
}
export default Block;
//# sourceMappingURL=block.js.map