import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  loginUsers: any = [];
  totalNumFollowers: any = [];

  constructor() { }

  setLoginUsers(loginUsers: any[]) {
    this.loginUsers = loginUsers;
  }

  getLoginUsers() {
    return this.loginUsers;
  }

  setTotalFollowers(totalNumFollowers: any[]) {
    this.totalNumFollowers = totalNumFollowers;
  }

  getTotalNumFollowers() {
    return this.totalNumFollowers;
  }
}
