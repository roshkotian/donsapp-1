import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import logo from "../../pudueLogo.jpg";
import { red } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";

//const Regex = require("regex");
//const passwordRegex = Regex(/^[a-zA-Z0-9.#$%&/*-+]*$/);

const StyledButton = withStyles({
  root: {
    //background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    background: "black",
    fontWeight: "bolder",
    fontSize: "18px",
    borderRadius: 3,
    border: 0,
    color: "#daaa00",
    height: 48,
    padding: "0 30px"
    //boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

/*const formValid = formErrors => {
  let valid = true;
  console.log(formErrors);
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  return valid;
};*/
export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      errors: {},
      formErrors: {
        username: "",
        password: ""
      }
    };
  }

  validateForm = () => {
    console.log("Coming inside validation");
    let { username, password, errors } = this.state;
    let formIsValid = true;
    console.log(username);
    console.log(password);

    if (
      !username ||
      username == "" ||
      username == undefined ||
      username === null
    ) {
      console.log("Coming inside if condition for username");
      formIsValid = false;
      errors["username"] = "* username is required";
    }

    if (!password || password === null) {
      console.log("Coming inside if condition for password");
      formIsValid = false;
      errors["password"] = "* Password is required";
    }

    /*if (password !== "" || password !== null) {
      console.log("Coming inside if condition for password");
      var pattern = new RegExp(/^.{8,}/);
      if (!pattern.test(password)) {
        formIsValid = false;
        errors["password"] = " * Password should be minimum 8 characters.";
      }
    }*/
    this.setState({ errors });
    return formIsValid;
  };

  /* handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state.formErrors)) {
      console.log(`---Entered information---
      Userneme: ${this.state.username}
      Password: ${this.state.password}`);

      
    } else {
      console.error("Form invalid");
    }
  };*/

  handleSubmit = e => {
    e.preventDefault();
    console.log("Coming here");

    if (this.validateForm()) {
      let { username, password, errors } = this.state;
      let body = {
        userName: username,
        password
      };
      console.log("body ===>>>", body);

      axios({
        url: "http://localhost:5000/login/getLoginInfo",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(body)
      })
        .then(response => {
          if (response) {
            console.log("Login successful");
            console.log(JSON.stringify(response));
            //this.props.history.push("/homePage");
          } else {
            console.log("Login unsuccessful");
          }
        })
        .catch(error => {
          console.log("Error while routing");
        });
    }
  };

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    console.log("Name:", name);
    console.log("Value:", value);

    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      errors: Object.assign(this.state.errors, { [e.target.name]: "" })
    });

    switch (name) {
      case "username":
        formErrors.username =
          value.length < 6 && value.length > 0
            ? "Username has to be 6 characters"
            : "";
        break;
      case "password":
        formErrors.password =
          value.length > 8 && value.length > 0
            ? ""
            : "Password has to be atleast 8 characters";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {
      console.log(this.state);
    });
  };

  render() {
    const { formErrors } = this.state;
    let { username, password, errors } = this.state;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar
            title="DonsApp - Social Media Application"
            titleStyle={styles.color}
            //color="red"
            style={{ background: "black" }}
          ></AppBar>
          <Grid container justify="center" alignItems="center">
            <Avatar alt="DonsApp Logo" src={logo} style={styles.bigAvatar} />
          </Grid>
          <div>
            <TextField
              hintText="Enter your username"
              floatingLabelText="UserName"
              type="text"
              name="username"
              onChange={this.handleChange}
              error={username === ""}
              helperText={username === "" ? errors.username : " "}
              //defaultValue={values.username}
            />
            <p className=" text-danger text-center">{errors.username}</p>

            {formErrors.username.length > 0 && (
              <span className={styles.errorMessage}>{formErrors.username}</span>
            )}
          </div>

          <div>
            <TextField
              id="standard-password-input"
              hintText="Enter your password"
              floatingLabelText="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              //onChange={handleChange("password")}
              //defaultValue={values.password}
            />
            <p className=" text-danger text-center">{errors.password}</p>
            <br />
            {formErrors.password.length > 0 && (
              <span className={styles.errorMessage}>{formErrors.password}</span>
            )}
          </div>
          <br />
          <StyledButton
            //label="Submit"
            //primary={true}
            //style={{ background: "#2E3B55" }}
            onClick={this.handleSubmit}
          >
            Submit
          </StyledButton>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  },
  bigAvatar: {
    margin: 20,
    width: 300,
    height: 400
  },
  title: {
    flexGrow: 1,
    align: "center"

    // display: "none"
  },
  root: {
    flexGrow: 1
  },
  errorMessage: {
    color: "red"
  },
  color: {
    color: "#daaa00"
  }
};

export default Login;
