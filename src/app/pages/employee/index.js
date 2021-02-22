import React from "react";
import { MainBar } from "app/components/app-bar";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import AppHistory from "app/utils";
import { decode } from "app/utils/HttpReq";
export default class EmployeExplorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
    };
  }

  submitdata(event) {
    event.preventDefault();
    const { searchKey } = this.state;
    AppHistory.push("/overview?" + decode({ name: searchKey }));
  }

  render() {
    const { searchKey } = this.state;
    return (
      <div style={{ paddingTop: 80, paddingLeft: 40 }}>
        <MainBar title="Employee Explorer" />
        <Typography variant="h5">Welcome to Employee Explorer</Typography>
        <form onSubmit={event => this.submitdata(event)}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center">
            <Grid item sm={6} lg={6} md={6} xs={6}>
              <TextField
                placeholder="Type Employee Name"
                style={{ width: "80%" }}
                value={searchKey}
                onChange={e => this.setState({ searchKey: e.target.value })}
              />
              <Button type="submit">Search</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
