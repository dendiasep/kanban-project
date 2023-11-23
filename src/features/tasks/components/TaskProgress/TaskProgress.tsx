import React from 'react'
import { useRecoilValue } from 'recoil'
import {
  notStartedTasksSelector,
  inProgressTasksSelector,
  waitingTasksSelector,
  completedTasksSelector,
} from '../../TaskSelectors'
import TaskColumn from './TaskColumn'
import type { Task, CSSProperties } from '../../../../types'
import {TASK_PROGRESS_STATUS} from '../../../../constants/app'
import {useTasksAction} from '../hooks/Tasks'

const TaskProgress = (): JSX.Element => {
  const notStartedTasks: Task[] = useRecoilValue(notStartedTasksSelector)

  const inProgressTasks: Task[] = useRecoilValue(inProgressTasksSelector)

  const waitingTasks: Task[] = useRecoilValue(waitingTasksSelector)

  const completedTasks: Task[] = useRecoilValue(completedTasksSelector)

  const {moveTaskCard} = useTasksAction()

  const handleMoveTask = (taskId: number, directionNumber: 1 | -1) => {
    moveTaskCard(taskId, directionNumber)
  }
  

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Task Progress</h1>
      <div style={styles.taskCategories}>
      <TaskColumn
          columnTitle={TASK_PROGRESS_STATUS.NOT_STARTED}
          tasks={notStartedTasks}
          onMoveTask={handleMoveTask}
        />
        <TaskColumn
          columnTitle={TASK_PROGRESS_STATUS.IN_PROGRESS}
          tasks={inProgressTasks}
          onMoveTask={handleMoveTask}
        />
        <TaskColumn
          columnTitle={TASK_PROGRESS_STATUS.WAITING}
          tasks={waitingTasks}
          onMoveTask={handleMoveTask}
        />
        <TaskColumn
          columnTitle={TASK_PROGRESS_STATUS.COMPLETED}
          tasks={completedTasks}
          onMoveTask={handleMoveTask}
        />
      </div>
    </div>
  )
}

const styles: CSSProperties = {
  container: {
    padding: '20px',
  },
  heading: {
    color: '#55C89F',
    marginBottom: '60px',
  },
  taskCategories: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}

export default TaskProgress
