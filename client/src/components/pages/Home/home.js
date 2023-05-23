import React, {useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Tables from '../../Tables/Tables';
import Spiner from "../../Spiner/Spiner"
import "./home.css"
import { toast } from 'react-toastify';

const Home = () => {
  const [userdata,setUserData] = useState([]);
  const [showspin,setShowSpin] = useState(true);
  
const userGet=async ()=>{
  const response = await fetch(`http://localhost:4002/api/users`);
  if(response.status === 200){
    response.json().then(userInfo => {
      setUserData(userInfo); 
   });
  }
  else{
    console.log("error for get user data")
  }
}
  const exportuser =async ()=>{
    const response = await fetch(`http://localhost:4001/user`);
    if(response.status === 200){
      response.json().then(data=>{
        window.open(data.downloadUrl,"blank")
      })
         }else{
           toast.error("error !")
       } 
  }
  useEffect(()=>{
    userGet();
    setTimeout(()=>{
        setShowSpin(false)
    },1200)
  },[])

  return (
    <>
      <div className="container">
        <div className="main_div">

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className='export_btn' onClick={exportuser}>Export To Csv</Button>
            </div>
          </div>
        </div>
        {
          showspin ? <Spiner /> : <Tables userdata={userdata} />
        }
      </div>
    </>
  )
}

export default Home