
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

export class ConcreteMessage implements Message {
  content: string;
  id: number;
  sender: Sender;
  time: Date;
  url: string;


  constructor(content: string, id: number, sender: Sender, time: Date, url: string) {
    this.content = content;
    this.id = id;
    this.sender = sender;
    this.time = time;
    this.url = url;
  }
}
