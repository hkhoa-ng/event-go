import { useState, createContext } from 'react';
import { Auth, Hub } from 'aws-amplify';
import '../utility/amplifyConfig';

const UserContext = createContext();

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

  //   Keep track of the current user of this session
  const [user, setUser] = useState(null);
  const [customState, setCustomState] = useState(null);

  // this use to check if user is logged in, can be used in different pages to persist user session
  async function checkIfLoggedIn(setLoading) {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user);
        setLoading(false);
        console.log(`Signed in with user email ${user.attributes.email}`);
      })
      .catch(() => {
        setLoading(false);
        console.log(`Not signed in!`);
      });
  }

  // this use to persist user session even with refresh button pressed by using the local storage
  async function storeUserToLocalStorage(setLoading) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
      return;
    }

    Auth.currentSession()
      .then(session => {
        setUser(session.getIdToken().payload);
        localStorage.setItem(
          'user',
          JSON.stringify(session.getIdToken().payload)
        );
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
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
      await Auth.signIn(email, password).then(
        ({ accessToken, idToken, refreshToken, user }) => {
          setUser(user);
          // set more needed information
        }
      );
      // access user data here;
      setUser();
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
        storeUserToLocalStorage,
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
