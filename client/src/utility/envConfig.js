module.exports = {
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userWebClientId: process.env.REACT_APP_USER_WEB_CLIENT_ID,
    stripePublishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
    stripePath: process.env.STRIPE_PATH || "http://localhost:1000/payment"
}