import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import { useSnackbar } from "notistack";

import Auth from "../services/Auth";
import AuthContext from "../contexts/AuthContext";
import waves from "../icons/waves.svg";

import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    background: "#324563"
  },

  waves: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60%",
    maxHeight: "50%",
    objectFit: "cover",
    objectPosition: "50% 0",
    zIndex: 0
  },

  appInfo: {
    marginBottom: theme.spacing(8)
  },

  appName: {
    color: theme.palette.primary.contrastText,
    opacity: 0.87
  },

  appDescription: {
    color: theme.palette.primary.contrastText,
    opacity: 0.5
  },

  card: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    minWidth: 400,
    zIndex: 1
  },

  cardContent: {
    display: "flex",
    flexDirection: "column",

    "& > *": {
      marginBottom: theme.spacing(4)
    },

    "& > *:last-child": {
      marginBottom: 0
    }
  },

  passwordField: {
    marginBottom: theme.spacing(1)
  },

  forgotPasswordLink: {
    marginLeft: theme.spacing(1),
    textDecoration: "none"
  }
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    token: [, setToken]
  } = useContext(AuthContext);

  const handleUsernameChange = event => {
    setUsername(event.currentTarget.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.currentTarget.value);
  };

  const handleLoginClick = async () => {
    const response = await Auth.login(username, password);

    if (response.success) {
      setToken(response.token);
      history.push("/app/dashboard");
    } else {
      enqueueSnackbar("Login fehlgeschlagen", { variant: "error" });
    }
  };

  const handleKeyPress = event => {
    switch (event.charCode) {
      // Enter
      case 13:
        handleLoginClick();
        break;

      default:
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <img className={classes.waves} src={waves} alt="" />

      <div className={classes.appInfo}>
        <Typography variant="h2" align="center" className={classes.appName}>
          Bilfinger
        </Typography>
        <Typography
          variant="h4"
          align="center"
          className={classes.appDescription}
        >
          Wartungscenter
        </Typography>
      </div>

      <Card onKeyPress={handleKeyPress} className={classes.card}>
        <CardHeader title="Bitte melde Dich an" />
        <CardContent className={classes.cardContent}>
          <TextField
            label="Username"
            variant="outlined"
            size="small"
            onChange={handleUsernameChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            onChange={handlePasswordChange}
            className={classes.passwordField}
          />
          <Link to="#" className={classes.forgotPasswordLink}>
            Passwort vergessen?
          </Link>
          <Button
            color="primary"
            variant="contained"
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
