import { HelperService } from './../helpers/helper.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  toList : string[]=[];
  toFilterList : string[] = [];
  toCities : string[]=[];
  toFilterCities : string[] = [];
  filterShowed : boolean = false;

  @ViewChild('eventFilter') eventFilter!:ElementRef;

  cartController !:
    {
      headerTitle:string,
      headerSubTitle?:string,
      avatarImage:string,
      cartImage?:string,
      content:string,
      buttons : {
        name?:string,
        icon?:string,
        buttonMethod() : any
      }[]
    };

  constructor(
    private helperService: HelperService,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    this.toList = this.helperService.getAllBreeds();
    this.toCities = this.helperService.getAustriaCities();
    this.setCarts();
  }

  setCarts():void{
    this.cartController = {
      headerTitle:"CartTitle",
      avatarImage:"../../assets/favicon-96x96.png",
      headerSubTitle : "this is a subtitle",
      content : "this is a abuk sabuk content this is a abuk sabuk content this is a abuk sabuk content this is a abuk sabuk content",
      buttons : [
        {
          icon : "favorite",
          buttonMethod : ()=>{console.log("cagdas Yapar olum");}
        }
      ]
    };
  }

  addBreeds(object : string):void{
    this.toFilterList.push(object);
  }

  removeBreeds(object:string){
    this.toFilterList =  this.toFilterList.filter(e => e!==object);
  }

  addCities(object : string):void{
    this.toFilterCities.push(object);
  }

  removeCities(object:string){
    this.toFilterCities =  this.toFilterList.filter(e => e!==object);
  }

  showFilter():void{
    if(!this.filterShowed)
      this.eventFilter.nativeElement.style.display='block';
    else
      this.eventFilter.nativeElement.style.display='none';

    this.filterShowed = !this.filterShowed;
  }

}
