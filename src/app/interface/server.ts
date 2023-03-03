import { StatusServer } from "../enum/statusServer.enum";

export interface Server{
    id:number;
    name:string;
    ipAddress:string;
    memory:string;
    type:string;
    imageUrl:string;
    statusServer:StatusServer;
}