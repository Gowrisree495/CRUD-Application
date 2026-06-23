import { createBrowserRouter, RouterProvider } from "react-router-dom"
import UserCrud from "./components/UserCrud"
import UserDetails from "./components/UserDetails"

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
    
  ])
  return (
     <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
