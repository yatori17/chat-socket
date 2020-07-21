import { Component, OnInit } from '@angular/core';
import {ChatService } from './core/chat.service';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons/faUserCircle';
import {faCircle} from '@fortawesome/free-solid-svg-icons/faCircle';
import {faWindowMinimize} from '@fortawesome/free-solid-svg-icons/faWindowMinimize';
import {faWindowMaximize} from '@fortawesome/free-solid-svg-icons/faWindowMaximize';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}
const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

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
  countries = COUNTRIES;
  
  

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
