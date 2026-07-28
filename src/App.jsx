import { createBrowserRouter, RouterProvider } from "react-router-dom"
import UserCrud from "./components/UserCrud"
import UserDetails from "./components/UserDetails"
import Form from "./components/Form"

const App = () => {
  const appRouter = createBrowserRouter([
    {
    path: "/",
    element: <UserCrud />
    },
    {
    path: "/userdetails/:id",
    element: <UserDetails />
    },
    {
      path: "/adduser",
      element:<Form/>
    },
    {
    path: "/edit/user/:id",
    element:<Form/>
    },
  ])
  return (
     <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
