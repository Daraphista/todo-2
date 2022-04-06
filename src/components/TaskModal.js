import { useEffect, useState } from "react";

const TaskModal = (props) => {
  const { modalActivated, closeModal, tasks, setTasks } = props;

  const {title, setTitle} = useState("");
  const {date, setDate} = useState(null);
  const {newTask, setNewTask} = useState({title: "lmao"})

  const createNewTaskObj = () => {
    const newTaskObj = {
      title: title,
      date: date,
    }

    console.log(newTaskObj)
    setNewTask(newTaskObj);
  }

  useEffect(() => {
    console.log(title)
  }, [title])

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  
  return (
    <div 
      className="fixed w-[100%] h-[100%] z-10 flex justify-center items-center"
    >
      <form 
        className="flex flex-col border-2 p-6 rounded-lg gap-6 w-[30%] h-[60%]
        justify-around bg-neutral-700 relative"
        onSubmit={e => {
          e.preventDefault();
          closeModal();
        }}
      >
        <button
          className="absolute top-2"
          onClick={() => closeModal()}
        >
          x
        </button>
        <input 
          type="text"
          className="text-lg p-2 text-black rounded-full"
          placeholder="I want to..."
          onChange={handleTitleChange}
          value={title}
        />
        <input 
          type="date" 
          className="text-lg p-2 text-black rounded-full"
          onChange={e => setDate(e.target.valueAsNumber)}
          value={date}
          />
        <button
          className="w-[100%] justify-between py-3 cursor-pointer 
          transition-all bg-neutral-900 shadow-lg rounded-md
          hover:text-[1.1rem] hover:bg-[#131313]
          active:text-neutral-400 active:text-[1rem]"
          onClick={() => {
            closeModal();
            createNewTaskObj();
          }}
        >
          Add Task
        </button>
        <p>{title}, {date}</p>
      </form>
    </div>
  )
}

export default TaskModal;