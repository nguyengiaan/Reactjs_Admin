import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Dashboard from './Dashboard';
const Login=()=>{
    const [account,setAccount]=useState({username: '',password: ''})
    const [islogin,setIslogin]=useState(false);
    const Loginuser=()=>{
        try 
        {
            console.log("Đã bấm")
            const Formdata=new FormData();
            Formdata.append("UserName",account.username)
            Formdata.append("Password",account.password)
            const res=axios.post('https://localhost:7108/api/Admin/LoginUser',Formdata,{
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            if (res)
            {
                console.log("Login thành công")
                setIslogin(true)
            }
        } catch (error)
        {
            console.log("bị lỗi",error)
        } 
    }
    return(
     <>
     {islogin ? <Dashboard/> : (
    <div className='Login'>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="username" 
                    size="lg"  
                    style={{width: '500px'}} 
                    value={account.username} 
                    onChange={(e) => setAccount({...account, username: e.target.value})} 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    size="lg" 
                    style={{width: '500px'}} 
                    value={account.password} 
                    onChange={(e) => setAccount({...account, password: e.target.value})} 
                />
            </Form.Group>
            <Button  
                variant="primary" 
                size="lg" 
                onClick={Loginuser}
            >
                Đăng nhập
            </Button>
        </Form>
    </div>
)}

     </>
      
    );
}
export default Login