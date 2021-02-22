import React from "react";
import { MainBar } from "app/components/app-bar";
import { Button, Typography } from "@material-ui/core";
import AppHistory from "app/utils";
import { getEmployeeData } from "./employee-api";

//error handler
function Error(props) {
  return <Typography color="secondary">{props.text}</Typography>;
}
function DataDisplay(props) {
  return (
    <table>
      <tbody>
        {props.data.map((value, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default class EmployeOverview extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(this.props.location.search);
    this.state = { name: params.get("name"), error: null, data: [] };
  }

  componentDidMount() {
    const { name } = this.state;
    if (name) {
      this.getEmployee(name);
    } else {
      AppHistory.push("404");
    }
  }

  async getEmployee(nameValue) {
    const { data: dataEmployee, error: message } = await getEmployeeData(
      nameValue
    );

    const { data, name } = this.state;

    if (message) {
      this.setState({ error: message });
    } else if (dataEmployee[1]) {
      const newValue = await dataEmployee[1]["direct-subordinates"].map(
        name => {
          this.getEmployee(name);
          return data.indexOf(name) < 0 ? name : null;
        }
      );
      this.setState({
        data: [
          ...data,
          ...newValue.filter(filteredValue => filteredValue != null),
        ],
      });
    } else {
      if (nameValue === name) {
        this.setState({ error: "Doesn't have Subordinates" });
      }
    }
  }

  render() {
    const { name, error, data } = this.state;
    return (
      <div style={{ paddingTop: 80, paddingLeft: 40 }}>
        <MainBar title="Employee Overview" />
        <Typography>Employee Overview</Typography>
        <Typography>Subordinates of employee {name}:</Typography>
        <DataDisplay data={data} />
        <Error text={error} />
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
