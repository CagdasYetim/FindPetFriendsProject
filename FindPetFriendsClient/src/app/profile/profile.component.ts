import { NotificationDto } from './../_models/notificationDto';
import { NewsletterService } from './../_services/newsletter.service';
import { SwPush } from '@angular/service-worker';
import { ProfileDto } from '../_models/profileDto';
import { HelperService } from '../_helpers/helper.service';
import { ProfileService } from '../_services/profile.service';
import { FormControl } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CheckboxTask } from '../_models/checkboxTask';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  control = new FormControl();
  iHaveList : string[] = [];
  joinToMeList : string[]=[];
  toList!: string[] ;
  myProfileSettings !: ProfileDto;
  cities : string [] = [];
  selectedCity!:string;
  sub!: PushSubscription;

  readonly VAPID_PUBLIC_KEY = "BPOzSx5jJTYUjB5W7ZzjwxkVSmCLu0pUsyzHvcro3F749ODLk1WjzxSgfRYHes9Tb8sj6qS3nAbToWuhipKnD1o";

  imgController!: {
    src: string;
    height?: string;
    width?: string;
  };

  checkboxTaskController !: CheckboxTask;

  constructor(
    private profileService: ProfileService,
    private helperService: HelperService,
    private cRef: ChangeDetectorRef,
    private swPush: SwPush,
    private newsletterService : NewsletterService
    ) {
      this.getProfileInfo();
     }

  ngOnInit(): void {
    this.imgController = {
      src : "../../assets/justExample.jpg",
      height: "10rem",
      width : "auto"
    };

    this.checkboxTaskController = {
      name: 'Privacy',
      label:'Privacy',
      completed: false,
      color: 'primary',
      subtasks: [
        {name: 'ShowName',label:'Show my Name', completed: false, color: 'primary'},
        {name:'ShowLastLocation', label: 'Show my last Location', completed: false, color: 'primary'},
        {name:'SendNotification',label: 'Send me notification',completed:false,color :'primary'}
      ]
    };

    this.helperService.getAllBreeds()
    .subscribe(response => {
      var breeds : any[] = [];
      breeds = breeds.concat(response);
      this.toList=[...breeds];
    });

    this.helperService.getAustriaCities()
        .subscribe(
          response => {
            this.cities = [...response];
          },
          error =>{

          }
        );
  }

  addIHaveResults(object:string){
    this.iHaveList.push(object);
  }

  removeIHave(object:string){
    this.iHaveList =  this.iHaveList.filter(e => e!==object);
  }

  addJoinToMeResults(object:string){
    this.joinToMeList.push(object);
  }

  removeJoin (object : string){
    this.joinToMeList = this.joinToMeList.filter(e => e!==object );
  }

  saveProfile(){
    let model :any = {};
    model.CanJoin = this.joinToMeList;
    model.iHave = this.iHaveList;
    model.City = this.selectedCity;
    this.checkboxTaskController.subtasks?.forEach(e => model[e.name]=e.completed);
    this.profileService.saveProfileSettings(model);
  }

  getProfileInfo(){
    this.profileService.getProfile()
        .subscribe(
          response=>{
            this.myProfileSettings = response;
            this.myProfileSettings.iHave.forEach(e => this.addIHaveResults(e));
            this.myProfileSettings.canJoin.forEach(e => this.addJoinToMeResults(e));
            this.selectedCity = response.city;
            this.checkboxTaskController
                .subtasks
                ?.forEach(e => {
                  if(e.name === 'ShowName'){
                    e.completed = response.showName;
                  }
                  else if(e.name === 'ShowLastLocation'){
                    e.completed = response.showLastLocation;
                  }
                  else if(e.name === 'SendNotification'){
                    e.completed = response.sendNotification;
                  }
                });

          },
          error =>{
            console.log(error);
          }
        );
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      console.log('i am there');
        var model : NotificationDto = {
          endpoint : sub.endpoint,
          p256dh :  this.arrayBufferToBase64(sub.getKey("p256dh")),
          auth : this.arrayBufferToBase64(sub.getKey("auth"))
        }
        this.newsletterService.addPushSubscriber(model).subscribe(
            () => console.log('Sent push subscription object to server.'),
            err =>  console.log('Could not send subscription object to server, reason: ', err)
        );
    })
    .catch(err => console.error("Could not subscribe to notifications", err));

  }

  arrayBufferToBase64(buffer:ArrayBuffer | null) {
    if(buffer === null)
      return '';

    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

}
