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
import { Location } from '@angular/common';
import { Mark } from '../models/mark';
import { Account } from '../models/account';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarksProvider } from '../services/marks/marks';
import { AccountsProvider } from '../services/accounts/accounts';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'
})

export class AccountsComponent implements OnInit
{
  accounts: Account[];  
  action: string = "list";
  chart: Chart = {};
  chartDates: string[];
  chartMarks: number[];
  chartBalances: number[];
  chartOptions: Object = {};   

  //
  // Construct
  //
  constructor(private location: Location, private route: ActivatedRoute, public accountsProvider: AccountsProvider, public marksProvider: MarksProvider) {}

  //
  // OnInit...
  //
  ngOnInit()
  {
    // Get action from URL
    this.action = this.route.snapshot.params['action'];

    // Get accounts
    this.getAccounts();

     // Load the marks.
    this.getMarks();   
  }

  //
  // Set Tab.
  //
  setTab(action: string) : boolean
  {
    this.action = action;
    this.location.replaceState('/accounts/' + action);

    // Destroy chart so we can start over.
    this.chart.destroy();

    // Load data into chart options.
    if((action == 'marks') || (action == 'balances'))
    {
      let config = this.getChartOptions();
      config.data.labels = this.chartDates;
      config.data.datasets[0].data = (action == 'marks') ? this.chartMarks : this.chartBalances;
      
      // We use a set time out to make sure the chart html has loaded on the page first.
      setTimeout(function () { this.chart = new Chart('canvas', config) }, 100);
    }

    return false;
  }

  //
  // Get Accounts
  //
  getAccounts()
  {
    // Get balance data
    this.accountsProvider.get().subscribe((data) => {
      this.accounts = data;

      console.log(data);
    });
  }

  //
  // Get Marks
  //
  getMarks()
  {
    // Get balance data
    this.marksProvider.get().subscribe((data) => {

      // Setup data for the chart.
      this.chartDates = data.map(res => moment(res.Date).format('M/D/YY')).reverse();
      this.chartMarks = data.map(res => res.PricePer).reverse();
      this.chartBalances = data.map(res => res.Balance).reverse();

      // Load data into chart options.
      let config = this.getChartOptions();
      config.data.labels = this.chartDates;
      config.data.datasets[0].data = this.chartMarks;

      // Setup chart.
      this.chart = new Chart('canvas', config);

    });
  }

  //
  // Get chart options.
  //
  getChartOptions() : any
  {
    let config = {
      type: 'line',

      data: {
        labels: [],
        datasets: [
          {
            data: [],
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
    };

    return config;
  }  

}

/* End File */
