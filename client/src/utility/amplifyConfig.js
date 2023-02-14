const { Amplify } = require('aws-amplify');
const { Credentials } = require('aws-sdk');
const {
  accessKeyId,
  secretKey,
  region,
  userPoolId,
  userWebClientId,
} = require('./envConfig');
const credentials = new Credentials({
  accessKeyId: accessKeyId,
  secretAccessKey: secretKey,
});
Amplify.configure({
  Auth: {
    region: region,
    userPoolId: userPoolId,
    userPoolWebClientId: userWebClientId,
    credentials,
  },
});
