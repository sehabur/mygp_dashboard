import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-pack-activation',
  templateUrl: './pack-activation.page.html',
  styleUrls: ['./pack-activation.page.scss'],
})
export class PackActivationPage implements OnInit {

  @ViewChild('fiveFourTk', {static: true}) fiveFourTk: ElementRef;
  private fiveFourTkChart: Chart;

  @ViewChild('threeThreeTk', {static: true}) threeThreeTk: ElementRef;
  private threeThreeTkChart: Chart;

  @ViewChild('oneZeroFourTk', {static: true}) oneZeroFourTk: ElementRef;
  private oneZeroFourTkChart: Chart;

  @ViewChild('EightNineTk', {static: true}) EightNineTk: ElementRef;
  private EightNineTkChart: Chart;

  @ViewChild('oneFourEightTk', {static: true}) oneFourEightTk: ElementRef;
  private oneFourEightTkChart: Chart;

  @ViewChild('oneEightNineTk', {static: true}) oneEightNineTk: ElementRef;
  private oneEightNineTkChart: Chart;

  @ViewChild('oneNineEightTk', {static: true}) oneNineEightTk: ElementRef;
  private oneNineEightTkChart: Chart;

  @ViewChild('twoFourSevenTk', {static: true}) twoFourSevenTk: ElementRef;
  private twoFourSevenTkChart: Chart;

  @ViewChild('twoEightNineTk', {static: true}) twoEightNineTk: ElementRef;
  private twoEightNineTkChart: Chart;

  @ViewChild('threeNineNineTk', {static: true}) threeNineNineTk: ElementRef;
  private threeNineNineTkChart: Chart;

  constructor(
    private http: HttpClient,
  ) { }

  data = null;
  hourlyData = null;

  hourValue = [];
  
 
  
  k = 0;
  m = 0;
  n = 0;
  p = 0;
  todayDate = null;
  yesterdaydate = null;
  lastWeek = null;
  todayMinus14 = null;

  fiveFourTkTodayMinus14 = [];
  threeThreeTkTodayMinus14 = [];
  oneZeroFourTkTodayMinus14 = [];
  EightNineTkTodayMinus14 = [];
  oneFourEightTkTodayMinus14 = [];
  oneEightNineTkTodayMinus14 = [];
  oneNineEightTkTodayMinus14 = [];
  twoFourSevenTkTodayMinus14 = [];
  twoEightNineTkTodayMinus14 = [];
  threeNineNineTkTodayMinus14 = [];

  fiveFourTkLastWeek = [];
  threeThreeTkLastWeek = [];
  oneZeroFourTkLastWeek = [];
  EightNineTkLastWeek = [];
  oneFourEightTkLastWeek = [];
  oneEightNineTkLastWeek = [];
  oneNineEightTkLastWeek = [];
  twoFourSevenTkLastWeek = [];
  twoEightNineTkLastWeek = [];
  threeNineNineTkLastWeek = [];
  
  fiveFourTkYesterday = [];
  threeThreeTkYesterday = [];
  oneZeroFourTkYesterday = [];
  EightNineTkYesterday = [];
  oneFourEightTkYesterday = [];
  oneEightNineTkYesterday = [];
  oneNineEightTkYesterday = [];
  twoFourSevenTkYesterday = [];
  twoEightNineTkYesterday = [];
  threeNineNineTkYesterday = [];

  fiveFourTkToday = [];
  threeThreeTkToday = [];
  oneZeroFourTkToday = [];
  EightNineTkToday = [];
  oneFourEightTkToday = [];
  oneEightNineTkToday = [];
  oneNineEightTkToday = [];
  twoFourSevenTkToday = [];
  twoEightNineTkToday = [];
  threeNineNineTkToday = []; 

  async hourlyPackActivation() {
    Chart.defaults.global.defaultFontColor = '#BBB';
    this.data = await this.http.get('https://spreadsheets.google.com/feeds/list/14OckpRbQHMiR2fZD5TPb3OznNTd7rWXj9_MLRhHWR5Q/2/public/values?alt=json').toPromise();
    this.hourlyData = this.data.feed.entry;
    console.log(this.hourlyData);

    this.todayDate = moment().format('YYYY-MM-DD');
    this.yesterdaydate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    this.lastWeek = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
    this.todayMinus14 = moment().subtract(2, 'weeks').format('YYYY-MM-DD');
    console.log(this.todayDate)

    for (let i = 0; i < this.hourlyData.length; i++) {
      if (this.hourlyData[i].gsx$date.$t === this.todayDate) {
        this.fiveFourTkToday[this.k] = (Number(this.hourlyData[i].gsx$fivefourtk.$t));
        this.threeThreeTkToday[this.k] = (Number(this.hourlyData[i].gsx$threethreetk.$t));
        this.oneZeroFourTkToday[this.k] = (Number(this.hourlyData[i].gsx$onezerofourtk.$t));
        this.EightNineTkToday[this.k] = (Number(this.hourlyData[i].gsx$eightninetk.$t));
        this.oneFourEightTkToday[this.k] = (Number(this.hourlyData[i].gsx$onefoureighttk.$t));
        this.oneEightNineTkToday[this.k] = (Number(this.hourlyData[i].gsx$oneeightninetk.$t));
        this.oneNineEightTkToday[this.k] = (Number(this.hourlyData[i].gsx$onenineeighttk.$t));
        this.twoFourSevenTkToday[this.k] = (Number(this.hourlyData[i].gsx$twofourseventk.$t));
        this.twoEightNineTkToday[this.k] = (Number(this.hourlyData[i].gsx$twoeightninetk.$t));
        this.threeNineNineTkToday[this.k] = (Number(this.hourlyData[i].gsx$threenineninetk.$t));
        this.k++;
      } else if (this.hourlyData[i].gsx$date.$t === this.yesterdaydate) {
        this.fiveFourTkYesterday[this.m] = (Number(this.hourlyData[i].gsx$fivefourtk.$t));
        this.threeThreeTkYesterday[this.m] = (Number(this.hourlyData[i].gsx$threethreetk.$t));
        this.oneZeroFourTkYesterday[this.m] = (Number(this.hourlyData[i].gsx$onezerofourtk.$t));
        this.EightNineTkYesterday[this.m] = (Number(this.hourlyData[i].gsx$eightninetk.$t));
        this.oneFourEightTkYesterday[this.m] = (Number(this.hourlyData[i].gsx$onefoureighttk.$t));
        this.oneEightNineTkYesterday[this.m] = (Number(this.hourlyData[i].gsx$oneeightninetk.$t));
        this.oneNineEightTkYesterday[this.m] = (Number(this.hourlyData[i].gsx$onenineeighttk.$t));
        this.twoFourSevenTkYesterday[this.m] = (Number(this.hourlyData[i].gsx$twofourseventk.$t));
        this.twoEightNineTkYesterday[this.m] = (Number(this.hourlyData[i].gsx$twoeightninetk.$t));
        this.threeNineNineTkYesterday[this.m] = (Number(this.hourlyData[i].gsx$threenineninetk.$t));
        this.hourValue[this.m] = String(this.hourlyData[i].gsx$hour.$t);
        this.m++;
      } else if (this.hourlyData[i].gsx$date.$t === this.lastWeek) {
        this.fiveFourTkLastWeek[this.n] = (Number(this.hourlyData[i].gsx$fivefourtk.$t));
        this.threeThreeTkLastWeek[this.n] = (Number(this.hourlyData[i].gsx$threethreetk.$t));
        this.oneZeroFourTkLastWeek[this.n] = (Number(this.hourlyData[i].gsx$onezerofourtk.$t));
        this.EightNineTkLastWeek[this.n] = (Number(this.hourlyData[i].gsx$eightninetk.$t));
        this.oneFourEightTkLastWeek[this.n] = (Number(this.hourlyData[i].gsx$onefoureighttk.$t));
        this.oneEightNineTkLastWeek[this.n] = (Number(this.hourlyData[i].gsx$oneeightninetk.$t));
        this.oneNineEightTkLastWeek[this.n] = (Number(this.hourlyData[i].gsx$onenineeighttk.$t));
        this.twoFourSevenTkLastWeek[this.n] = (Number(this.hourlyData[i].gsx$twofourseventk.$t));
        this.twoEightNineTkLastWeek[this.n] = (Number(this.hourlyData[i].gsx$twoeightninetk.$t));
        this.threeNineNineTkLastWeek[this.n] = (Number(this.hourlyData[i].gsx$threenineninetk.$t));
        this.n++;
      } else if (this.hourlyData[i].gsx$date.$t === this.todayMinus14) {
        this.fiveFourTkTodayMinus14[this.p] = (Number(this.hourlyData[i].gsx$fivefourtk.$t));
        this.threeThreeTkTodayMinus14[this.p] = (Number(this.hourlyData[i].gsx$threethreetk.$t));
        this.oneZeroFourTkTodayMinus14[this.p] = (Number(this.hourlyData[i].gsx$onezerofourtk.$t));
        this.EightNineTkTodayMinus14[this.p] = (Number(this.hourlyData[i].gsx$eightninetk.$t));
        this.oneFourEightTkTodayMinus14[this.p] = (Number(this.hourlyData[i].gsx$onefoureighttk.$t));
        this.oneEightNineTkTodayMinus14[this.p] = (Number(this.hourlyData[i].gsx$oneeightninetk.$t));
        this.oneNineEightTkTodayMinus14[this.p] = (Number(this.hourlyData[i].gsx$onenineeighttk.$t));
        this.twoFourSevenTkTodayMinus14[this.p] = (Number(this.hourlyData[i].gsx$twofourseventk.$t));
        this.twoEightNineTkTodayMinus14[this.p] = (Number(this.hourlyData[i].gsx$twoeightninetk.$t));
        this.threeNineNineTkTodayMinus14[this.p] = (Number(this.hourlyData[i].gsx$threenineninetk.$t));
        this.p++;
      }


    }
    console.log(this.hourValue, this.fiveFourTkToday, this.fiveFourTkYesterday);

    this.fiveFourTkChart = new Chart(this.fiveFourTk.nativeElement, {
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
            data: this.fiveFourTkToday,
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
            data: this.fiveFourTkYesterday,
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
            data: this.fiveFourTkLastWeek,
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
            data: this.fiveFourTkTodayMinus14,
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

    this.threeThreeTkChart = new Chart(this.threeThreeTk.nativeElement, {
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
            data: this.threeThreeTkToday,
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
            data: this.threeThreeTkYesterday,
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
            data: this.threeThreeTkLastWeek,
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
            data: this.threeThreeTkTodayMinus14,
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

    this.oneZeroFourTkChart = new Chart(this.oneZeroFourTk.nativeElement, {
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
            data: this.oneZeroFourTkToday,
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
            data: this.oneZeroFourTkYesterday,
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
            data: this.oneZeroFourTkLastWeek,
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
            data: this.oneZeroFourTkTodayMinus14,
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

    this.EightNineTkChart = new Chart(this.EightNineTk.nativeElement, {
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
            data: this.EightNineTkToday,
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
            data: this.EightNineTkYesterday,
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
            data: this.EightNineTkLastWeek,
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
            data: this.EightNineTkTodayMinus14,
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

    this.oneFourEightTkChart = new Chart(this.oneFourEightTk.nativeElement, {
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
            data: this.oneFourEightTkToday,
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
            data: this.oneFourEightTkYesterday,
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
            data: this.oneFourEightTkLastWeek,
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
            data: this.oneFourEightTkTodayMinus14,
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

    this.oneEightNineTkChart = new Chart(this.oneEightNineTk.nativeElement, {
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
            data: this.oneEightNineTkToday,
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
            data: this.oneEightNineTkYesterday,
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
            data: this.oneEightNineTkLastWeek,
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
            data: this.oneEightNineTkTodayMinus14,
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

    this.oneNineEightTkChart = new Chart(this.oneNineEightTk.nativeElement, {
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
            data: this.oneNineEightTkToday,
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
            data: this.oneNineEightTkYesterday,
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
            data: this.oneNineEightTkLastWeek,
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
            data: this.oneNineEightTkTodayMinus14,
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

    this.twoFourSevenTkChart = new Chart(this.twoFourSevenTk.nativeElement, {
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
            data: this.twoFourSevenTkToday,
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
            data: this.twoFourSevenTkYesterday,
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
            data: this.twoFourSevenTkLastWeek,
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
            data: this.twoFourSevenTkTodayMinus14,
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

    this.twoEightNineTkChart = new Chart(this.twoEightNineTk.nativeElement, {
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
            data: this.twoEightNineTkToday,
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
            data: this.twoEightNineTkYesterday,
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
            data: this.twoEightNineTkLastWeek,
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
            data: this.twoEightNineTkTodayMinus14,
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

    this.threeNineNineTkChart = new Chart(this.threeNineNineTk.nativeElement, {
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
            data: this.threeNineNineTkToday,
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
            data: this.threeNineNineTkYesterday,
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
            data: this.threeNineNineTkLastWeek,
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
            data: this.threeNineNineTkTodayMinus14,
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
    this.hourlyPackActivation();
  }

}
