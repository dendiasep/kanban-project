import React, { useState } from 'react'
import TaskMenu from '../shared/TaskMenu'
import TaskModal from '../shared/TaskModal'
import type { Task, CSSProperties } from '../../../../types'
import { TASK_PROGRESS_ID } from '../../../../constants/app'
import { TASK_MODAL_TYPE } from '../../../../constants/recoilKeys'
import {useTasksAction} from '../hooks/Tasks'

interface TaskCardProps {
  task: Task
  taskId: number
  
}

const getArrowPositionStyle = (progressOrder: number): React.CSSProperties => {
  const justifyContentValue: 'flex-end' | 'space-between' =
    progressOrder === TASK_PROGRESS_ID.NOT_STARTED
    ? 'flex-end' : 'space-between'
  return {
    display: 'flex',
    justifyContent: justifyContentValue,
  }
}

const getIconStyle = (progressOrder: number): React.CSSProperties => {
  const color: '#55C89F' | '#C5C5C5' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? '#55C89F' : '#C5C5C5'

  const cursor: 'default' | 'pointer' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? 'default' : 'pointer'

  return {
    color,
    cursor,
    fontSize: '28px',
  }
}

const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
  const {completeTask, moveTaskCard} = useTasksAction()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const handleEditClick = () => {
    // Lakukan apa pun yang diperlukan saat tombol "Edit" diklik
    setIsModalOpen(true)
    // Misalnya, tampilkan modal edit atau navigasi ke halaman edit
  }


  return (
    <div style={styles.taskCard}>
      <div style={styles.taskIcons}>
        <div className="material-icons" style={getIconStyle(task.progressOrder)} onClick={(): void => {
            completeTask(task.id) // Ditambahkan
          }}>check_circle</div>
        <div 
          className="material-icons" 
          style={styles.menuIcon}
          onClick={(): void => {
            setIsMenuOpen(true) // Ditambahkan
          }}
          >
          more_vert
        </div>
      </div>
      <p style={styles.taskTitle}>{task.title}</p>
      <div>
        <p>{task.detail}</p>
      </div>
      <div>
        <p>Due on {task.dueDate}</p>
      </div>
      <div style={getArrowPositionStyle(task.progressOrder)}>
        {task.progressOrder !== TASK_PROGRESS_ID.NOT_STARTED && (
          <button 
          className="material-icons" 
          onClick={() => moveTaskCard(task.id, -1)}
          >
            chevron_left
          </button>
        )}
        {task.progressOrder !== TASK_PROGRESS_ID.COMPLETED && (
          <button 
          className="material-icons" 
          onClick={() => moveTaskCard(task.id, 1)}
          >
            chevron_right
          </button>
        )}
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle="Edit Task"
          type={TASK_MODAL_TYPE.EDIT}
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={task.progressOrder}
          taskToEdit={task} // Mengirim data task yang akan diedit ke TaskModal
        />
      )}
      {isMenuOpen && (
        <TaskMenu setIsMenuOpen={setIsMenuOpen} taskId={task.id} onEditClick={handleEditClick} />
      )}
    </div>
  )
}

const styles: CSSProperties = {
  taskCard: {
    backgroundColor: '#C7EFD0',
    borderRadius: '12px',
    padding: '24px',
    margin: '12px 0',
    fontSize: '20px',
    overflowWrap: 'anywhere',
    position: 'relative',
  },
  taskIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuIcon: {
    cursor: 'pointer',
  },
  taskTitle: {
    fontSize: '30px',
  },
  arrowsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}

export default TaskCard