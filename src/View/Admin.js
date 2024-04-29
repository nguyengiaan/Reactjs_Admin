import React, { useEffect, useState } from 'react';
import '../User.css'
import axios from 'axios';
const Admin = () => {
    // State để lưu trữ danh sách người dùng
    const [users, setUsers] = useState([{}]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', username: '', password: '' });
    const [showEditForm, setShowEditForm] = useState(false);
    const [editUser, setEditUser] = useState({id:'', name: '', username: '', password: '' });
    const addUser = () => {
        setShowAddForm(true);
    };
    const fecthdata=async ()=>{
        try
        {
            const res=await axios.get('https://localhost:7108/api/Admin/GetDuLieu');
      
            if(res.status===200)
            {
                setUsers( res && res.data ? res.data : [])
            } 
        }
        catch(error)
        {
            console.log(error)
        }
    }
    useEffect(()=>{
       fecthdata()
    },[users])
    const deleteUser = async (id) => {
        try {
            const res=await axios.delete(`https://localhost:7108/api/Admin/DeleteDuLieu?id=${id}`);
            if(res.status===200)
            {
                console.log("Xóa thành công")
            }
            
        } catch (error) 
        {
            console.log(error)
        }
      
    };

    const editClicked = (user) => {
        setShowEditForm(true);
        setEditUser(user);
    };


    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    };

    // Hàm để lưu thông tin người dùng đã sửa
    const saveEditUser = () => {
        try
        {
            const formData=new FormData();
            formData.append("Name",editUser.name)
            formData.append("Username",editUser.username)
            formData.append("Password",editUser.password)
            const res  =axios.put(`https://localhost:7108/api/Admin/PutDuLieu?id=${editUser.id}`,formData,{
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            if (res===200)
            {
                console.log("Cập nhật thành công")
                setShowEditForm(false);
                setEditUser({id:'', name: '', password: '', username: '' });
            }
        }
        catch(error)
        {
            console.log(error)
        }
   
    };

    // Hàm để hủy bỏ việc chỉnh sửa thông tin người dùng
    const cancelEditUser = () => {
        setShowEditForm(false);
        setEditUser({ id: '', name: '', email: '', username: '' });
    };

    // Hàm để lưu thông tin người dùng mới
    const saveUser = async () => {
        if (!newUser.name || !newUser.username || !newUser.password) {
            alert("Vui lòng điền đầy đủ thông tin người dùng.");
            return;
        }
       try {
         const formData = new FormData();
         formData.append("Name",newUser.name)
         formData.append("Username",newUser.username)
         formData.append("Password",newUser.password)
         axios.post('https://localhost:7108/api/Admin/PostDuLieu', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
        })
        .then(res => {
            if (res.status===200) {
            
                console.log("Lưu thành công")
            }
          });
       } catch (error) {
        
       }
    };

    const cancelAddUser = () => {
        setShowAddForm(false);
        setNewUser({ name: '', email: '', username: '' });
    };

    return (
        <div className='px-3'>
            {/* <Nav Toggle={Toggle} /> */}
            <div className='container-fluid'>
            <table className="table caption-top bg-white rounded mt-2">
                    <caption className='text-white-fs-4'>Danh sách người dùng</caption>
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Tên</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Mật khẩu</th>
                            <th scope="col">Thao tác</th> {/* Thêm cột thể hiện các thao tác */}
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
            <tr key={user.id}> {/* Use user.id as the key */}
        <th scope="row">
            <div className='thuser'>{user.id}</div>
        </th>
        <td>
            <div className='thuser'>{user.name}</div>
        </td>
        <td>
            <div className='thuser'>{user.username}</div>
        </td>
        <td>
            <div className='thuser'>{user.password}</div>
        </td>
        <td>
            {/* Nút xóa với sự kiện onClick */}
            <button className="btn btn-danger btn-sm me-2" onClick={() => deleteUser(user.id)}>Xóa</button>
            {/* Nút sửa với sự kiện onClick */}
            <button className="btn btn-primary btn-sm me-2" onClick={() => editClicked(user)}>Sửa</button>
        </td>
    </tr>
))}


                    </tbody>
                </table>


                {/* Nút thêm người dùng với sự kiện onClick */}
                <button className="btn btn-success me-2" onClick={addUser}>Thêm người dùng</button>
                {/* Form thêm người dùng */}
                {showAddForm && (
                    <div className="mt-3">
                        <h5>Thêm người dùng mới</h5>
                        <input type="text" name="name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="Tên" className="form-control" />
                        <input type="email" name="email" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} placeholder="Username" className="form-control" />
                        <input type="text" name="username" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} placeholder="Mật khẩu" className="form-control" />
                        <button className="btn btn-primary mt-2 me-2" onClick={saveUser}>Lưu</button>
                        <button className="btn btn-secondary mt-2" onClick={cancelAddUser}>Hủy</button>
                    </div>
                )}
                {/* Form sửa người dùng */}
                {showEditForm && (
                    <div className="mt-3">
                        <h5>Sửa thông tin người dùng</h5>
                        <input type="text" name="name" value={editUser.name} onChange={handleEditInputChange} placeholder="Tên" className="form-control" />
                        <input type="text" name="username" value={editUser.username} onChange={handleEditInputChange} placeholder="Username" className="form-control" />
                        <input type="text" name="password" value={editUser.password} onChange={handleEditInputChange} placeholder="Mật khẩu" className="form-control" />
                        <button className="btn btn-primary mt-2 me-2" onClick={saveEditUser}>Lưu</button>
                        <button className="btn btn-secondary mt-2" onClick={cancelEditUser}>Hủy</button>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Admin;
