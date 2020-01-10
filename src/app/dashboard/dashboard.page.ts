import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/dark-unica';
theme(Highcharts);
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  // @ViewChild('lineCanvas', {static: true}) lineCanvas: ElementRef;
  // private lineChart: Chart;

  @ViewChild('dauMau', {static: true}) dauMau: ElementRef;
  private dauMauChart: Chart;

  @ViewChild('totalRevenue', {static: true}) totalRevenue: ElementRef;
  private totalRevenueChart: Chart;

  // @ViewChild('barCanvas', {static: true}) barCanvas: ElementRef;


  date = [];
  dau = [];
  mau = [];
  packData = [];
  dataArray = [];
  new = null;
  mauData = [];
  new2 = null;
  yesterdayLoginTrend = [];
  dayMinus7LoginTrend = [];
  aa = null;
  data = null;
  dailyData = null;
  k = 0;
  mauTrend = [];
  dauTrend = [];
  dateValue = [];
  revenueDailyData = null;
  revenueData = null;

  revenueDateValue = [];
    totalRevenueTrend = [];
    m = 0;


  constructor(
    private http: HttpClient,
  ) { }

  

  async test() {

    Chart.defaults.global.defaultFontColor = '#BBB';

    // tslint:disable-next-line: max-line-length
    this.new = await this.http.get('https://spreadsheets.google.com/feeds/list/14OckpRbQHMiR2fZD5TPb3OznNTd7rWXj9_MLRhHWR5Q/1/public/values?alt=json').toPromise();

    // console.log(this.new.feed.entry);
    this.mauData['calenderMau'] = (Number(this.new.feed.entry[0].gsx$data.$t)/1000000).toFixed(2);
    this.mauData['rolling30Mau'] = (Number(this.new.feed.entry[1].gsx$data.$t)/1000000).toFixed(2);
    this.mauData['yesterdayDau'] = (Number(this.new.feed.entry[2].gsx$data.$t)/1000000).toFixed(2);
    this.mauData['msisdnMau'] = (Number(this.new.feed.entry[3].gsx$data.$t)/1000000).toFixed(2);
    this.mauData['todayUniq'] = (Number(this.new.feed.entry[4].gsx$data.$t)/1000).toFixed(2);
    this.mauData['updateHour'] = Number(this.new.feed.entry[5].gsx$data.$t);

    // console.log(this.mauData);

    this.new2 = await this.http.get('https://spreadsheets.google.com/feeds/list/14OckpRbQHMiR2fZD5TPb3OznNTd7rWXj9_MLRhHWR5Q/3/public/values?alt=json').toPromise();

    // console.log(this.new2.feed.entry);
    // console.log(this.new2.feed.entry[0].gsx$date.$t, this.new2.feed.entry[0].gsx$hour.$t, this.new2.feed.entry[0].gsx$value.$t, this.new2.feed.entry.length);

    for(var i=0; i<this.new2.feed.entry.length; i++) {
      if(this.new2.feed.entry[i].gsx$date.$t === '2019-11-30') {
        this.yesterdayLoginTrend[this.new2.feed.entry[i].gsx$hour.$t] = Number(this.new2.feed.entry[i].gsx$value.$t);
      } else if(this.new2.feed.entry[i].gsx$date.$t === '2019-11-23') {
        this.dayMinus7LoginTrend[this.new2.feed.entry[i].gsx$hour.$t] = Number(this.new2.feed.entry[i].gsx$value.$t);
      } 
    }  
    // console.log(this.aa, this.yesterdayLoginTrend, this.dayMinus7LoginTrend);

    this.data = await this.http.get('https://spreadsheets.google.com/feeds/list/1zyvXQEmMu79D6ADAzHzeW25BszP0QYYzHRWRX1-ZFmY/1/public/values?alt=json').toPromise();
    this.dailyData = this.data.feed.entry.slice(-600);

    // console.log(this.dailyData);


    for (let i = 0; i < this.dailyData.length; i++) {
      this.dateValue[this.k] = String(this.dailyData[i].gsx$date1.$t);
      this.dauTrend[this.k] = (Number(this.dailyData[i].gsx$dailyactiveusers.$t)/1000000).toFixed(3);
      this.mauTrend[this.k] = (Number(this.dailyData[i].gsx$monthlyactiveusers.$t)/1000000).toFixed(3);
      this.k++;
    }

    this.revenueData = await this.http.get('https://spreadsheets.google.com/feeds/list/1zyvXQEmMu79D6ADAzHzeW25BszP0QYYzHRWRX1-ZFmY/3/public/values?alt=json').toPromise();
    this.revenueDailyData = this.revenueData.feed.entry.slice(-30);
    console.log(this.revenueDailyData);

    for (let i = 0; i < this.revenueDailyData.length; i++) {
      this.revenueDateValue[this.m] = String(this.revenueDailyData[i].gsx$date.$t);
      this.totalRevenueTrend[this.m] = (Number(this.revenueDailyData[i].gsx$totalrevenue.$t)/1000000).toFixed(3);
      this.m++;
    }
    

    this.dauMauChart = new Chart(this.dauMau.nativeElement, {
      type: 'line',
      data: {
        labels: this.dateValue,
        datasets: [
          {
            label: 'DAU (Mn)',
            fill: 'origin',
            lineTension: 0.3,
            backgroundColor: 'rgba(127, 255, 0, 0.4)',
            borderColor: 'rgba(127, 255, 0, 1)',
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: 'rgba(127, 255, 0, 1)',
            pointBackgroundColor: 'rgba(127, 255, 0, 1)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(127, 255, 0, 1)',
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.dauTrend,
            spanGaps: false,
          },
          {
            label: 'MAU (Mn)',
            fill: 'origin',
            lineTension: 0.3,
            backgroundColor: "rgba(25, 170, 248, 0.4)",
            borderColor: "rgba(25, 170, 248, 1)",
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
            data: this.mauTrend,
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
      }
    });

    this.totalRevenueChart = new Chart(this.totalRevenue.nativeElement, {
      type: 'bar',
      data: {
        labels: this.revenueDateValue,
        datasets: [
          {
            label: 'Daily Revenue (Mn)',
            fill: 'origin',
            lineTension: 0.3,
            backgroundColor: "#998EC3",
            borderColor: "#998EC3",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#F57C00",
            pointBackgroundColor: "#F57C00",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#F57C00",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.totalRevenueTrend,
            spanGaps: false,
          },
          // {
          //   label: 'MAU (Mn)',
          //   fill: 'origin',
          //   lineTension: 0.3,
          //   backgroundColor: "rgba(25, 170, 248, 0.4)",
          //   borderColor: "rgba(25, 170, 248, 1)",
          //   borderCapStyle: "butt",
          //   borderDash: [],
          //   borderDashOffset: 0.0,
          //   borderJoinStyle: "miter",
          //   pointBorderColor: "rgba(25, 170, 248,1)",
          //   pointBackgroundColor: "rgba(25, 170, 248,1)",
          //   pointBorderWidth: 1,
          //   pointHoverRadius: 5,
          //   pointHoverBackgroundColor: "rgba(25, 170, 248,1)",
          //   pointHoverBorderColor: "rgba(220,220,220,1)",
          //   pointHoverBorderWidth: 2,
          //   pointRadius: 1,
          //   pointHitRadius: 10,
          //   data: this.mauTrend,
          //   spanGaps: false,
          // }
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
      }
    });

    // this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    //   type: 'doughnut',
    //   data: {
    //     labels: ["MAU Achieved", "MAU Target"],
    //     datasets: [
    //       {
    //         data: [this.mauData['calenderMau'], (7.8-this.mauData['calenderMau']).toFixed(2)],
    //         backgroundColor: [
              
    //           'rgba(54, 162, 235, 0.2)',
    //           'rgba(255, 99, 132, 0.2)',
    //           // 'rgba(255, 206, 86, 0.2)',
    //           // 'rgba(75, 192, 192, 0.2)',
    //           // 'rgba(153, 102, 255, 0.2)',
    //           // 'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
              
    //           'rgba(54, 162, 235, 1)',
    //           'rgba(255,99,132,1)',
    //           // 'rgba(255, 206, 86, 1)',
    //           // 'rgba(75, 192, 192, 1)',
    //           // 'rgba(153, 102, 255, 1)',
    //           // 'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1

    //       }
          
    //     ]
    //   },
    //   options: {
    //     rotation: 1 * Math.PI,
    //     circumference: 1 * Math.PI,
    //     legend: {
    //       display: true,
    //       position: 'top',
    //       labels: {
    //       boxWidth: 20,
          
    //       }
    //     },
    // }
    // });

  //  await Highcharts.setOptions({
  //     chart: {
  //         style: {
  //             fontFamily: 'Roboto',
  //             color: '#FFF'
  //         } 
  //     },
  //     title: {
  //       style: {
  //          color: '#19AAF8',
  //          font: 'Roboto, sans-serif'
  //       }
  //    },
  //     xAxis: {
  //       gridLineWidth: 0,
  //       lineColor: '#FFF',
  //       tickColor: '#FFF',
  //       labels: {
  //          style: {
  //             color: '#FFF',
  //             font: 'Verdana, sans-serif'
  //          }
  //       },
  //       title: {
  //          style: {
  //             color: '#FFF',
  //             // fontWeight: 'bold',
  //             fontSize: '12px',
  //             fontFamily: 'Trebuchet MS, Verdana, sans-serif'
  
  //          }            
  //       }
  //    },
  //    yAxis: {
  //       // minorTickInterval: 'auto',
  //       // lineColor: '#000',
  //       // lineWidth: 1,
  //       // tickWidth: 1,
  //       // tickColor: '#000',
  //       labels: {
  //          style: {
  //             color: '#FFF',
  //             font: '11px Trebuchet MS, Verdana, sans-serif'
  //          }
  //       },
  //       title: {
  //          style: {
  //             color: '#FFF',
  //             // fontWeight: 'bold',
  //             fontSize: '12px',
  //             fontFamily: 'Trebuchet MS, Verdana, sans-serif'
  //          }
  //       }
  //    },
  // });

  //   await Highcharts.chart('container', {
  //     chart: {
  //       type: 'line'
  //   },
  //   title: {
  //       text: 'Daily Login Trend'
  //   },
  //   // subtitle: {
  //   //     text: 'Source: WorldClimate.com'
  //   // },
  //   xAxis: {
  //       categories: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  //   },
  //   yAxis: {
  //       title: {
  //           text: 'Login Count',
  //       },
  //       gridLineWidth:0, //Set this to zero
  //   },
  //   plotOptions: {
  //       line: {
  //           dataLabels: {
  //               enabled: false
  //           },
  //           enableMouseTracking: false
  //       }
  //   },
  //   series: [{
  //       name: 'Yesterday',
  //       data: this.yesterdayLoginTrend
  //   }, {
  //       name: 'Today Minus 7 Days',
  //       data: this.dayMinus7LoginTrend
  //   }]
  //   });

  } 

    ngOnInit() {
    this.test();
  }

}
