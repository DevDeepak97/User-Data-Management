import React, {useState} from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from "../../Spiner/Spiner"
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "./edit.css"

const Edit = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [showspin, setShowSpin] = useState(true);

  const [inputdata, setInputData] = useState({
    name: "",
    email: "",
    gender: "",
    status:""
  });

  const [status, setStatus] = useState("Active");

  const options = [
    { value: 'active', label: 'active' },
    { value: 'inactive', label: 'inactive' },
  ];

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  const setStatusValue = (e) => {
    setStatus(e.value)
  }

  const submitUserData = async(e) => {
    e.preventDefault();

    const { name, email, gender} = inputdata;

    if (name === "") {
      toast.error("First name is Required !")
    } else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (gender === "") {
      toast.error("Gender is Required !")
    } else if (status === "") {
      toast.error("Status is Required !")
    } else {
      
      const data = {}
       data.name=name
       data.email=email
      data.gender=gender
      data.status=status

      const response = await fetch(`http://localhost:4002/api/users/${id}`, {
        method: 'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
      });

      if(response.ok){
        navigate("/")
      }

    }
  }

    setTimeout(() => {
      setShowSpin(false)
    }, 1200)


  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">
          <h2 className='text-center mt-1'>Update Your Details</h2>
          <Card className='shadow mt-3 p-3'>
            <Form>
              <Row>
                <Form.Group className="mb-1 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name='name' value={inputdata.name} onChange={setInputValue} placeholder='Enter Full Name' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name='email' value={inputdata.email} onChange={setInputValue} placeholder='Enter Email' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    checked={inputdata.gender === "Male" ? true:false}
                    onChange={setInputValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    checked={inputdata.gender === "Female" ? true:false}
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Status</Form.Label>
                  <Select options={options} defaultValue={status} onChange={setStatusValue} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitUserData}>
                  Submit
                </Button>
              </Row>

            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      }

    </>
  )
}

export default Edit