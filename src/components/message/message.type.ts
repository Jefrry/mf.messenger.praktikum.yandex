import { IBlockCompProps } from "../block/block.type";

interface IMessageCompProps extends IBlockCompProps {
    content: string,
    time: string
}

export { IMessageCompProps }