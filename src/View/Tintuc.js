import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../Style/Tintuc.scss'
import anh from '../Image/7DRXOotl7yA.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Tintuc=()=>{
    const [news,setNews]=useState([{}]);
    const fecthdata= async ()=>{
        try
        {
            const res= await axios.get('https://localhost:7108/api/Tintuc/GetTintuc')
            if (res.status===200)
            {
                setNews( res && res.data ? res.data : [])
            }
        }
         catch (error)
        {
            console.log("Tin tức",error)
        }
    }
    useEffect(()=>{
        fecthdata();

    },[news])
    return(
        <div>
    <Container>
      <Row>
      {news && news.length > 0 && news.map((value, index) => {
    return (
       <>
            <Col key={index} id={index}>
                <div className='Tintuc'>
                    <Link to={"/tintuc/"+value.id_News}><p>{value.title}</p></Link>
                    <div className='content'>
                        <img src={'https://localhost:7108/Resources/' + value.image} alt={value.title} />
                    </div>
                </div>
            </Col>
            </>
    );
})}

      </Row>
    </Container>
        </div>
    );
}
export default Tintuc