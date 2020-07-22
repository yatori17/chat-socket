import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    constructor(){
        this.socket = io(this.url);
    }
    public joinChat(data){
        this.socket.emit('joinRoom',data);
    }
    public sendMessage(message){
        this.socket.emit('new-message', message);
    }
    public setStatus(status){
        this.socket.emit('status', status)
    }
    public getStatus= () => {
        return Observable.create((observer)=>{
            this.socket.on('roomUsers',(status) =>{
                console.log(status)
                observer.next(status);
            })
        })
    }
    
    public getMessages = () =>{
        console.log("AQUI")
        return Observable.create((observer)=>{
            this.socket.on('new-message', (message) =>{
                console.log(message)
                observer.next(message);
            })
        })
    }
}