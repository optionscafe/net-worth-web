//
// Date: 3/2/2018
// Author(s): Spicer Matthews (spicer@options.cafe)
// Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
//

export class Ledger {
  
  //
  // Construct.
  //
  constructor(
    public Id: number,
    public Date: Date,    
    public AccountName: string,
    public CategoryName: string,
    public Amount: number,
    public Note: string     
  ){}
 
  //
  // Build object for emitting to the app.
  //
  public static buildForEmit(data) : Ledger[]  
  {
    let result = [];

    if(! data)
    {
      return result;      
    }

    for(let i = 0; i < data.length; i++)
    {
      result.push(new Ledger(
        data[i].id,
        new Date(data[i].date),
        data[i].account_name,
        data[i].category_name,
        data[i].amount,
        data[i].note
      ));
    }

    // Return happy
    return result;
  }
}

/* End File */