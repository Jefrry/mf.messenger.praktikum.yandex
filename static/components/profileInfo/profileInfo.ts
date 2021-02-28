import Block from '../block.js'
import ProfileInfoItem from './profileInfoItem/profileInfoItem.js'
export default class ProfileInfo extends Block {
    constructor(protected props: { [key:string]: any, items: { [key:string]: any, name: string, value: string, class?: string }[], class?: string }) {
        super("ul", props, {"class": `profile-info d-flex flex-column mt-16 ${props.class ?? ''}`});
    }

    componentDidRender() {
        this.props.items.forEach((x: { [key:string]: any, name: string, value: string, class?: string } ) => {
            this.element.appendChild((new ProfileInfoItem(x).getContent()))
        });
    }

    render() {
        return '';
    }
}