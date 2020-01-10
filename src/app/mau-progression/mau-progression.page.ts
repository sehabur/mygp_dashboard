import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-mau-progression',
  templateUrl: './mau-progression.page.html',
  styleUrls: ['./mau-progression.page.scss'],
})
export class MauProgressionPage implements OnInit {

  @ViewChild('lineCanvas1', {static: true}) lineCanvas1: ElementRef;
  private lineChart1: Chart;

  @ViewChild('uniqueMsisdnDaily', {static: true}) uniqueMsisdnDaily: ElementRef;
  private uniqueMsisdnDailyChart: Chart;

  @ViewChild('mauDaily', {static: true}) mauDaily: ElementRef;
  @ViewChild('dauDaily', {static: true}) dauDaily: ElementRef;
  private mauDailyChart: Chart;
  private dauDailyChart: Chart;

  data = null;
  hourlyData = null;
  dailyData = null;
  hourlyDataYesterday = null;
  hourlyUniqueMsisdn = [];
  hourlyUniqueMsisdnYesterday = [];
  hourValue = [];
  dayValue = [];
  novDau = [];
  novMau = [];
  novUniq = [];
  decDau = [];
  decMau = [];
  decUniq = [];
  j = 0;
  k = 0;
  m = 0;
  n = 0;

  currentMonthName = moment().format('MMMM');
  currentMonthDau = [];
  currentMonthMau = [];
  currentMonthUniq = [];
  lastMonthName = moment().subtract(1, 'months').format('MMMM');
  lastMonthDau = [];
  lastMonthMau = [];
  lastMonthUniq = [];
   
  constructor(
    private http: HttpClient,
  ) { }

  lastMonth = null;
  lastYear = null;

  async dauMauDaily() {

    Chart.defaults.global.defaultFontColor = '#BBB';
    this.data = await this.http.get('https://spreadsheets.google.com/feeds/list/14OckpRbQHMiR2fZD5TPb3OznNTd7rWXj9_MLRhHWR5Q/5/public/values?alt=json').toPromise();
    this.dailyData = this.data.feed.entry;
    console.log(this.dailyData);

    if (moment().format('M') === '1') {
      this.lastMonth = '12';
      this.lastYear = String(Number(moment().format('YYYY')) - 1);
    } else {
      this.lastMonth = String(Number(moment().format('M')) - 1);
      this.lastYear = moment().format('YYYY');
    }

    for (let i = 0; i < this.dailyData.length; i++) {
      if (this.dailyData[i].gsx$month.$t === moment().format('M') && this.dailyData[i].gsx$year.$t === moment().format('YYYY')) {
        this.currentMonthDau[this.k] = (Number(this.dailyData[i].gsx$dau.$t)/1000000).toFixed(2);
        this.currentMonthMau[this.k] = (Number(this.dailyData[i].gsx$mau.$t)/1000000).toFixed(2);
        this.currentMonthUniq[this.k] = (Number(this.dailyData[i].gsx$uniq.$t)/1000).toFixed(2);
        this.k++;
      // tslint:disable-next-line: max-line-length
      } else if (this.dailyData[i].gsx$month.$t === this.lastMonth && this.dailyData[i].gsx$year.$t === this.lastYear) {
        this.lastMonthDau[this.n] = (Number(this.dailyData[i].gsx$dau.$t)/1000000).toFixed(2);
        this.lastMonthMau[this.n] = (Number(this.dailyData[i].gsx$mau.$t)/1000000).toFixed(2);
        this.lastMonthUniq[this.n] = (Number(this.dailyData[i].gsx$uniq.$t)/1000).toFixed(2);
        this.dayValue[this.n] = String(this.dailyData[i].gsx$date.$t);
        this.n++;
      }
    }
    console.log(this.currentMonthDau, this.lastMonthDau, this.dayValue);

    // for (let i = 0; i < this.dailyData.length; i++) {
    //   this.dayValue[this.k] = String(this.dailyData[i].gsx$day.$t);
    //   this.novDau[this.k] = (Number(this.dailyData[i].gsx$novdau.$t)/1000000).toFixed(2);
    //   this.novMau[this.k] = (Number(this.dailyData[i].gsx$novmau.$t)/1000000).toFixed(2);
    //   this.novUniq[this.k] = (Number(this.dailyData[i].gsx$novuniq.$t)/1000).toFixed(2);
    //   this.decDau[this.k] = (Number(this.dailyData[i].gsx$decdau.$t)/1000000).toFixed(2);
    //   this.decMau[this.k] = (Number(this.dailyData[i].gsx$decmau.$t)/1000000).toFixed(2);
    //   this.decUniq[this.k] = (Number(this.dailyData[i].gsx$decuniq.$t)/1000).toFixed(2);
    //   this.k++;
    // }






    // Chart.defaults.global.defaultFontColor = '#BBB';
    // this.data = await this.http.get('https://spreadsheets.google.com/feeds/list/14OckpRbQHMiR2fZD5TPb3OznNTd7rWXj9_MLRhHWR5Q/4/public/values?alt=json').toPromise();
    // this.dailyData = this.data.feed.entry;
    // for (let i = 0; i < this.dailyData.length; i++) {
    //   this.dayValue[this.k] = String(this.dailyData[i].gsx$day.$t);
    //   this.novDau[this.k] = (Number(this.dailyData[i].gsx$novdau.$t)/1000000).toFixed(2);
    //   this.novMau[this.k] = (Number(this.dailyData[i].gsx$novmau.$t)/1000000).toFixed(2);
    //   this.novUniq[this.k] = (Number(this.dailyData[i].gsx$novuniq.$t)/1000).toFixed(2);
    //   this.decDau[this.k] = (Number(this.dailyData[i].gsx$decdau.$t)/1000000).toFixed(2);
    //   this.decMau[this.k] = (Number(this.dailyData[i].gsx$decmau.$t)/1000000).toFixed(2);
    //   this.decUniq[this.k] = (Number(this.dailyData[i].gsx$decuniq.$t)/1000).toFixed(2);
    //   this.k++;
    // }
    // this.decDau = this.decDau.map(function(val) {
    //   return val === '0.00' ? null : val;
    // });
    // this.decMau = this.decMau.map(function(val) {
    //   return val === '0.00' ? null : val;
    // });
    // this.decUniq = this.decUniq.map(function(val) {
    //   return val === '0.00' ? null : val;
    // });
    
    this.uniqueMsisdnDailyChart = new Chart(this.uniqueMsisdnDaily.nativeElement, {
      type: 'line',
      data: {
        labels: this.dayValue,
        datasets: [
          {
            label: this.currentMonthName,
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
            data: this.currentMonthUniq,
            spanGaps: false,
          },
          {
            label: this.lastMonthName,
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
            data: this.lastMonthUniq,
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
                  return 'At Day ' + tooltipItems[0].xLabel + ' :'
              },         
          }
        },
      }
    });

    this.mauDailyChart = new Chart(this.mauDaily.nativeElement, {
      type: 'line',
      data: {
        labels: this.dayValue,
        datasets: [
          {
            label: this.currentMonthName,
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
            data: this.currentMonthMau,
            spanGaps: false,
          },
          {
            label: this.lastMonthName,
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
            data: this.lastMonthMau,
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
                  return 'At Day ' + tooltipItems[0].xLabel + ' :'
              },         
          }
        },
      }
    });

    this.dauDailyChart = new Chart(this.dauDaily.nativeElement, {
      type: 'line',
      data: {
        labels: this.dayValue,
        datasets: [
          {
            label: this.currentMonthName,
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
            data: this.currentMonthDau,
            spanGaps: false,
          },
          {
            label: this.lastMonthName,
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
            data: this.lastMonthDau,
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
                  return 'At Day ' + tooltipItems[0].xLabel + ' :'
              },         
          }
        },
      }
    });
  }

  async uniqueDauHourly() {

    const todayDate = moment().format('D');
    const yesterdayDate = Number(todayDate) - 1;
    // tslint:disable-next-line: max-line-length
    this.data = await this.http.get('https://spreadsheets.google.com/feeds/list/1lOtGXuPvkfAKrzs-E8atCF_R59YSC1j5RXHEtfYzCA4/' + Number(todayDate) + '/public/values?alt=json').toPromise();
    this.hourlyData = this.data.feed.entry;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.hourlyData.length; i++) {
        if (this.hourlyData[i].gsx$month.$t === moment().format('M') && this.hourlyData[i].gsx$year.$t === moment().format('YYYY')) {
          this.hourlyUniqueMsisdn[this.j] = (Number(this.hourlyData[i].gsx$dau.$t) / 1000).toFixed(2);
          // this.hourValue[this.j] = String(this.hourlyData[i].gsx$hour.$t);
          this.j++;
        }
    }
    if (yesterdayDate > 0) {
      // tslint:disable-next-line: max-line-length
      this.data = await this.http.get('https://spreadsheets.google.com/feeds/list/1lOtGXuPvkfAKrzs-E8atCF_R59YSC1j5RXHEtfYzCA4/' + Number(yesterdayDate) + '/public/values?alt=json').toPromise();
      this.hourlyDataYesterday = this.data.feed.entry;
      console.log(this.hourlyDataYesterday);
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.hourlyDataYesterday.length; i++) {
        // tslint:disable-next-line: max-line-length
        if (this.hourlyDataYesterday[i].gsx$month.$t === moment().format('M') && this.hourlyDataYesterday[i].gsx$year.$t === moment().format('YYYY')) {
          this.hourlyUniqueMsisdnYesterday[this.m] = (Number(this.hourlyDataYesterday[i].gsx$dau.$t) / 1000).toFixed(2);
          this.hourValue[this.m] = String(this.hourlyDataYesterday[i].gsx$hour.$t);
          this.m++;
        }
      }
    }

    this.lineChart1 = new Chart(this.lineCanvas1.nativeElement, {
      type: 'line',
      data: {
        labels: this.hourValue,
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
            data: this.hourlyUniqueMsisdn,
            spanGaps: false
          },
          {
            label: 'Yesterday',
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(25, 170, 248, 0.4)",
            borderColor: "rgba(25, 170, 248,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(25, 170, 248,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(25, 170, 248,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.hourlyUniqueMsisdnYesterday,
            spanGaps: false
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
                  return 'At Hour ' + tooltipItems[0].xLabel + ':00 :'
              },         
          }
        },
      }
    });

    

  }

  ngOnInit() {
    this.uniqueDauHourly();
    this.dauMauDaily();
  }

}
