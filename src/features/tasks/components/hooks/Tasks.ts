import { useRecoilState } from 'recoil'
import { tasksState } from '../../TaskAtoms'
import type { Task } from '../../../../types'
import { TASK_PROGRESS_ID } from '../../../../constants/app'

interface useTaskActionType {
  completeTask: (taskId: number) => void
  moveTaskCard: (taskId: number, directionNumber: 1 | -1) => void
  addTask: (
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ) => void
}

export const useTasksAction = (): useTaskActionType => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)

  const completeTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId
        ? { ...task, progressOrder: TASK_PROGRESS_ID.COMPLETED }
        : task,
    )
    setTasks(updatedTasks)
  }

  const moveTaskCard = (taskId: number, directionNumber: 1 | -1): void => {
    // Temukan tugas yang akan dipindahkan berdasarkan ID
    const taskToMove = tasks.find((task) =>
    task.id === taskId);
    if (taskToMove) {
      // Dapatkan indeks tugas yang akan dipindahkan dalam array tasks
      const currentIndex = tasks.indexOf(taskToMove);
       // Hitung indeks baru berdasarkan arah yang diberikan
      const newIndex = currentIndex + directionNumber;
      // Pastikan indeks baru berada dalam rentang valid array tasks
      if (newIndex >= 0 && newIndex < tasks.length) {
        // Salin array tasks ke array baru untuk dimodifikasi
        const updatedTasks = [...tasks];
        // Hapus tugas dari posisi asalnya
        updatedTasks.splice(currentIndex, 1);
        // Sisipkan tugas ke posisi baru sesuai dengan newIndex
        updatedTasks.splice(newIndex, 0, taskToMove);
        // Perbarui state tasks menggunakan setTasks dengan array yang sudah dimodifikasi
        setTasks(updatedTasks);

      }
    }
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

  return {
    completeTask,
    moveTaskCard,
    addTask,
  }

  

}