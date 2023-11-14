import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SideMenuLayout from './layouts/SideMenuLayout'
import { RecoilRoot } from 'recoil'
import TaskSummary from './features/tasks/components/TaskSummary'


const router = createBrowserRouter([
  {
    path: '/',
    element: <SideMenuLayout />,
    children: [
      {
      path: '/',
      element:  <TaskSummary />,
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
  return  (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default App