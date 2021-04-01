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

interface ISubOnNewMessages {
  chatId: number
  userId: number
  token: string
}

interface IMessage {
  content: string,
  type: string,
  user_id: number,
  time: Date | string
}

export { IChatsListData, ICreateChatData, ISubOnNewMessages, IMessage }