import type { Dispatch, SetStateAction } from 'react'
import type { CSSProperties, Task } from '../../../../types/index'
import TaskForm from './TaskForm'

interface TaskModalProps {
  headingTitle: string
  type: string
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  defaultProgressOrder: number
  taskToEdit?: Task
}

const TaskModal = ({
  headingTitle,
  type,
  setIsModalOpen,
  defaultProgressOrder,
  taskToEdit,
}: TaskModalProps): JSX.Element => {
  return (
    <div style={styles.container}>
      <div style={styles.modalTop}>
        <h1>{headingTitle}</h1>
        <span
          className="material-icons"
          style={styles.icon}
          onClick={(): void => {
            setIsModalOpen(false)
          }}
        >
          close
        </span>
      </div>
      <TaskForm
        type={type} 
        defaultProgressOrder={defaultProgressOrder}
        setIsModalOpen={setIsModalOpen}
        taskToEdit={taskToEdit}
      />
    </div>
  )
}

const styles: CSSProperties = {
  container: {
    border: '1px solid gray',
    position: 'fixed',
    top: '10%',
    left: '40%',
    width: '25%',
    backgroundColor: '#fff',
    padding: '28px',
    zIndex: 10,
  },
  modalTop: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    cursor: 'pointer',
  },
}

export default TaskModal
