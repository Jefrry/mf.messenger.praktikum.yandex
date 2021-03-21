import { IBlockCompProps } from "../../../../components/block/block.type";

interface IMessageCompProps extends IBlockCompProps {
    content: string,
    time: string
}

export { IMessageCompProps }