import { useRecoilState } from 'recoil'
import { tasksState } from '../../TaskAtoms'
import type { Task } from '../../../../types'
import { 
  TASK_PROGRESS_ID } from '../../../../constants/app'

interface useTaskActionType {
  completeTask: (taskId: number) => void
  moveTaskCard: (taskId: number, directionNumber: 1 | -1) => void
  addTask: (
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ) => void
  updateTask: (taskId: number, updatedTask: Task) => void // Tambahkan definisi updateTask
  deleteTask: (taskId: number) => void
}

export const useTasksAction = (): useTaskActionType => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)

  const updateTask = (taskId: number, updatedTask: Task): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    )
    setTasks(updatedTasks)
  }

  const completeTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId
        ? { ...task, progressOrder: TASK_PROGRESS_ID.COMPLETED }
        : task,
    )
    setTasks(updatedTasks)
  }

  const moveTaskCard = (taskId: number, directionNumber: 1 | -1): void => {
    const updatedTasks: Task[] = tasks.map((task) => {
      if (task.id === taskId) {
        const currentOrder = task.progressOrder || 0;
        const newOrder = currentOrder + directionNumber;
        return { ...task, progressOrder: newOrder };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const addTask = (
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ): void => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      detail,
      dueDate,
      progressOrder,
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }
  
  return {
    completeTask,
    moveTaskCard,
    addTask,
    updateTask,
    deleteTask,
  }
}

export const filterTasks = (tasks: Task[], filterType: 'completed' | 'uncompleted' | 'all'): Task[] => {
  switch (filterType) {
    case 'completed':
      return tasks.filter((task) => task.progressOrder === TASK_PROGRESS_ID.COMPLETED);
    case 'uncompleted':
      return tasks.filter((task) => task.progressOrder !== TASK_PROGRESS_ID.COMPLETED);
    case 'all':
    default:
      return tasks;
  }
};
