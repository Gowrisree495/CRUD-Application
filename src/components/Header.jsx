import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";

const Header = () => {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(null);
  const handleEditClick = (item, userIndex, setValues) => {
    setId(item.id);
    const selectedUser = users[userIndex];

    setValues({
      name: selectedUser.name,
      email: selectedUser.email,
    });
  };
  const handleDeleteClick = (data) => {
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + data.id)
      .then((res) => {
        const newUsers = users.filter((item) => item.id != data.id);
        setUsers(newUsers);
      });
  };
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <Formik
      initialValues={{ name: "", email: "" }}
      onSubmit={(values, { setValues }) => {
        if (id == null) {
          axios
            .post("https://jsonplaceholder.typicode.com/users/", values)
            .then((res) => setUsers([...users, res.data]));
        } else {
          axios
            .put("https://jsonplaceholder.typicode.com/users/" + id, values)
            .then((res) => {
              setId(null);
              let editedUsers = users.map((item) => {
                if (item.id == res.data.id) {
                  return res.data;
                } else {
                  return item;
                }
              });
              setUsers(editedUsers);
              setValues({
                name: "",
                email: "",
              });
              console.log(res.data);
            });
        }

        // console.log(values);
      }}
    >
      {({ setValues }) => (
        <>
          <Form>
            <div className="min-h-screen bg-gray-100 flex justify-center items-start gap-16 p-8">
              <div className="bg-white shadow-lg rounded-xl p-6 w-125">
                <h2 className="text-2xl font-bold mb-6">Users</h2>

                <ul className="space-y-4">
                  {users?.map((item, i) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between border-b pb-3"
                    >
                      <span className="font-medium">{item.name}</span>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(item, i, setValues)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteClick(item)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white shadow-lg rounded-xl p-8 w-100">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  {id ? "Update User" : "Add User"}
                </h2>

                <div className="flex flex-col gap-4">
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter Name"
                    className="border border-gray-400 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    className="border border-gray-400 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                  >
                    {id ? "Update User" : "Add User"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default Header;
