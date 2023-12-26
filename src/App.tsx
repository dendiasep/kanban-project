import { RecoilRoot } from 'recoil'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import TaskSummary from "./features/tasks/components/TaskSummary"
import TaskList from "./features/tasks/components/TaskList/TaskList"
import TaskProgress from "./features/tasks/components/TaskProgress/TaskProgress"
import SideMenuLayout from "./layouts/SideMenuLayout"

const router = createBrowserRouter([
  {
    path: '/',
    element: <SideMenuLayout />,
    children: [{
        path: '/',
        element: <TaskSummary />
      },
      {
        path: 'task-list',
        element: <TaskList />
      },
      {
        path: 'task-progress',
        element: <TaskProgress />
      },
    ],  
  },
],
)

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default App
