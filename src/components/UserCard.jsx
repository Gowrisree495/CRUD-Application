
const UserCard = ({data}) => {
  return (
    <div  className="bg-white shadow-lg rounded-xl p-6 w-75 h-50 pr-2 pl-2 mr-2 ml-2">
        <ul key={data.id}>
            <li>ID: {data.id}</li>
            <li>NAME: {data.name}</li>
            <li>EMAIL: {data.email}</li>
        </ul>
    </div>
  )
}

export default UserCard