
const UserCard = ({data,userEdit,userDelete}) => {
  return (
    <div  className="bg-white shadow-lg rounded-xl p-6 w-75 h-50 pr-2 pl-2 mr-2 ml-2">
        <ul key={data.id}>
            <li>ID: {data.id}</li>
            <li>NAME: {data.name}</li>
            <li>EMAIL: {data.email}</li>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 mx-2 my-2 rounded-lg" onClick={userEdit}>EDIT</button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg" onClick={userDelete}>DELETE</button>
        </ul>
    </div>
  )
}

export default UserCard