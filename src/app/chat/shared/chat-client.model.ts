export interface ChatClient {
  id: number;
  socketId?: string;
  nickname: string;
  typing?: boolean;
}
