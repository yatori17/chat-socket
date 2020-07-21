import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    constructor(){
        this.socket = io(this.url);
    }
    public sendMessage(message){
        this.socket.emit('new-message', message);
    }
    public setStatus(status){
        this.socket.emit('status', status)
    }
    public getStatus= () => {
        return Observable.create((observer)=>{
            this.socket.on('status',(status) =>{
                observer.next(status);
            })
        })
    }
    public getMessages = () =>{
        return Observable.create((observer)=>{
            this.socket.on('new-message', (message) =>{
                observer.next(message);
            })
        })
    }
}