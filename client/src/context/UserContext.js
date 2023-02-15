import { useState, createContext } from 'react';
import { Auth, Hub } from 'aws-amplify';
import '../utility/amplifyConfig';
import axios from 'axios';

const UserContext = createContext();

const url =
  'https://khoa-nguyen-cors-anywhere.fly.dev/https://a1fzt90jn3.execute-api.eu-central-1.amazonaws.com/production';
const xApiKey = 'DUBwlix96T5zt3M7tOnJ7ilJt6ufVG1436lyXzXh';
const config = {
  headers: {
    'x-api-key': xApiKey,
    'Content-Type': 'application/json',
  },
};

export function UserProvider({ children }) {
  // sign in attributes: email, password
  // sign up attributes (all must have): dob(YYYY-MM-DD), email, name (full name), preferredUserName, phoneNum, password
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferredUserName, setPreferredUsername] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // confirmation attribute: email, authCode
  const [authCode, setAuthCode] = useState('');

  // Keep track of the current user of this session
  const [user, setUser] = useState(null);
  const [customState, setCustomState] = useState(null);

  // All events ID that this user attend
  // return an array of event ID's
  const [userEvents, setUserEvents] = useState([]);

  // All friends email of this user
  // return an array of user email
  const [allFriends, setAllFriends] = useState([]);

  // All users of this service
  const [allUsers, setAllUsers] = useState([]);

  async function getAllUsers() {
    const allUsersRes = await axios.get(`${url}/users`, config);

    if (Array.isArray(allUsersRes.data.users)) {
      setAllUsers([...allUsersRes.data.users]);
    }
  }

  // TODO: function to get and fetch all user events

  // this use to check if user is logged in, can be used in different pages to persist user session
  async function checkIfLoggedIn() {
    const user = await Auth.currentAuthenticatedUser().catch(err => err);
    console.log('Checking if user logged in...');
    if (user !== 'The user is not authenticated') {
      await setUser(user);
    }
  }

  // use to listen for google login, because our require information has birthdate and phone_number, if the ggl account haven't provided that, it can't be logged in
  // Google login example button
  // <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google })}>Open Google</button>
  async function listenForGoogleLogin() {
    const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setUser(data);
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'customOAuthState':
          setCustomState(data);
          break;
        default:
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => console.log('Not signed in'));

    return unsubscribe;
  }

  // Handle new user signup
  async function handleSignUp(e) {
    e.preventDefault();
    console.log('Handling sign up!');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      // return;
    }
    try {
      console.log('Try block');
      const newUserInfo = {
        username: email,
        password,
        attributes: {
          email,
          phone_number: phoneNum, // format +35804000
          name,
          preferred_username: preferredUserName,
          birthdate: dob,
        },
        autoSignIn: {
          enabled: true,
        },
      };
      console.table(newUserInfo);
      const { user } = await Auth.signUp(newUserInfo);
      setUser(user);
      console.log(user);
    } catch (error) {
      // will be an error if user email existed in database,
      setError(error);
    }
  }

  // A function to send confirmation code to email again
  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(email);
      console.log('Code resent!');
      return 'Code resent successfully!';
    } catch (err) {
      console.log('error resending code: ', err);
      return 'Error trying to resend code...';
    }
  }

  // Confirm user signup
  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(email, authCode);
      return 'Confirmation success!';
    } catch (error) {
      console.log('error confirming sign up', error);
      return 'Code error! Please try again!';
    }
  }

  function listenToAutoSignInEvent() {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      if (event === 'autoSignIn') {
        const user = payload.data;
        // assign user
        setUser(user);
      } else if (event === 'autoSignIn_failure') {
        // redirect to sign in page
      }
    });
  }

  // after sign in, will redirect to https://localhost:3000/
  // AccessToken: A token that is passed to an API to provide access to protected resources.
  // ExpiresIn: The number of seconds until the AccessToken and IdToken expire.
  // IdToken: A JSON Web Token (JWT) that contains information about the authenticated user, such as the user's email and phone number.
  // RefreshToken: A token that can be used to request a new set of tokens if the original tokens have expired.
  // TokenType: The type of token, which is usually "Bearer".
  async function handleSignIn(e) {
    e.preventDefault();
    try {
      await Auth.signIn(email, password).then(data => {
        const currUser = {
          attributes: data.attributes,
        };
        setUser(currUser);
      });
      // access user data here;
      console.log('Sign in successful');
      return 'Success!';
    } catch (err) {
      setError(err.message);
      return err.message;
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
      console.log('Log out!');
      localStorage.clear();
      setUser(null);
    } catch (error) {
      setError(error);
      console.log('error signing out: ', error);
    }
  }

  function validatePassword() {
    if (password === '' || confirmPassword === '') return false;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password) && password === confirmPassword ? true : false;
  }

  function validateEmail() {
    if (email === '') return false;
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }

  function validatePreferredUsername() {
    if (preferredUserName === '') return false;
    return true;
  }

  function validatePhoneNum() {
    const regex = /^\+358\d{9}$/;
    return regex.test(phoneNum);
  }

  function validateName() {
    if (name === '') return false;
    return true;
  }

  function validateDob() {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dob);
  }

  return (
    <UserContext.Provider
      value={{
        // User data related
        user,
        customState,
        // Functions for signing in and use session persistance
        handleSignUp,
        listenForGoogleLogin,
        checkIfLoggedIn,
        resendConfirmationCode,
        confirmSignUp,
        listenToAutoSignInEvent,
        handleSignIn,
        signOut,
        // state & set state functions to gather signup info
        dob,
        setDob,
        email,
        setEmail,
        name,
        setName,
        preferredUserName,
        setPreferredUsername,
        phoneNum,
        setPhoneNum,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        authCode,
        setAuthCode,
        error,
        // Validation functions
        validateEmail,
        validatePassword,
        validatePreferredUsername,
        validatePhoneNum,
        validateName,
        validateDob,
        // Working with all users
        allUsers,
        getAllUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
