import { EventResponseDto } from './../_models/eventResponseDto';
import { DbModel } from './../_models/dbModel';
import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  private version:string = '2.7';
  private dbName:string = 'pwa-db';

  constructor() {
  }

  async createDb(){
    return openDB<DbModel>(this.dbName+this.version,1,{
      upgrade(db) {
        db.createObjectStore('Event');
        db.createObjectStore('EventPost',{ keyPath: "id", autoIncrement:true });
        db.createObjectStore('ProfilePost');
      }
    });
  }

  async addEvent(event:EventResponseDto,i:number){
    var db = await this.createDb();
    await db.put('Event',event,i);
  }

  async clearEventStore(){
    var db = await this.createDb();
    var tx = db.transaction('Event', 'readwrite');
    var events = tx.objectStore('Event');
    events.clear()
      .then(
        () =>{
          console.log("events are cleared");
        }
      )
      .catch(
        ()=>{
          console.log("events could not cleared");
        }
      )
      ;
  }

  async getEvents(){
    var db = await this.createDb();
    var tx = db.transaction('Event', 'readonly');
    var events = tx.objectStore('Event');
    return events.getAll();
  }

  async addEventPost(postValue:{path:string,model:any,token:string}){
    var db = await this.createDb();
    await db.put('EventPost',postValue);
  }

  async addProfilePost(postValue:{path:string,model:any,token:string}){
    var db = await this.createDb();
    await db.put('ProfilePost',postValue,0);
  }

}
