import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51KSjpCBYp3P0VPu4qlVoSK2SwYMcS0HMwJmI8bPOkJFGDtxyrgYvz2EZNKBeb8n916k41ucT3Wu9qKI3q3QWpklJ00khAWF3Xz";
  const onToken = (token) => {
    axios({
      url: "http://localhost:1000/payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token: token,
      },
    })
      .then((res) => {
        alert("Payment successful");
      })
      .catch((error) => {
        console.log("Payment error", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please make sure you provided the test credit card."
        );
      });
  };
  return (
    <StripeCheckout
      label="Proceed to checkout"
      name="Event Go Ltd."
      billingAddress
      shippingAddress
      image="https://pngset.com/images/logo-react-js-logo-svg-symbol-trademark-grenade-bomb-transparent-png-2691562.png"
      description={`Your total payment is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      currency="EUR"
    />
  );
};

export default StripeCheckoutButton;