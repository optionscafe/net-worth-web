/**
 * @Author: Spicer Matthews
 * @Date:   03/14/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/14/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

export class LedgerCategory {

  //
  // Construct.
  //
  constructor(
    public Id: number,
    public Name: string
  ){}

  //
  // Build object for emitting to the app.
  //
  public static buildForEmit(data) : LedgerCategory[]
  {
    let result = [];

    if(! data)
    {
      return result;
    }

    for(let i = 0; i < data.length; i++)
    {
      result.push(new LedgerCategory(
        data[i].id,
        data[i].name
      ));
    }

    // Return happy
    return result;
  }
}

/* End File */
