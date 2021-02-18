import React from "react";
import { MainBar } from "app/components/app-bar";
import { Button, Typography } from "@material-ui/core";
import AppHistory from "app/utils";
import { RequestGet } from "app/utils/HttpReq";
let removeDuplicate = data => data.filter((v, i) => data.indexOf(v) === i);
export default class EmployeOverview extends React.Component {
  state = { name: "", error: null, data: [] };
  componentDidMount() {
    var params = new URLSearchParams(this.props.location.search);
    this.setState({ name: params.get("name"), error: null });
    if (params.get("name")) {
      this.getEmployee(params.get("name"));
    } else {
      AppHistory.push("404");
    }
  }

  getEmployee(n) {
    RequestGet("assignment/employees/" + n)
      .then(r => {
        if (r.data[1]) {
          var d = r.data[1]["direct-subordinates"].map(v => {
            this.getEmployee(v);
            return v;
          });
          this.setState({ data: [...this.state.data, ...d] }, () => {
            this.setState({ data: removeDuplicate(this.state.data) });
          });
        } else {
          if (n === this.state.name) {
            this.setState({ error: "Doesn't have Subordinates" });
          }
        }
      })
      .catch(e => {
        this.setState({ error: e.message });
      });
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
