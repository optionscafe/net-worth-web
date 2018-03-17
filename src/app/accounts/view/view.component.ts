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
import { ActivatedRoute } from '@angular/router';
import { AccountsProvider} from '../../services/accounts/accounts';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})

export class ViewComponent implements OnInit 
{
  chart = [];
  id: number = 0;

  //
  // Construct
  //
  constructor(private route: ActivatedRoute, public accountsProvider: AccountsProvider) { }

  //
  // OnInit...
  //
  ngOnInit() 
  {
    // Get account id from URL
    this.id = this.route.snapshot.params['id'];

    // Load the marks for this account.
    this.getMarks();
  }

  //
  // Get Marks
  //
  getMarks()
  {
    // Get balance data
    this.accountsProvider.getMarksByAccountId(this.id).subscribe((data) => {

      // Setup data for the chart.
      let dates = data.map(res => moment(res.Date).format('M/D/YY'));
      let marks = data.map(res => res.Balance);

      // Setup chart.
      this.chart = new Chart('canvas', {
        type: 'line',

        data: {
          labels: dates.reverse(),
          datasets: [
            {
              data: marks.reverse(),
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
