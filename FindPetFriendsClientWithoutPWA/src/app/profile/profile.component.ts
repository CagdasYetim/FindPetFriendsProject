import { HelperService } from './../helpers/helper.service';
import { ProfileService } from './../services/profile.service';
import { FormControl } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CheckboxTask } from '../models/checkboxTask';

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


  imgController!: {
    src: string;
    height?: string;
    width?: string;
  };

  checkboxTaskController !: CheckboxTask;

  constructor(
    private profileService: ProfileService,
    private helperService: HelperService,
    private cRef: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.helperService.getAllBreeds()
        .subscribe(response => {
          var breeds : any[] = [];
          breeds = breeds.concat(response);
          this.toList=[...breeds];
        });

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
    model.joinToMe = this.joinToMeList;
    model.iHave = this.iHaveList;
    this.checkboxTaskController.subtasks?.forEach(e => model[e.name]=e.completed);
    this.profileService.saveProfileSettings(model);
  }

}
