/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/13/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

export class Account {

  //
  // Construct.
  //
  constructor(
    public Id: number,
    public Name: string,
    public AccountNumber: string,
    public Balance: number,
    public Units: number,
    public CreatedAt: Date,
    public UpdatedAt: Date
  ){}

  //
  // Build object for emitting to the app.
  //
  public static buildForEmit(data) : Account[]
  {
    let result = [];

    if(! data)
    {
      return result;
    }

    for(let i = 0; i < data.length; i++)
    {
      result.push(new Account(
        data[i].id,
        data[i].name,
        data[i].account_number,
        data[i].balance,
        data[i].units,
        new Date(data[i].created_at),
        new Date(data[i].updated_at)
      ));
    }

    // Return happy
    return result;
  }
}

/* End File */
