import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SideMenuLayout from './layouts/SideMenuLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SideMenuLayout />,
    children: [
      {
      path: '/',
      element:  <h1>Home</h1>,
      },
      {
        path: 'task-list',
        element: <h1>Task List</h1>,
      },
      {
        path: 'task-progress',
        element: <h1>Task Progres</h1>
      }
    ]
  }
        
])

function App(): JSX.Element {
  return <RouterProvider router={router} />
}

export default App