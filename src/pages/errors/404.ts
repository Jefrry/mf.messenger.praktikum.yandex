import {template} from './errors.tmpl.js'
import {Templator} from '../../services/templator.js'
import { data404 } from './mocks.js';
import { Block } from '../../components/block/block.js';
export default class Page404 extends Block {
    constructor(protected props: any) {
        super("div", props, {"class": `page page-error d-flex flex-column justify-center align-center ${props.class ?? ''}`});
    }

    render() {
        return (new Templator('')).compile({});
    }

    async componentDidRender() {
        await (() => {
            const block = (new Templator(template)).compile(data404)
            this.element.innerHTML = block;
        })()
    }
}