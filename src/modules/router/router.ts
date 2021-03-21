import { Route } from "./route.js";
import { IRoute } from "./route.type.js";
import { routes } from './routes.js'

class Router {
    static __instance: any;
    routes: Route[];
    history: History;
    private _currentRoute: Route | null;
    private _rootQuery: string;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(routeProps: IRoute) {
        const route = new Route({ ...routeProps }, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this
    }

    start() {
        // Здесь e должен быть типа PopStateEvent, но в таком случае ругается на e.currentTarget.location.pathname
        // почему?
        window.onpopstate = (e: any) => this._onRoute(e.currentTarget.location.hash.replace('#/', ''))

        this._onRoute(window.location.hash.replace('#/', ''))
    }

    private _onRoute(path: string) {
        const route = this.getRoute(path);
        if (!route) return this.go('404')

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(path: string) {
        this.history.pushState({}, '', `#/${path}`)
        this._onRoute(path)
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    refresh() {
        location.reload()
    }

    getRoute(path: string) {
        return this.routes.find(route => route.match(path));
    }
}
const router = new Router('.app')
routes.forEach(r => router.use({ ...r }))
export { router }