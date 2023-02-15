import StripeCheckout from 'react-stripe-checkout';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { stripePublishableKey, stripePath } from '../../utility/envConfig';
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const onToken = token => {
    axios({
      url: stripePath,
      method: "post",
      data: {
        amount: priceForStripe,
        token: token,
      },
    })
      .then(res => {
        alert('Payment successful');
      })
      .catch(error => {
        console.log('Payment error', JSON.parse(error));
        alert(
          'There was an issue with your payment. Please make sure you provided the test credit card.'
        );
      });
  };
  return (
    <StripeCheckout 
      // label="Proceed to checkout"
      name="Event Go Ltd."
      billingAddress
      shippingAddress
      image="https://pngset.com/images/logo-react-js-logo-svg-symbol-trademark-grenade-bomb-transparent-png-2691562.png"
      description={`Your total payment is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={stripePublishableKey}
      currency="EUR"
    />
  );
};

export default StripeCheckoutButton;
