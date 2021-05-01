import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private baseUrl = environment.apiUrl;
  public allBreeds :string[] = [];

  constructor(private http: HttpClient) { }

  getAllBreeds(){
    return this.http.get(this.baseUrl+'Breeds/all');
  }

  getAustriaCities() {
    return this.http.get<string[]>(this.baseUrl+'Cities/all/AT');
  }
}
