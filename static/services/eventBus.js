export default class EventBus {
    constructor() {
        this.listeners = {};
    }
    _isEventExist(event) {
        if (!this.listeners[event])
            throw Error(`Нет события ${event}`);
    }
    on(event, fn) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return true;
    }
    emit(event, ...args) {
        this._isEventExist(event);
        this.listeners[event].forEach(l => {
            l(...args);
        });
    }
    off(event, fn) {
        this._isEventExist(event);
        this.listeners[event] = this.listeners[event].filter(x => x !== fn);
        if (this.listeners[event].length === 0)
            delete this.listeners[event];
    }
}
//# sourceMappingURL=eventBus.js.map