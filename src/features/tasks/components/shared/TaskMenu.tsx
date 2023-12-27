import type { Dispatch, SetStateAction } from 'react'
import type { CSSProperties } from '../../../../types/index'
import { useTasksAction } from '../hooks/Tasks'

interface TaskMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  onEditClick: () => void
  taskId: number
}

const TaskMenu = ({ setIsMenuOpen, onEditClick, taskId }: TaskMenuProps): JSX.Element => {
  const { deleteTask } = useTasksAction();

  const handleDelete = (): void => {
    deleteTask(taskId); // Memanggil fungsi deleteTask dengan taskId yang dipilih
    setIsMenuOpen(false); // Menutup menu setelah penghapusan
  };
  return (
    <div style={styles.menu}>
      <div style={styles.menuItem} onClick={onEditClick}> 
        <span className="material-icons">edit</span>Edit
      </div>
      <div style={styles.menuItem} onClick={handleDelete}>
        <span className="material-icons">delete</span>Delete
      </div>
      <span
        className="material-icons"
        style={styles.closeIcon}
        onClick={(): void => {
          setIsMenuOpen(false)
        }}
      >
        close
      </span>
    </div>
  )
}

const styles: CSSProperties = {
  menu: {
    backgroundColor: '#fff',
    border: '1px solid gray',
    padding: '8px 16px',
    position: 'absolute',
    top: '-10px',
    right: '4%',
    zIndex: 10,
  },
  menuItem: {
    display: 'flex',
    marginBottom: '8px',
    cursor: 'pointer',
  },
  closeIcon: {
    position: 'absolute',
    top: '0px',
    right: '2px',
    cursor: 'pointer',
  },
}

export default TaskMenu
