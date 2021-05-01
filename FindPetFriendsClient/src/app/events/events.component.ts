import { EventResponseDto } from './../models/eventResponseDto';
import { FilterDto } from './../models/filterDto';
import { CartController } from './../models/cartController';
import { EventsService } from './../services/events.service';
import { HelperService } from './../helpers/helper.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  toList !: string[];
  toFilterList : string[] = [];
  toCities !: string[];
  toFilterCities : string[] = [];
  filterShowed : boolean = false;
  date !: Date;
  name !:string;

  @ViewChild('eventFilter') eventFilter!:ElementRef;

  cartControllers:CartController[] = [];

  constructor(
    private helperService: HelperService,
    private eventService:EventsService
    ) { }

  ngOnInit(): void {
    this.helperService.getAllBreeds()
    .subscribe(response => {
      var breeds : any[] = [];
      breeds = breeds.concat(response);
      this.toList=[...breeds];
    });

    this.helperService.getAustriaCities()
        .subscribe(
          response => {
            var citiesOfAustria : any[] = [];
            citiesOfAustria = citiesOfAustria.concat(response);
            this.toCities = [...citiesOfAustria];
          }
        );
    this.date= new Date( (new Date).toISOString().substring(0,10));
    this.getFilteredEvents();
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

  getFilteredEvents():void{
    this.cartControllers = [];
    var filter :FilterDto = {
      nameOfEvent : this.name?this.name:undefined,
      dateOfEvent : this.date,
      inCities : this.toFilterCities.length<1 ?undefined : this.toFilterCities,
      withBreeds:this.toFilterList.length<1 ?undefined :this.toFilterList
    }

    this.eventService.getAllEventsWithFilter(filter)
        .subscribe(
          response => {
            this.mapResponse(response);
          },
          error => {

          }
        );
  }

  private mapResponse(eventResponseDto: EventResponseDto[]):void{
    eventResponseDto.forEach(
      r =>{
        var fromSplit = r.from.split('-');
        var toSplit = r.to.split('-');
        var date = new Date(r.startDate);
        var c: CartController = {
          headerTitle: r.nameOfEvent,
          avatarImage:"../../assets/favicon-96x96.png",
          headerSubTitle : r.city,
          content : `Date: ${this.pad( date.getDay()+1)}-${this.pad( date.getMonth()+1)}-${this.pad( date.getFullYear())} </br>
                     Time: ${this.pad( date.getUTCHours())}:${this.pad( date.getUTCMinutes())} </br>
                     Start Point : ${fromSplit[0]?.substring(0,5)}-${fromSplit[1]?.substring(0,5)} </br>
                     End Point : ${toSplit[0]?.substring(0,5)}-${toSplit[1]?.substring(0,5)} </br>
                     I have ${r.iHavesList} </br>
                     Love to have with ${r.canJoinsList}`,
          buttons : [
            {
              icon : "favorite",
              buttonMethod : ()=>{console.log("cagdas Yapar olum");}
            }
          ],
          from: r.from,
          to: r.to
        };
        this.cartControllers.push(c);
      }
    );
  }

  private pad(d:number) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  public getLat(val :string){
    return Number.parseFloat( val.split('-')[0]);
  }

  public getLng(val :string){
    return Number.parseFloat(val.split('-')[1]);
  }

}
