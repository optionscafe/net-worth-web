/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/13/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

import * as moment from 'moment';
import { Chart } from 'chart.js';
import { Account } from '../../models/account';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsProvider} from '../../services/accounts/accounts';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})

export class ViewComponent implements OnInit 
{
  id: number = 0;
  action: string = "marks";
  chart: Chart = {};
  chartDates: string[];
  chartMarks: number[];
  chartBalances: number[]; 

  //
  // Construct
  //
  constructor(private location: Location, private route: ActivatedRoute, public accountsProvider: AccountsProvider) {}

  //
  // OnInit...
  //
  ngOnInit() 
  {
    // Get account id from URL
    this.id = this.route.snapshot.params['id'];

    // Get action from URL
    this.action = this.route.snapshot.params['action'];

    // Load the marks for this account.
    this.getMarks();
  }

  //
  // Set Tab.
  //
  setTab(action: string) : boolean
  {
    this.action = action;
    //this.location.replaceState('/accounts/' + this.id + '/' + action);

//console.log(this.chartBalances);

    this.chart.data.labels = this.chartDates;
    this.chart.data.datasets.splice(0, 1);
    this.chart.data.datasets.push(this.chartBalances);
    this.chart.update();


      // // Setup chart.
      // this.chart = new Chart('canvas', {
      //   type: 'line',

      //   data: {
      //     labels: this.chartDates,
      //     datasets: [
      //       {
      //         data: this.chartBalances,
      //         pointRadius: 2,
      //         pointHoverRadius: 5,
      //         borderColor: '#3cba9f',
      //         fill: false
      //       }
      //     ]
      //   },

      //   options: {

      //     legend: {
      //       display: false
      //     },      

      //     tooltips: {
      //       callbacks: {
      //         label: function(tooltipItem, data) {
      //           return '$' + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //         }
      //       }
      //     },          

      //     scales: {

      //       xAxes: [{
      //         display: true
      //       }],

      //       yAxes: [{
      //         display: true,
      //         ticks: {
      //           callback: function(value, index, values) {
      //             return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //           }
      //         }              
      //       }],

      //     }
      //   }
      // });



    return false;
  }

  //
  // Get Marks
  //
  getMarks()
  {
    // Get balance data
    this.accountsProvider.getMarksByAccountId(this.id).subscribe((data) => {

      // Setup data for the chart.
      this.chartDates = data.map(res => moment(res.Date).format('M/D/YY')).reverse();
      this.chartMarks = data.map(res => res.PricePer).reverse();
      this.chartBalances = data.map(res => res.Balance).reverse();

      // Setup chart.
      this.chart = new Chart('canvas', {
        type: 'line',

        data: {
          labels: this.chartDates,
          datasets: [
            {
              data: this.chartMarks,
              pointRadius: 2,
              pointHoverRadius: 5,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },

        options: {

          legend: {
            display: false
          },      

          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return '$' + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
            }
          },          

          scales: {

            xAxes: [{
              display: true
            }],

            yAxes: [{
              display: true,
              ticks: {
                callback: function(value, index, values) {
                  return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
              }              
            }],

          }
        }
      });

    });
  }

}

/* End File */
