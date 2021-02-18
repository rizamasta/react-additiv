import React from "react";
import { MainBar } from "app/components/app-bar";
import { Button, Typography } from "@material-ui/core";
import AppHistory from "app/utils";
import { RequestGet } from "app/utils/HttpReq";
export default class EmployeOverview extends React.Component {
  state = { name: "", error: null, data: [] };
  componentDidMount() {
    this.getEmployee();
  }

  getEmployee() {
    var params = new URLSearchParams(this.props.location.search);
    if (params.get("name")) {
      this.setState({ name: params.get("name"), error: null });
      RequestGet("assignment/employees/" + params.get("name"))
        .then(r => {
          r.data[1]
            ? this.setState({ data: r.data[1]["direct-subordinates"] })
            : this.setState({ error: "Doesn't have Subordinates" });
        })
        .catch(e => {
          this.setState({ error: e.message });
        });
    } else {
      AppHistory.push("404");
    }
  }

  render() {
    const { name, error, data } = this.state;
    return (
      <div style={{ paddingTop: 80, paddingLeft: 40 }}>
        <MainBar title="Employee Overview" />
        <Typography>Employee Overview</Typography>
        <Typography>Subordinates of employee {name}:</Typography>
        <table>
          <tbody>
            {data.map((v, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{v}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {error && <Typography color="secondary">{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={() => AppHistory.push("")}>
          Back to Home
        </Button>
      </div>
    );
  }
}
