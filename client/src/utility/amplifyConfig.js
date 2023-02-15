const { Amplify } = require('aws-amplify');
const {

  region,
  userPoolId,
  userWebClientId,
} = require('./envConfig');

const existingConfigure = {
  Auth: {
    region: region,
    userPoolId: userPoolId,
    userPoolWebClientId: userWebClientId,
  },
}
Amplify.configure(existingConfigure);
