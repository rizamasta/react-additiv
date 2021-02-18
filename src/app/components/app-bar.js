import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export const MainBar = props => (
  <AppBar position="fixed" style={{ marginBottom: 80 }}>
    <Toolbar>
      <Typography variant="h6">{props.title}</Typography>
    </Toolbar>
  </AppBar>
);
