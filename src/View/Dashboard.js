import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [news, setNews] = useState([{}]);
    const [newitem,setNewitem]=useState({Title: '',Content:'',Image:'',FormFile:null})
    const [add,setAdd]=useState(false);
    const [edit,setEdit]=useState(false);
    const [newedit,setNewedit]=useState({});
    const fetchData = async () => {
        try {
            const res = await axios.get('https://localhost:7108/api/Tintuc/GetTintuc');
            if (res.status === 200) {
                setNews(res.data || []);
            }
        } catch (error) {
            console.log("Tin tức", error);
        }
    };
    const putedit= async ()=>{
        try 
        {
            const Formdata=new FormData();
            Formdata.append("Title",newedit.title)
            Formdata.append("Content",newedit.content)
            const res = await axios.put(`https://localhost:7108/api/Tintuc/PutTintuc?id=${newedit.id_News}`,Formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })    
            if(res===200)
            {
                console.log("Thành công")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const AddNews= async ()=>{
        try
        {
            const Formdata=new FormData();
            Formdata.append('Title',newitem.Title)
            Formdata.append('Content',newitem.Content)
            Formdata.append('Image' ,newitem.Image)
            Formdata.append('FormFile',newitem.FormFile)
            const res=await axios.post('https://localhost:7108/api/Tintuc/PostTintuc',Formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            if (res.status=== 200)
            {
                console.log("Thành công")
                setNewitem({...newitem,Title: '',Content:'',Image:'',FormFile:null})
            }
        } 
        catch (error)
        {
            console.log(error)
        }
    }
    const deletenew= async (id)=>{
        try
        {
            const res=await axios.delete(`https://localhost:7108/api/Tintuc/DeleteTintuc?id=${id}`)
            if(res.status===200)
            {
                console.log('Xóa thành công')
            }
        } 
        catch (error) {
            console.log(error)
        }
    }
    const setEditClick=(news)=>{
        setNewedit(news)
        setEdit(!edit)
    }
  
    useEffect(() => {
        fetchData();
    }, [news]);
    return (
        <Container>
        <Row>
          <Col> 
           <div>
            <Table striped bordered hover size="lg" style={{ width: '1300px', height: '100px' }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tiêu đề</th>
                        <th>Hình ảnh</th>
                        <th>Nội dung</th>
                        <th>Thêm</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {news && news.length > 0 && news.map((value, index) => (
                        <tr key={index}>
                          <td>
                            <div>{value.id_News}</div>
                        </td>
                        <td>
                            <div style={{ maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {value.title}
                            </div>
                        </td>
                        <td>
                            <div>{value.image}</div>
                        </td>
                        <td>
                            <div style={{ maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {value && value.content}
                            </div>
                        </td>
                        <td>
                            <Button variant='primary' onClick={()=>setAdd(!add)}>Thêm</Button>
                        </td>
                        <td>
                            <Button variant='primary' onClick={()=>setEditClick(value)} >Sửa</Button>
                        </td>
                        <td>
                            <Button variant='primary' onClick={()=>deletenew(value.id_News)}>Xóa</Button>
                        </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </Col>
        </Row>
        <Row>
            
        {add &&
                <Col>
                 <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Tiêu đề</Form.Label>
        <Form.Control type="text" placeholder="nhập tiêu đề" value={newitem.Title} onChange={(e)=>setNewitem({...newitem,Title:e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Nội dung</Form.Label>
        <Form.Control as="textarea" rows={10} value={newitem.Content} onChange={(e)=>setNewitem({...newitem,Content:e.target.value})} />
      </Form.Group>
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Ảnh thumbnail</Form.Label>
        <Form.Control type="file" size="lg"  onChange={(e) => setNewitem({...newitem, FormFile: e.currentTarget.files[0]})} />
      </Form.Group>
      <Button className='Primary' size='lg' onClick={AddNews}>Thêm Tin tức</Button>
      </Form>

    </Col>
            }
        </Row>
        <Row>
            <Col>
            {edit && 
            <>
                           <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Tiêu đề</Form.Label>
        <Form.Control type="text" placeholder="nhập tiêu đề" value={newedit.title} onChange={(e)=>setNewedit({...newedit,title:e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Nội dung</Form.Label>
        <Form.Control as="textarea" rows={10} value={newedit.content} onChange={(e)=>setNewedit({...newedit,content:e.target.value})} />
      </Form.Group>
      <Button className='Primary' size='lg' onClick={putedit}>Sửa tin tức</Button>
      </Form>
            </>}
            </Col>
          
        </Row>
      </Container>
      

    );
};

export default Dashboard;
