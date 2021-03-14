import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FindPetFriendsClient';
  promptEvent :any;
  items: {name:string,url?:string}[] = [];

  constructor(private swUpdate : SwUpdate){
    this.items.push({name:"HOME",url:"/home"});
    this.items.push({name:"PROFILE",url:"/profile"});
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
          if (confirm("New version available. Load New Version?")) {
              window.location.reload();
          }
      });
    }
  }

  installPwa(): void {
    this.promptEvent.prompt();
  }

}
