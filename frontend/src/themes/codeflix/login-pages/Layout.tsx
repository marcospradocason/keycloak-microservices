import * as React from "react";
import { Navbar } from "../components/Navbar";
import { LocaleSelect } from "../../../components/LocaleSelect";
import { Box, Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import Alert, { Color } from "@material-ui/lab/Alert";

interface LayoutProps {
  i18nEnabled: boolean;
  locale?: {
    currentLocale: string;
    locales: {
      url: string;
      label: string;
    }[]
  };
  currentLocale: string;
  header: string;
  username: string;
  attemptedUsername: string | null; //hide;
  loginRestartFlowUrl: string; //hide;
  restartLoginTooltip: string; //hide;
  message?: { type: Color; summary: string };
  isAppInitiatedAction: boolean;
  showTryAnotherWayLink: boolean; //hide;
  loginAction: string; //hide;
  doTryAnotherWay: string; //hide;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div style={{ height: "100%" }}>
      <Navbar />
      <Box paddingTop={"70px"} margin={"0"} height="100%">
        <Grid
          container
          alignItems="center"
          justify="center"
          direction={"column"}
          style={{ height: "100%" }}
        >
          <Grid item>
            <Card style={{ width: 600 }}>
              <CardHeader
                title={props.header}
                style={{ textAlign: "center", color: "#999999" }}
              ></CardHeader>
              <CardContent>
                {props.message &&
                  props.message.type !== "warning" &&
                  props.isAppInitiatedAction && (
                    <Alert
                      severity={props.message.type}
                      variant="filled"
                      elevation={6}
                    >
                      {props.message.summary}
                    </Alert>
                  )}
              </CardContent>
              <div>{props.children}</div>
            </Card>
          </Grid>
          {props.i18nEnabled && props.locale && (
            <Grid item>
              <LocaleSelect
                locales={props.locale.locales}
                defaultValue={props.locale.currentLocale}
                style={{ fontSize: "12px" }}
                disableUnderline={true}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};
