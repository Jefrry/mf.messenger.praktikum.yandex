export default class EventBus {
    listeners: {
        [key:string]: Array<Function>
    }
    constructor() {
      this.listeners = {}
    }

    private _isEventExist(event: string) {
        if (!this.listeners[event]) throw Error(`Нет события ${event}`)
    }

    on(event: string, fn: Function): boolean {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return true
    }

    emit(event: string, ...args: Array<any>): void {
        this._isEventExist(event)

        this.listeners[event].forEach(l => {
            l(...args)
        });
    }

    off(event: string, fn: Function): void {
        this._isEventExist(event)

        this.listeners[event] = this.listeners[event].filter(x => x !== fn)
        if (this.listeners[event].length === 0) delete this.listeners[event]
    }
}