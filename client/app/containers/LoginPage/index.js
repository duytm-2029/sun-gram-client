/*
 * LoginForm
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import * as actions from '../../actions/currentUser';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  onSubmit(e) {
    // eslint-disable-next-line react/prop-types
    const { location, login } = this.props;
    const { email, password } = this.state;
    // get the params to see if there are any query params
    const params = new URLSearchParams(location.search);
    e.preventDefault();
    login({
      email,
      password,
    });
  }

  render() {
    return (
      <div>
        <form noValidate onSubmit={this.onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.onChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot/password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(actions.login(data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(LoginForm);
