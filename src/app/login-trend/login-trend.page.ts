import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-login-trend',
  templateUrl: './login-trend.page.html',
  styleUrls: ['./login-trend.page.scss'],
})
export class LoginTrendPage implements OnInit {

  @ViewChild('loginApi', {static: true}) loginApi: ElementRef;
  private loginApiChart: Chart;

  @ViewChild('allApi', {static: true}) allApi: ElementRef;
  private allApiChart: Chart;

  constructor(
    private http: HttpClient,
  ) { }

  k = 0;
  m = 0;
  n = 0;
  p = 0;
  minutesData = null;
  data = null;
  todayDate = null;
  yesterdaydate = null;
  lastWeek = null;
  todayMinus14 = null;

  loginToday = [];
  allApiToday = [];
  loginYesterday = [];
  allApiYesterday = [];
  timestamp = [];
  loginLastWeek = [];
  allApiLastWeek = [];
  loginTodayMinus14 = [];
  allApiTodayMinus14 = [];

  async loginTrend() {
    Chart.defaults.global.defaultFontColor = '#BBB';
    this.data = await this.http.get('https://spreadsheets.google.com/feeds/list/14OckpRbQHMiR2fZD5TPb3OznNTd7rWXj9_MLRhHWR5Q/3/public/values?alt=json').toPromise();
    this.minutesData = this.data.feed.entry;
    console.log(this.minutesData);

    this.todayDate = moment().format('YYYY-MM-DD');
    this.yesterdaydate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    this.lastWeek = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
    this.todayMinus14 = moment().subtract(2, 'weeks').format('YYYY-MM-DD');
    console.log(this.todayDate)

    for (let i = 0; i < this.minutesData.length; i++) {
      if (this.minutesData[i].gsx$date.$t === this.todayDate) {
        this.loginToday[this.k] = (Number(this.minutesData[i].gsx$login.$t));
        this.allApiToday[this.k] = (Number(this.minutesData[i].gsx$all.$t));
        // this.timestamp[this.k] = String(this.minutesData[i].gsx$timestamp.$t);
        this.k++;
      } else if (this.minutesData[i].gsx$date.$t === this.yesterdaydate) {
        this.loginYesterday[this.m] = (Number(this.minutesData[i].gsx$login.$t));
        this.allApiYesterday[this.m] = (Number(this.minutesData[i].gsx$all.$t));
        this.timestamp[this.m] = String(this.minutesData[i].gsx$timestamp.$t);
        this.m++;
      } else if (this.minutesData[i].gsx$date.$t === this.lastWeek) {
        this.loginLastWeek[this.n] = (Number(this.minutesData[i].gsx$login.$t));
        this.allApiLastWeek[this.n] = (Number(this.minutesData[i].gsx$all.$t));
        this.n++;
      } else if (this.minutesData[i].gsx$date.$t === this.todayMinus14) {
        this.loginTodayMinus14[this.p] = (Number(this.minutesData[i].gsx$login.$t));
        this.allApiTodayMinus14[this.p] = (Number(this.minutesData[i].gsx$all.$t));
        this.p++;
      }
    }  
    console.log(this.timestamp, this.loginToday);

    this.loginApiChart = new Chart(this.loginApi.nativeElement, {
      type: 'line',
      data: {
        labels: this.timestamp,
        datasets: [
          {
            label: 'Today',
            fill: false,
            lineTension: 0.3,
            backgroundColor: '#7FFF00',
            borderColor: '#7FFF00',
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: '#7FFF00',
            pointBackgroundColor: '#7FFF00',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#7FFF00',
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.loginToday,
            spanGaps: false,
          },
          {
            label: 'Yesterday',
            fill: false,
            hidden: true,
            lineTension: 0.3,
            backgroundColor: "#bc5090",
            borderColor: "#bc5090",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#bc5090",
            pointBackgroundColor: "#bc5090",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#bc5090",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.loginYesterday,
            spanGaps: false,
          },
          {
            label: 'Last Week',
            fill: false,
            lineTension: 0.3,
            backgroundColor: "rgba(25, 170, 248, 0.4)",
            borderColor: "rgba(25, 170, 248,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(25, 170, 248,1)",
            pointBackgroundColor: "rgba(25, 170, 248,1)",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(25, 170, 248,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.loginLastWeek,
            spanGaps: false,
          },
          {
            label: '2 Weeks Ago',
            fill: false,
            hidden: true,
            lineTension: 0.3,
            backgroundColor: "#ffa600",
            borderColor: "#ffa600",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#ffa600",
            pointBackgroundColor: "#ffa600",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#ffa600",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.loginTodayMinus14,
            spanGaps: false,
          }
        ]
      },
      options: {
        legend: {
          display: true,
          labels: {
          boxWidth: 12,
          }
        },
        tooltips: {
          enabled: true,
          mode: 'index',
          callbacks: {           
              title: function(tooltipItems) { 
                  return 'At ' + tooltipItems[0].xLabel + ':00 Hour :'
              },         
          }
        },
      }
    });

    this.allApiChart = new Chart(this.allApi.nativeElement, {
      type: 'line',
      data: {
        labels: this.timestamp,
        datasets: [
          {
            label: 'Today',
            fill: false,
            lineTension: 0.3,
            backgroundColor: '#7FFF00',
            borderColor: '#7FFF00',
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: '#7FFF00',
            pointBackgroundColor: '#7FFF00',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#7FFF00',
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.allApiToday,
            spanGaps: false,
          },
          {
            label: 'Yesterday',
            fill: false,
            hidden: true,
            lineTension: 0.3,
            backgroundColor: "#bc5090",
            borderColor: "#bc5090",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#bc5090",
            pointBackgroundColor: "#bc5090",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#bc5090",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.allApiYesterday,
            spanGaps: false,
          },
          {
            label: 'Last Week',
            fill: false,
            lineTension: 0.3,
            backgroundColor: "rgba(25, 170, 248, 0.4)",
            borderColor: "rgba(25, 170, 248,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(25, 170, 248,1)",
            pointBackgroundColor: "rgba(25, 170, 248,1)",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(25, 170, 248,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.allApiLastWeek,
            spanGaps: false,
          },
          {
            label: '2 Weeks Ago',
            fill: false,
            hidden: true,
            lineTension: 0.3,
            backgroundColor: "#ffa600",
            borderColor: "#ffa600",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#ffa600",
            pointBackgroundColor: "#ffa600",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#ffa600",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.allApiTodayMinus14,
            spanGaps: false,
          }
        ]
      },
      options: {
        legend: {
          display: true,
          labels: {
          boxWidth: 12,
          }
        },
        tooltips: {
          enabled: true,
          mode: 'index',
          callbacks: {           
              title: function(tooltipItems) { 
                  return 'At ' + tooltipItems[0].xLabel + ':00 Hour :'
              },         
          }
        },
      }
    });


  }

  ngOnInit() {
    this.loginTrend();
  }

}
