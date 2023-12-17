import type { Dispatch, SetStateAction } from 'react'
import type { Task, CSSProperties } from '../../../../types'
import { filterTasks } from '../hooks/Tasks'

interface TaskFilterProps {
  setIsFilterOpen: (isOpen: boolean) => void;
  tasks: Task[];
  setFilteredTasks: Dispatch<SetStateAction<Task[]>>;
  setFilterType: Dispatch<SetStateAction<'completed' | 'uncompleted' | 'all'>>; // Tambah properti setFilterType
}

const TaskFilter = ({ setIsFilterOpen, tasks, setFilteredTasks, setFilterType }: TaskFilterProps): JSX.Element => {

  const handleFilter = (filterType: 'completed' | 'uncompleted' | 'all'): void => {
    const filteredTasks = filterTasks(tasks, filterType);
    
    setFilteredTasks(filteredTasks);
    setFilterType(filterType); // Perbarui tipe filter
    setIsFilterOpen(false);
  };

  return (
    <div style={styles.menu}>
      <div style={styles.menuItem} onClick={() => handleFilter('completed')}>
        <span className="material-icons">done</span>Completed Task
      </div>
      <div style={styles.menuItem} onClick={() => handleFilter('uncompleted')}>
        <span className="material-icons">clear</span>Uncompleted Task
      </div>
      <div style={styles.menuItem} onClick={() => handleFilter('all')}>
        <span className="material-icons">list</span>All Task
      </div>
      <span
        className="material-icons"
        style={styles.closeIcon}
        onClick={(): void => {
          setIsFilterOpen(false);
        }}
      >
        close
      </span>
    </div>
  );
};

const styles: CSSProperties = {
  menu: {
    backgroundColor: '#fff',
    border: '1px solid gray',
    padding: '8px 16px',
    position: 'absolute',
    top: '100px',
    right: '47%',
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
};

export default TaskFilter;