import {Block} from '../block/block.js'
import { IProfileInfoCompProps, IProfileInfoCompPropsItem } from './profileInfo.type.js';
import { ProfileInfoItemComp } from './profileInfoItem/profileInfoItem.js';
class ProfileInfoComp extends Block {
    constructor(protected props: IProfileInfoCompProps) {
        super("ul", props, {"class": `profile-info d-flex flex-column mt-16 ${props.class ?? ''}`});
    }

    componentDidRender() {
        this.props.items.forEach((x: IProfileInfoCompPropsItem ) => {
            this.element.appendChild((new ProfileInfoItemComp(x).getContent()))
        });
    }

    render() {
        return '';
    }
}

export {ProfileInfoComp}