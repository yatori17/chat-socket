import { Component, OnInit } from '@angular/core';
import {ChatService } from './core/chat.service';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons/faUserCircle';
import {faCircle} from '@fortawesome/free-solid-svg-icons/faCircle';
import {faWindowMinimize} from '@fortawesome/free-solid-svg-icons/faWindowMinimize';
import {faWindowMaximize} from '@fortawesome/free-solid-svg-icons/faWindowMaximize';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  message: {content: string, user: string} = {content: '',user: ''};
  messages: {content:string, user:string}[] = [];
  users:any[] = [];
  user: string;
  online: boolean;
  faUser = faUserCircle;
  faCircle = faCircle;
  faMax = faWindowMaximize;
  faMin = faWindowMinimize;

  constructor(private chatService: ChatService){
  }
  sendMessage(){
    this.message.user= this.user;
    this.chatService.sendMessage(this.message);
    this.message.content = '';
  }
  
  ngOnInit(){
    this.chatService.getMessages()
    .subscribe((message)=>{
      const objeto = {content: message.content, user: message.user}
      this.messages.push(objeto);
    });
    this.chatService.getStatus().subscribe((status)=>{
      this.users.push(status);
    });
  }
  setUser(){
    this.online = true;
    this.chatService.setStatus({name: this.user, online: true});
  }

}
