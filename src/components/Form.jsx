import axios from "axios";
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom";

const Form = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
    const {register,handleSubmit} = useForm();
    const onSubmit = (data) => {
      if(state.id==null){
        axios
        .post("https://jsonplaceholder.typicode.com/users/", data)
        .then((res)=>{          
          const maxId = Math.max(...state.users.map((user)=>user.id))
          res.data.id = maxId + 1,
          navigate("/",{state:[...state.users,res.data]})
        }
        )
      }else{
          axios
          .put("https://jsonplaceholder.typicode.com/users/" + state.id,data)
          .then((res)=>{
             let editedUsers = state.users.map((item)=>{
             if(item.id==res.data.id){
             return res.data;
             }else{
             return item;
             }
             })
            navigate("/",{state:[...editedUsers]})
          })
        }
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="bg-white shadow-lg rounded-xl p-8 w-100">
      <h2 className="text-2xl font-bold mb-6 text-center">
       {state&&state.id? "Update User" : "Add User"}

      </h2>
      <div  className="flex flex-col gap-4">
         <input
            type="text"
            {...register("name", {
              value: state.item ? state.item.name : "",
              required: "Name is required"
            })}
            placeholder="Enter Name"
            className="border border-gray-400 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            {...register("email", {
              value : state.item ? state.item.email : "",
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format"
              }
            })}
            placeholder="Enter Email"
            className="border border-gray-400 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">
           {state&&state.id? "Update User" : "Add User"}
          </button>
          </div>
    </div>
    </form>
  )
}

export default Form