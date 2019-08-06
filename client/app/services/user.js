// authenticate the user only using jwt, as configured in our store
export const authUser = app =>
  // don't specify any options here - authenticate() without any arguments
  // will auth the user using localStorage if the feathers-jwt token is present
  app
    .authenticate()
    .then(data => data)
    .catch(err => err);

// the integration with our server. We receive the data sent via our saga handler
export const login = (app, { email, password }) =>
  // and use app.authenticate, using localstorage to store the returned key,
  // and pass through the details the user entered in the form
  app
    .authenticate({
      strategy: 'local',
      email,
      password,
    })
    // if it resolves, we return the data from the server
    .then(data => data)
    // if it is rejected, send back an empty object that we can use to
    // determine if the request was a success or failure
    .catch(err => {
      console.log(err);
      // return the full error here so we can get better feedback on what's going
      // on when the server to log in
      return err;
    });
