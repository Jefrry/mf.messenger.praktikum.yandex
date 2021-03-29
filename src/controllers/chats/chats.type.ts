interface IChatsListData {
  title: string,
  avatar: string,
  message: string,
  date?: string,
  id: number,
  created_by: number,
  notification?: number
}

type ICreateChatData = Pick<IChatsListData, 'title'>

export { IChatsListData, ICreateChatData }