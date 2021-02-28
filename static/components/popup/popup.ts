import Block from '../block.js'
import PopupItem from './popupItem/popupItem.js'
export default class Popup extends Block {
    constructor(protected props: { [key:string]: any, items: { [key:string]: any, icon: string, text: string, events?: {[key:string]: Function}, class?: string }[], class?: string }) {
        super("ul", props, {"class": `popup shadow d-none ${props.class ?? ''}`});
    }

    componentDidRender() {
        this.props.items.forEach((x: { [key:string]: any, icon: string, text: string, events?: {[key:string]: Function}, class?: string } ) => {
            this.element.appendChild((new PopupItem(x).getContent()))
        });
    }

    render() {
        return '';
    }
}