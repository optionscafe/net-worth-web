//
// Date: 3/2/2018
// Author(s): Spicer Matthews (spicer@options.cafe)
// Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
//

export class AccountMark {
  
  //
  // Construct.
  //
  constructor(
    public Id: number,
    public Date: Date,
    public AccountId: number, 
    public Balance: number,
    public Units: number,        
    public PricePer: number     
  ){}

  //
  // Build object for emitting to the app.
  //
  public static buildForEmit(data) : AccountMark[]  
  {
    let result = [];

    if(! data)
    {
      return result;      
    }

    for(let i = 0; i < data.length; i++)
    {
      result.push(new AccountMark(
        data[i].id,
        new Date(data[i].date),
        data[i].account_id,
        data[i].balance,
        data[i].units,
        data[i].price_per
      ));
    }

    // Return happy
    return result;
  }
}

/* End File */