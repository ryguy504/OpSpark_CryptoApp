import { Meteor } from 'meteor/meteor';
import CryptoCurrency from '/imports/api/cryptoCurrency';
//import { SyncedCron } from 'meteor/percolate:synced-cron';

Meteor.startup(() => {

  Meteor.methods({
    logToConsole: function(msg) {
      console.log(msg)
    },
  })

  Meteor.publish('cryptoCurrency', function () {
    let options = {
      'headers' : {
        'X-CMC_PRO_API_KEY': 'b98899ac-c842-47d9-828f-b28c1d1b99af',
        'Content-Type': 'application/json'
      }
    }
    this.autorun(function (){HTTP.call( 'GET', 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', options, function( error, response ) {
      if (error) {
        console.log( 'error: ', error );
      } else {
          // Populate collection
          let responseData = response.data.data;
          //console.log(responseData.quote);
          responseData.forEach(({ name, quote: { USD: { price } } }) => {
            //console.log(price);
            CryptoCurrency.insert({ name, value: price });
          })

      }
    });})

    return CryptoCurrency.find();
  })


});



