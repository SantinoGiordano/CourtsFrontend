export type GameItem ={
    playershave: number;
    playersneed: number;
    _id: string,
    status: boolean;
    time?: Date;
    name: string;
    location?: string;
    type: string;
    description: string;
  };

export type User = {
  username: string
}