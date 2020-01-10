import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    // {
    //   title: 'Home',
    //   url: '/home',
    //   icon: 'home'
    // },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'desktop'
    },
    {
      title: 'MAU Progression',
      url: '/mau-progression',
      icon: 'jet'
    },
    {
      title: 'Revenue Trends',
      url: '/revenue-trend',
      icon: 'logo-usd'
    },
    {
      title: 'Pack Activation',
      url: '/pack-activation',
      icon: 'planet'
    },
    {
      title: 'Login Trends',
      url: '/login-trend',
      icon: 'log-in'
    },
    {
      title: 'MyGP Explore',
      url: '',
      icon: 'compass'
    },
    // {
    //   title: 'Upcoming Release',
    //   url: '/',
    //   icon: 'logo-android'
    // },
    // {
    //   title: 'Settings',
    //   url: '/',
    //   icon: 'build'
    // }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
