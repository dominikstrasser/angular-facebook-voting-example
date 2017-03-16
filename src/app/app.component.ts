import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs';
declare var FB;

interface REACTION_TYPES {

  LIKE: number;
  LOVE: number;
  HAHA: number;
  WOW: number;
  SAD: number;
  ANGRY: number;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Facebook Live Voting';

  public isLoggedIn = false;
  public user;
  public reactions: REACTION_TYPES;

  private currentTime = new Date().getTime();
  private isFirstCall = true;


  /**
   *
   * TODO: UPDATE THE VARIABLES!
   */

  private VARIABLES = {
    USER_ID: '',
    POST_ID: ''
  };

  constructor(
    private cdRef: ChangeDetectorRef
  ) {
    console.log('INIT');
  }

  ngOnInit() {
    setTimeout(() => {
      this.checkLoginStatus();
      this.resetReactions();
      this.initPolling();
    }, 3000);
  }

  resetReactions() {
    this.reactions = {
      LIKE: 0,
      LOVE: 0,
      HAHA: 0,
      WOW: 0,
      SAD: 0,
      ANGRY: 0
    };
  }

  initPolling() {
    Observable.interval(4000).startWith(0).subscribe(() => {
      if (!this.isLoggedIn) return;
      this.getReactions();
    });
  }

  checkLoginStatus() {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        console.log('Logged in.');
        this.getUserInfo();
        this.isLoggedIn = true;
      } else {
        console.log('Logged out.');
        this.isLoggedIn = false;
      }
    });
  }

  login() {
    FB.login((response) => {
      if (response.authResponse) {
        this.getUserInfo();
        this.isLoggedIn = true;
      } else {
        console.log('Authorization failed.');
      }
    }, { scope: 'email, user_posts' });
  }

  getUserInfo() {

    FB.api('/me', (response) => {
      this.user = response;
      this.cdRef.detectChanges();
      console.log(response);
    });

  }



  getReactions() {
    console.log('get reactions');

    let params: any = {
      summary: 1
    };

    if (!this.isFirstCall) {
      params.since = Math.round(this.currentTime / 1000);
    }

    FB.api(
      `/${this.VARIABLES.USER_ID}_${this.VARIABLES.POST_ID}/reactions`,
      'GET',
      params,
      (response) => {
        console.log(response);
        if (response && !response.error) {
          this.isFirstCall = false;
          for (let i = 0; i < response.data.length; i++) {
            const reaction = response.data[i];
            this.reactions[reaction.type] += 1;
          }
        }
      }
    );

    this.currentTime = new Date().getTime();
  }

  getReactionsKeys() {
    if (this.reactions) {
      return Object.keys(this.reactions);
    }
  }


}
