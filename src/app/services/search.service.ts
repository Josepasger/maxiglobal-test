import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../utilities/messages';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  private url = URL;

  constructor(private http: HttpClient) {}

  fetchUsers(name: string): Observable<any> {
    return this.http.get(`${this.url.search + name}`);
  }

  fetchFollowers(user: any) {
    return this.http.get(user.followers_url);
  }

  fetchUserData(name: string) {
    return this.http.get(`${this.url.detail + name}`);
  }
}
