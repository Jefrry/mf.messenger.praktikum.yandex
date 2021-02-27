import EventBus from '../services/eventBus.js'

class Block {
    private _element: HTMLElement;
    private eventBus: EventBus;
    protected props: {[key:string]: any, events?: {[key:string]: Function}};
    private readonly EVENTS: { [index: string]: string };
    readonly _meta: { tagName: string, props: object };
    private readonly containerAttrs: { [key: string]: string };

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     * @param containerAttrs
     * @returns {void}
     */
    constructor(tagName: string = "div", props: {[key:string]: any, events?: {[key:string]: Function}}, containerAttrs?: {[key:string]: string}) {
        const eventBus = new EventBus();

        if (containerAttrs)  this.containerAttrs = containerAttrs

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
                this._element.setAttribute(containerAttrsKey, this.containerAttrs[containerAttrsKey])
            }
        }
    }

    init() {
        this._createResources();
        this.eventBus.emit(this.EVENTS.FLOW_CDM);
    }

    private _componentDidMount() {
        this.componentDidMount();
        this.eventBus.emit(this.EVENTS.FLOW_RENDER);
    }

    private _componentDidRender() {
        this.componentDidRender();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount() { }
    componentDidRender() { }

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

    _addEvents(): void {
        if (this.props.events) {
            const events = this.props.events
            Object.keys(events).forEach(eventName => {
                // ругается No overload matches this call. непонятно почему
                // @ts-ignore
                this._element.addEventListener(eventName, events[eventName]);
            });
        }
    }
    _removeEvents(): void {
        if (this.props.events) {
            const events = this.props.events
            Object.keys(events).forEach(eventName => {
                // ругается No overload matches this call. непонятно почему
                // @ts-ignore
                this._element.removeEventListener(eventName, events[eventName]);
            });
        }
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
        
        if (typeof block === "string") {
            
            this._removeEvents()

            this._element.innerHTML = block

            this._addEvents()

            this.eventBus.emit(this.EVENTS.FLOW_CDR)
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