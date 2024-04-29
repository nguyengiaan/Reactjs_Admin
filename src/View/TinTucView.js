import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const TinTucView =()=>{
    const [item,setitem]=useState();
    const {id}=useParams();
    const fecthdata= async() =>{
        try {
            const res= await axios.get(`https://localhost:7108/api/Tintuc/Gettintucid?id=${id}`)
            if (res.status===200)
            {
                setitem(res && res.data ? res.data : []);
                console.log("tintucview successs")
            }
        } catch (error) 
        {
            console.log(error)
        }
    }
    useEffect(()=>{
        fecthdata();
    },[])
    return(
        <>
        <Container>
         <Row>
                <Col>
                    <div className='title'>
                        <p>{item && item.title}</p>
                    </div>
                    <div className='content'>
                        <p>
                        {item && item.content}
                        </p>
                    </div>
                </Col>
         </Row>
    </Container>
        </>
    );
}
export default TinTucView