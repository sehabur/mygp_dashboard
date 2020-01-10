import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/dark-unica';
theme(Highcharts);
import { Chart } from 'chart.js';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  @ViewChild('lineCanvas1', {static: true}) lineCanvas1: ElementRef;
  private lineChart1: Chart;
  @ViewChild('lineCanvas2', {static: true}) lineCanvas2: ElementRef;
  private lineChart2: Chart;
 
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

  constructor(
    private http: HttpClient,
  ) { }

  async test() {

    // tslint:disable-next-line: max-line-length
    this.new = await this.http.get('https://spreadsheets.google.com/feeds/list/14OckpRbQHMiR2fZD5TPb3OznNTd7rWXj9_MLRhHWR5Q/1/public/values?alt=json').toPromise();

    // console.log(this.new.feed.entry);
    this.mauData['calenderMau'] = Number(this.new.feed.entry[0].gsx$data.$t);
    this.mauData['rolling30Mau'] = Number(this.new.feed.entry[1].gsx$data.$t);
    this.mauData['yesterdayDau'] = Number(this.new.feed.entry[2].gsx$data.$t);
    this.mauData['msisdnMau'] = Number(this.new.feed.entry[3].gsx$data.$t);
    this.mauData['retention'] = Number(this.new.feed.entry[4].gsx$data.$t);
    this.mauData['msisdnDau'] = Number(this.new.feed.entry[5].gsx$data.$t);

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
    console.log(this.aa, this.yesterdayLoginTrend, this.dayMinus7LoginTrend);

  this.lineChart1 = new Chart(this.lineCanvas1.nativeElement, {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "January", "February", "March", "April", "May", "June", "July", "January", "February", "March", "April", "May", "June", "July", "January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "2GB 54TK",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(59, 173, 105,0.4)",
          borderColor: "rgba(59, 173, 105, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(59, 173, 105,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(59, 173, 105,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.dayMinus7LoginTrend,
          spanGaps: false
        }
      ]
    }
  });

  this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "January", "February", "March", "April", "May", "June", "July", "January", "February", "March", "April", "May", "June", "July", "January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "3GB 67TK",
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
          data: this.yesterdayLoginTrend,
          spanGaps: false
        }
      ]
    }
  });

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
  //       text: '2GB 54TK Purchase Trend'
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

  //   await Highcharts.chart('container2', {
  //     chart: {
  //       type: 'line'
  //   },
  //   title: {
  //       text: '3GB 67TK Purchase Trend'
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
    // this.test();
  }

}