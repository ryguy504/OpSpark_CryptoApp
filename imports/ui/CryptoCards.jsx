import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import CryptoCurrency from '../api/cryptoCurrency';
import { Meteor } from 'meteor/meteor';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
//import { Tracker } from 'meteor/tracker'

class CryptoCards extends Component {
  render() {

    return (
      <div>
         <Container maxWidth="md">
          <Grid container spacing={4}>
            {this.props.currencies.map((currency, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        $ {currency.value}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        {currency.name}
                      </Typography>
                    </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default InfoContainer = withTracker(() => {
  Meteor.subscribe('cryptoCurrency');
  // Meteor.call("logToConsole", `CryptoCurrency.find().fetch(): ${CryptoCurrency.find()[0]}`)
  return {
    currencies: CryptoCurrency.find().fetch() ? CryptoCurrency.find().fetch().splice(0, 30): [],
  };
  
})(CryptoCards);


// export default InfoContainer = Tracker.autorun(function() { 
//   Meteor.subscribe('cryptoCurrency');
//    Meteor.call("logToConsole", `CryptoCurrency.find().fetch(): ${CryptoCurrency.find()[0]}`)
//   return {
//     currencies: CryptoCurrency.find().fetch() ? CryptoCurrency.find().fetch().splice(0, 30): [],
//   };
// })(CryptoCards);