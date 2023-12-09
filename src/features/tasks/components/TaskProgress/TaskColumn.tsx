import React, { useState } from 'react'
import TaskModal from '../shared/TaskModal'
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '../../../../constants/app'
import TaskCard from './TaskCard'
import type { Task, CSSProperties } from '../../../../types'

interface TaskColumnProps {
  columnTitle: string
  tasks: Task[]
  onMoveTask: (taskId: number, directionNumber: 1 | -1) => void
}

const TaskColumn = ({ columnTitle, tasks }: TaskColumnProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false) 
  return (
    <div style={styles.categoryColumn}>
      <div style={styles.columnTitleWrapper}>
        <h2 style={styles.categoryTitle}>{columnTitle}</h2>
        <div 
          className="material-icons" 
          style={styles.plusIcon}
          onClick={(): void => {
            setIsModalOpen(true)
          }}
        >
          add
        </div>
      </div>
      <div>
        {tasks.map((task: Task) => {
          return <TaskCard key={task.id} task={task} taskId={task.id} />
        })}
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle="Add your task"
          type={TASK_MODAL_TYPE.ADD}
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={TASK_PROGRESS_ID.NOT_STARTED}
        />
      )}
    </div>
  )
}

const styles: CSSProperties = {
  plusIcon: {
    cursor: 'pointer',
  },
  categoryColumn: {
    width: '22%',
  },
  columnTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 4px',
  },
}

export default TaskColumn