import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-revenue-trend',
  templateUrl: './revenue-trend.page.html',
  styleUrls: ['./revenue-trend.page.scss'],
})
export class RevenueTrendPage implements OnInit {

  @ViewChild('crmRevenueDaily', {static: true}) crmRevenueDaily: ElementRef;
  private crmRevenueDailyChart: Chart;

  @ViewChild('cmpRevenueDaily', {static: true}) cmpRevenueDaily: ElementRef;
  private cmpRevenueDailyChart: Chart;

  @ViewChild('flexiplanRevenueDaily', {static: true}) flexiplanRevenueDaily: ElementRef;
  private flexiplanRevenueDailyChart: Chart;

  @ViewChild('rechargeDaily', {static: true}) rechargeDaily: ElementRef;
  private rechargeDailyChart: Chart;

  constructor(
    private http: HttpClient,
  ) { }
  data = null;
  dailyData = null;
  dateValue = [];
  crmRevenue = [];
  crmHit = [];
  cmpRevenue = [];
  cmpHit = [];
  flexiplanRevenue = [];
  flexiplanHit = [];
  rechargeAmount = [];
  rechargeCount = [];
  k = 0;


  async revenueTrend() {
    Chart.defaults.global.defaultFontColor = '#BBB';
    
    this.data = await this.http.get('https://spreadsheets.google.com/feeds/list/1zyvXQEmMu79D6ADAzHzeW25BszP0QYYzHRWRX1-ZFmY/2/public/values?alt=json').toPromise();
    this.dailyData = this.data.feed.entry.slice(-30);


    // this.data = await this.http.get('https://spreadsheets.google.com/feeds/list/1zyvXQEmMu79D6ADAzHzeW25BszP0QYYzHRWRX1-ZFmY/3/public/values?alt=json').toPromise();
    // this.dailyData = this.data.feed.entry;

    console.log(this.dailyData);

    

    for (let i = 0; i < this.dailyData.length; i++) {
      this.dateValue[this.k] = String(this.dailyData[i].gsx$date.$t);
      this.crmRevenue[this.k] = (Number(this.dailyData[i].gsx$crmpacksrevenue.$t)/1000000).toFixed(3);
      this.crmHit[this.k] = (Number(this.dailyData[i].gsx$crmpackshitcount.$t)/1000).toFixed(3);
      this.cmpRevenue[this.k] = (Number(this.dailyData[i].gsx$cmppacksrevenue.$t)/1000000).toFixed(3);
      this.cmpHit[this.k] = (Number(this.dailyData[i].gsx$cmppackshitcount.$t)/1000).toFixed(3);
      this.flexiplanRevenue[this.k] = (Number(this.dailyData[i].gsx$flexiplanpacksrevenue.$t)/1000000).toFixed(3);
      this.flexiplanHit[this.k] = (Number(this.dailyData[i].gsx$flexiplanpackshitcount.$t)/1000).toFixed(3);
      this.rechargeAmount[this.k] = (Number(this.dailyData[i].gsx$rechargeamount.$t)/1000000).toFixed(3);
      this.rechargeCount[this.k] = (Number(this.dailyData[i].gsx$rechargecount.$t)/1000).toFixed(3);
      this.k++;
    }

    // console.log(this.dateValue, this.crmRevenue);

    this.crmRevenueDailyChart = new Chart(this.crmRevenueDaily.nativeElement, {
      type: 'line',
      data: {
        labels: this.dateValue,
        datasets: [
          {
            label: 'Revenue(Mn)',
            yAxisID: 'A',
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
            data: this.crmRevenue,
            spanGaps: false,
          },
          {
            label: 'Hits(K)',
            type: 'bar',
            yAxisID: 'B',
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
            data: this.crmHit,
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
                  return 'On ' + tooltipItems[0].xLabel + ' :'
              },         
          }
        },
        scales: {
          yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'left',
          }, {
            id: 'B',
            type: 'linear',
            position: 'right',
          }]
        }
      }
    });

    this.cmpRevenueDailyChart = new Chart(this.cmpRevenueDaily.nativeElement, {
      type: 'line',
      data: {
        labels: this.dateValue,
        datasets: [
          {
            label: 'Revenue(Mn)',
            yAxisID: 'A',
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
            data: this.cmpRevenue,
            spanGaps: false,
          },
          {
            label: 'Hits(K)',
            type: 'bar',
            yAxisID: 'B',
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
            data: this.cmpHit,
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
                  return 'On ' + tooltipItems[0].xLabel + ' :'
              },         
          }
        },
        scales: {
          yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'left',
          }, {
            id: 'B',
            type: 'linear',
            position: 'right',
          }]
        }
      }
    });

    this.flexiplanRevenueDailyChart = new Chart(this.flexiplanRevenueDaily.nativeElement, {
      type: 'line',
      data: {
        labels: this.dateValue,
        datasets: [
          {
            label: 'Revenue(Mn)',
            yAxisID: 'A',
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
            data: this.flexiplanRevenue,
            spanGaps: false,
          },
          {
            label: 'Hits(K)',
            type: 'bar',
            yAxisID: 'B',
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
            data: this.flexiplanHit,
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
                  return 'On ' + tooltipItems[0].xLabel + ' :'
              },         
          }
        },
        scales: {
          yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'left',
          }, {
            id: 'B',
            type: 'linear',
            position: 'right',
          }]
        }
      }
    });

    this.rechargeDailyChart = new Chart(this.rechargeDaily.nativeElement, {
      type: 'line',
      data: {
        labels: this.dateValue,
        datasets: [
          {
            label: 'Revenue(Mn)',
            yAxisID: 'A',
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
            data: this.rechargeAmount,
            spanGaps: false,
          },
          {
            label: 'Hits(K)',
            type: 'bar',
            yAxisID: 'B',
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
            data: this.rechargeCount,
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
                  return 'On ' + tooltipItems[0].xLabel + ' :'
              },         
          }
        },
        scales: {
          yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'left',
          }, {
            id: 'B',
            type: 'linear',
            position: 'right',
          }]
        }
      }
    });

  } 
  ngOnInit() {
    this.revenueTrend();
  }

}
