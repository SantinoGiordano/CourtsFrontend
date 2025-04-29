export type GameItem ={
    players: number;
    _id: string,
    name: string;
    status: boolean;
    time?: Date;
    location?: string;
    price?: number;
    type: string;
  };