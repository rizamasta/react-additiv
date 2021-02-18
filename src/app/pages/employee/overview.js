import React from "react";
import { MainBar } from "app/components/app-bar";
import { Typography } from "@material-ui/core";
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
          this.setState({ data: r.data[1]["direct-subordinates"] });
        })
        .catch(e => {
          this.setState({ error: e });
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
        {error && <Typography color="secondary">{error.message}</Typography>}
      </div>
    );
  }
}
