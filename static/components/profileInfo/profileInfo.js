import Block from '../block.js';
import ProfileInfoItem from './profileInfoItem/profileInfoItem.js';
export default class ProfileInfo extends Block {
    constructor(props) {
        super("ul", props, { "class": `profile-info d-flex flex-column mt-16 ${props.class ?? ''}` });
        this.props = props;
    }
    componentDidRender() {
        this.props.items.forEach((x) => {
            this.element.appendChild((new ProfileInfoItem(x).getContent()));
        });
    }
    render() {
        return '';
    }
}
//# sourceMappingURL=profileInfo.js.map