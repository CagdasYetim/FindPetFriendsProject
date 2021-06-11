import { Router } from '@angular/router';
import { User } from './_models/user';
import { EventsService } from './_services/events.service';
import { DialogModel } from './_models/dialogModel';
import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
/* import { SwUpdate } from '@angular/service-worker'; */
import { HeaderService } from './_services/header.service';
import { AccountService } from './_services/account.service';
import { ToastService } from './_services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FindPetFriendsClient';
  promptEvent :any;
  items: {name:string,url?:string}[] = [];
  dialogModel !: DialogModel;
  currentUser!: User;

 HOME_ICON = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <title>home</title>
    <path d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"></path>
    </svg>
  `;

  USER_ICON = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <title>user</title>
    <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
    </svg>
  `;

  USER_EVENTS = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <title>menu</title>
    <path d="M2 6h28v6h-28zM2 14h28v6h-28zM2 22h28v6h-28z"></path>
    </svg>
  `;

  constructor(
    /* private swUpdate : SwUpdate, */
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>,
    public eventsService : EventsService,
    public headerService :HeaderService,
    public accountService : AccountService,
    private router: Router,
    private toastService : ToastService
    ){
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });

    iconRegistry.addSvgIconLiteral('home-icon', sanitizer.bypassSecurityTrustHtml(this.HOME_ICON));
    iconRegistry.addSvgIconLiteral('user-icon', sanitizer.bypassSecurityTrustHtml(this.USER_ICON));
    iconRegistry.addSvgIconLiteral('events-icon', sanitizer.bypassSecurityTrustHtml(this.USER_EVENTS));
  }

  ngOnInit(): void {
    this.setDialog();
    this.setCurrentUser();
    /* if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
          if (confirm("New version available. Load New Version?")) {
              window.location.reload();
          }
      });
    } */
    /* this.toastService.show('You have been successfully registered', {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
      headertext: 'Successfully Registered'
    }); */
  }

  setDialog(){
    this.dialogModel = {
      label: "Create Event",
      name : "Event",
      text: "Do you want to create a event ?",
      buttonOkLabel : "create",
      buttonCloseLabel : "cancel",
      inputs : [
        {label:"Name",mapEnable:false, type : "text",data : "",requestName:"NameOfEvent"},
        {label : "Date",mapEnable:false,type : "datetime-local",data : "",requestName:"StartDate"},
        {label : "From",mapEnable:true,type : "text",data : "",requestName:"From"},
        {label : "To",mapEnable:true,type : "text",data : "",requestName:"To"}
      ]
    };
  }

  clickFloat(){
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: this.dialogModel
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.eventsService.addEvent(result);
    });
  }

  installPwa(): void {
    this.promptEvent.prompt();
  }

  Logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/login');
    this.headerService.setHeader(this.headerService.loggedOutItems);
    this.toastService.show('You have been successfully logged out', {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
      headertext: 'Successfully you logged out'
    });
  }

  setCurrentUser() {
    var s = localStorage.getItem('user');
    let user !:User;
    if(s){
      user = JSON.parse(s);
    }

    if (user) {
      this.accountService.setCurrentUser(user);
      this.headerService.setHeader(this.headerService.loggedInItems);
    }
  }
}
