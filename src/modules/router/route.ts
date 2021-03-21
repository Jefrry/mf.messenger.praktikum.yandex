import { Block } from "../../components/block/block";
import { IRoute } from "./route.type";

class Route {
  private _path: string;
  private _pageComponent: any;
  private _props: { [x: string]: any; };
  private _block: Block | null;
  componentFunctionPromise: Function; // функция, которая возвращает промис с модулем (смотреть функцию render)

  constructor(routeProps: IRoute, props: { [x: string]: string }) {
    this._path = routeProps.path;
    this.componentFunctionPromise = routeProps.component
    this._block = null;
    this._props = props;
  }

  navigate(path: string) {
    if (this.match(path)) {
      this._path = path;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.remove();
    }
  }

  match(path: string): boolean {
    return path === this._path
  }

  async render() {
    // если страница не "закеширована"
    if (!this._pageComponent) {
      // то динамически вызываю компонент страницы
      // чтобы не подтягивать все страницы сразу
      await this.componentFunctionPromise().then((module: { default: any; }) => {
        this._pageComponent = module.default
      })
    }

    this._block = new this._pageComponent({})
    if (this._block) {
      this._renderPage(this._props.rootQuery, this._block);
      return
    }
  }

  private _renderPage(query: string, block: Block): void {
    const root = document.querySelector(query);
    if (root) {
      root.appendChild(block.getContent())
    }
  }
}

export { Route }