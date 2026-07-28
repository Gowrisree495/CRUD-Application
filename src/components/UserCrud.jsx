import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useLocation, useNavigate } from "react-router-dom";

const UserCrud = () => {
  const [users, setUsers] = useState([]);
  const id = null;
  const navigate = useNavigate();
  const {state} = useLocation();
  console.log(state);
   console.log(users);
  const handleFormClick = () => {
    navigate("/adduser",{state:{id,users}})
  }
  const handleEditClick = (item) => {
        navigate("/edit/user/" + item.id,{state:{id:item.id,users,item}})   
  };
  const handleDeleteClick = (data) => {
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + data.id)
      .then((res) => {
        const newUsers = users.filter((item) => item.id != data.id);
        setUsers(newUsers);
      });
  };
  const handleClick = (userData) => {
    navigate("/userdetails/" + userData.id);
  }
 
  useEffect(() => {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      if(state) {
        setUsers([...state]);
      } else {
        setUsers(res.data);
      }
    });
}, [state]);

  return (
            <div className="min-h-screen bg-gray-100  p-8">
              <div className=" flex justify-center items-start gap-200">
                <h2 className="text-2xl font-bold mb-6">Users</h2>
                <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-1 mx-2 my-2 rounded-lg" onClick={handleFormClick}>ADD USER +</button>
              </div>
              <div>
                <ul className="space-y-4 overflow-hidden grid grid-cols-3 gap-4 h-full">
                  {users?.map((item,i) => (
                  <div >
                   <button onClick={()=>handleClick(item)}><UserCard  data={item}/></button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 mx-2 my-2 rounded-lg" onClick={() => handleEditClick(item, i)}>EDIT</button>
                   <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg" onClick={()=>handleDeleteClick(item)}>DELETE</button>
                   </div>
                  ))}
                </ul>
              </div>
            </div>
  );
};

export default UserCrud;
