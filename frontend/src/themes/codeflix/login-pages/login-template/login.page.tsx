import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "../../../../reportWebVitals";
import { Layout } from "../Layout";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MuiThemeProvider,
  TextField,
} from "@material-ui/core";
import theme from "../theme";
import GitHubIcon from "@material-ui/icons/GitHub";

interface LoginProps {
  enabledPassword: boolean;
  loginAction: string;
  usernameEditDisabled: boolean;
  usernameLabel: string;
  usernameValue: string;
  passwordLabel: string;
  enabledRememberMe: boolean;
  enabledLoginRememberMe?: boolean;
  rememberMeLabel: string;
  resetPasswordAllowed: boolean;
  resetPasswordUrl: string;
  resetPasswordLabel: string;
  selectedCredential?: string;
  submitLabel: string;
  socialProviders?: {
    loginUrl: string;
    alias: string;
    providerId: "github";
    displayName: string;
  }[];
  register?: {
    newUserLabel: string;
    url: string;
    registerLabel: string;
  };
}

const icons = {
  github: <GitHubIcon />,
};

const Login: React.FC<LoginProps> = (props) => {
  return (
    <Box padding={2}>
      <Grid container spacing={3} justify="space-evenly">
        {props.enabledPassword && (
          <Grid item xs={props.socialProviders ? 7: 12}>
            <form action={props.loginAction}>
              <TextField
                id="username"
                name="username"
                fullWidth
                variant="outlined"
                label={props.usernameLabel}
                defaultValue={props.usernameValue}
                autoFocus
                autoComplete="off"
                disabled={props.usernameEditDisabled}
              />
              <TextField
                id="password"
                name="password"
                type="password"
                fullWidth
                variant="outlined"
                margin={"normal"}
                label={props.passwordLabel}
              />
              <div>
                {props.enabledRememberMe && props.usernameEditDisabled && (
                  <div>
                    <input
                      type="checkbox"
                      checked={props.enabledLoginRememberMe}
                    />{" "}
                    {props.rememberMeLabel}
                  </div>
                )}
                {props.resetPasswordAllowed && (
                  <Link href={props.resetPasswordUrl} color="secondary">
                    {props.resetPasswordLabel}
                  </Link>
                )}
              </div>
              <Grid container>
                <Grid
                  item
                  xs={7}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {props.register && (
                    <div>
                      {props.register.newUserLabel}{" "}
                      <Link
                        href={props.register.registerLabel}
                        color="secondary"
                      >
                        {props.register.registerLabel}
                      </Link>
                    </div>
                  )}
                </Grid>
                <Grid
                  item
                  xs={5}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <input
                    type="hidden"
                    id="id-hidden-input"
                    name="credentialId"
                    defaultValue={props.selectedCredential}
                  />
                  <Button color="secondary" variant="contained">
                    {props.submitLabel}
                  </Button>
                </Grid>
                <Grid></Grid>
              </Grid>
            </form>
          </Grid>
        )}
        {props.socialProviders && (
          <>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={4}>
              <List>
                {props.socialProviders.map((socialProvider, key) => {
                  return (
                    <ListItem
                      key={key}
                      button
                      component="a"
                      href={socialProvider.loginUrl}
                    >
                      <ListItemIcon>
                        {icons[socialProvider.providerId]}
                      </ListItemIcon>
                      <ListItemText>{socialProvider.displayName}</ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

declare const layout: any;
declare const child: any;

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout {...layout}>
        <Login {...child}></Login>
      </Layout>
      <CssBaseline />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
