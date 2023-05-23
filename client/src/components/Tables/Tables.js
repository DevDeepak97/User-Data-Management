import React from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import { ToastContainer} from "react-toastify"
import "./table.css"

const Tables = ({ userdata}) => {
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userdata.length > 0 ? userdata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index+1}</td> 
                            <td>{element.name}</td>
                            <td>{element.email}</td>
                            <td>{element.gender}</td> 
                            <td >{element.status}</td>
                            <td>  <NavLink to={`/edit/${element._id}`} className="text-decoration-none">
                                    <span>Edit</span>
                                    </NavLink>
                            </td>
                          </tr>
                        </>
                      )
                    }) : <div className='no_data text-center'>NO Data Found</div>
                  }
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  )
}

export default Tables