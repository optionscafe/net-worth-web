/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/13/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

export class Account 
{
  Id: number;
  Name: string;
  AccountNumber: string;
  Balance: number;
  Units: number;
  CreatedAt: Date;
  UpdatedAt: Date;

  //
  // Json to Object.
  //
  fromJson(json: Object) : Account
  {
    this.Id = json["id"];
    this.Name = json["name"];
    this.AccountNumber = json["account_number"];
    this.Balance = json["balance"];
    this.Units = json["units"];
    this.CreatedAt = new Date(json["created_at"]);
    this.UpdatedAt = new Date(json["updated_at"]);
    return this;
  }

  //
  // Build from JSON list.
  //
  fromJsonList(json: Object[]) : Account[]
  {
    let result = [];

    if(! json)
    {
      return result;
    }

    for(let i = 0; i < json.length; i++)
    {
      result.push(new Account().fromJson(json[i]));
    }

    // Return happy
    return result;
  }
}

/* End File */
