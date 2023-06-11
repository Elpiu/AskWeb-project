
export enum Sender {
  Sender = 0,
  Chatbot = 1
}

export interface Message {
  id: number,
  content: string,
  time: Date,
  sender: Sender,
  url: string
}
