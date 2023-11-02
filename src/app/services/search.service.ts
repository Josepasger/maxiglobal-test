import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = [
    'https://api.github.com/search/users?q=',
    'https://api.github.com/users/',
  ];

  constructor(private http: HttpClient) {}

  fetchUsers(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl[0] + name}`);
  }

  fetchFollowers(user: any) {
    return this.http.get(user.followers_url);
  }

  fetchUserData(name: string) {
    return this.http.get(`${this.apiUrl[1] + name}`);
  }
}
