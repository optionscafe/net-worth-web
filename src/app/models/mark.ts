/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/13/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

export class Mark 
{
  Id: number;
  Name: string;
  Balance: number;
  PricePer: number;
  Units: number;
  Date: Date;

  //
  // Json to Object.
  //
  fromJson(json: Object) : Mark
  {
    this.Id = json["id"];
    this.PricePer = json["price_per"];
    this.Balance = json["balance"];
    this.Units = json["units"];
    this.Date = new Date(json["date"]);
    return this;
  }

  //
  // Build from JSON list.
  //
  fromJsonList(json: Object[]) : Mark[]
  {
    let result = [];

    if(! json)
    {
      return result;
    }

    for(let i = 0; i < json.length; i++)
    {
      result.push(new Mark().fromJson(json[i]));
    }

    // Return happy
    return result;
  }
}

/* End File */
