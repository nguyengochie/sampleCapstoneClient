import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import usersData from './UsersData'
import axios from 'axios';
function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`

  // const getBadge = (status) => {
  //   return status === 'Active' ? 'success' :
  //     status === 'Inactive' ? 'secondary' :
  //       status === 'Pending' ? 'warning' :
  //         status === 'Banned' ? 'danger' :
  //           'primary'
  // }

  return (
    <tr key={user.id.toString()}>
      <th scope="row"><Link to={userLink}>{user.id}</Link></th>
      <td><Link to={userLink}>{user.fullName}</Link></td>
      <td>{user.password}</td>
      <td>admin</td>
      <td><Link to={userLink}><Badge color={user.status==1?"success":"danger"}>{user.status==1?"Active":"Not Active"}</Badge></Link></td>
    </tr>
  )
}

class Users extends Component {

  constructor(props){
    super(props);
    this.state ={
      users: []
    }
  }
  componentDidMount(){
    axios.get("http://localhost:8081/user?page=1&limit=10").then(res=> {
      console.log(res.data);
      this.setState({users:res.data.listResult});
    } );
  }

  render() {

    //const userList = usersData.filter((user) => user.id < 10)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
