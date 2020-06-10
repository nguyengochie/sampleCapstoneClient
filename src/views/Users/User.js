import React, { Component } from "react";
import {
  Input,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Form,
} from "reactstrap";
import axios from "axios";
// import usersData from './UsersData';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      disable: "disabled",

      userName: "",
      fullName: "",
      password: "",
    };
  }
  componentDidMount() {
    const user_id = this.props.match.params.id;
    axios.get(`http://localhost:8081/user/${user_id}`).then((response) => {
      console.log(response.data);
      this.setState({ user: response.data });
      this.setState({ userName: response.data.userName });
      this.setState({ fullName: response.data.fullName });
      this.setState({ password: response.data.password });
    });
  }
  handleButtonOnclick = (event) => {
    this.setState({ disable: "" });
    event.preventDefault();
  };
  OnclickSave = (event) => {
    this.setState({ disable: "disabled" });
    event.preventDefault();
    axios.put(`http://localhost:8081/user/${this.props.match.params.id}`, {
      id: this.state.user.id,
      userName: this.state.userName,
      password: this.state.password,
      fullName: this.state.fullName,
      status: this.state.user.status,
    }).then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
      // if (err.response.status === 400) {
      //   this.setState({ loginFalse: true });
      // }
    });
    // axios({
    //   method: 'PUT',
    //   url: `http://localhost:8081/user/${this.props.match.params.id}`,
    //   data: {
    //     id: this.state.user.id,
    //     userName: this.state.userName,
    //     password: this.state.password,
    //     fullName: this.state.fullName,
    //     status: this.state.user.status,
    //   },
    //   withCredentials: true,
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // if (err.response.status === 400) {
    //     //   this.setState({ loginFalse: true });
    //     // }
    //   });
  };
  handleInputChange = (event) => {
    const { value, name } = event.target;
    console.log(name + " : " + value);
    this.setState({ [name]: value });
  };

  render() {
    // const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1"></i>User id:{" "}
                  {this.state.user.id}
                </strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handlerOnSubmit} className="login">
                  <Table responsive striped hover>
                    <tbody>
                      <tr>
                        <td>ID: </td>
                        <td>{this.state.user.id}</td>
                      </tr>
                      <tr>
                        <td>Username: </td>
                        <td>
                          <Input
                            value={this.state.userName}
                            name="userName"
                            disabled={this.state.disable}
                            onChange={this.handleInputChange}
                          ></Input>
                        </td>
                      </tr>
                      <tr>
                        <td>Full Name: </td>
                        <td>
                          <Input
                            value={this.state.fullName}
                            name="fullName"
                            disabled={this.state.disable}
                            onChange={this.handleInputChange}
                          ></Input>
                        </td>
                      </tr>
                      <tr>
                        <td>Password: </td>
                        <td>
                          <Input
                            value={this.state.password}
                            name="password"
                            disabled={this.state.disable}
                            onChange={this.handleInputChange}
                          ></Input>
                        </td>
                      </tr>
                      <tr>
                        <td>Status: </td>
                        <td>
                          <Badge
                            color={
                              this.state.user.status == 1 ? "success" : "danger"
                            }
                          >
                            {this.state.user.status == 1
                              ? "Active"
                              : "Not Active"}
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <button

                    onClick={this.handleButtonOnclick}
                    className="btn btn-primary mr-5"
                  >
                    Edit
                  </button>
                  <button
                    type="submit"
                    onClick={this.OnclickSave}
                    className="btn btn-primary mr-5"
                  >
                    Save
                  </button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default User;
