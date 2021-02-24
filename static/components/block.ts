import EventBus from '../services/eventBus.js'
class Block {
    private _element: HTMLElement;
    protected props: object;
    private eventBus: EventBus;
    private readonly EVENTS: { [index: string]: string };
    readonly _meta: { tagName: string, props: object };

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName: string = "div", props = {}) {
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

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(this.EVENTS.INIT, this.init.bind(this));
        eventBus.on(this.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(this.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(this.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    private _createResources() {
        this._element = Block._createDocumentElement(this._meta.tagName);
    }

    init() {
        this._createResources();
        this.eventBus.emit(this.EVENTS.FLOW_CDM);
    }

    private _componentDidMount() {
        this.componentDidMount();
        this.eventBus.emit(this.EVENTS.FLOW_RENDER);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount() { }

    _componentDidUpdate(oldProps: string, newProps: string) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus.emit(this.EVENTS.FLOW_RENDER)
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: string, newProps: string): {[index:string]: string} {
        return {
            oldProps,
            newProps
        };
    }

    setProps = (nextProps: object): boolean => {
        const oldProps = this.props
        this.props = this._makePropsProxy(nextProps) // newProps

        this.eventBus.emit(this.EVENTS.FLOW_CDU, oldProps, this.props)

        return true
    };

    get element(): HTMLElement {
        return this._element
    }

    private _render() {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        if (typeof block === "string") {
            this._element.innerHTML = block
        }
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
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show(): void {
        this.getContent().style.display = "block";
    }

    hide(): void {
        this.getContent().style.display = "none";
    }
}
export default Block