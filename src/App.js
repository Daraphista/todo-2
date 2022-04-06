import { useEffect, useState } from 'react';
import CurrentUser from './components/CurrentUser';
import { getUserData } from "./firebase";
import Tasks from './components/Tasks';
import TaskModal from './components/TaskModal';

const App = () => {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState("");
  const [modalActivated, setModalActivated] = useState(false);
  const [tasks, setTasks] = useState([]);

  const liftUserState = (user) => {
    setUser(user);
  }

  const openModal = () => {
    setModalActivated(true);
  }
  const closeModal = () => {
    setModalActivated(false);
  }

  useEffect(() => {
    (async () => {
      if(user) {
        setUid(user.uid);
      }
    })();
  }, [user])

  return (
    <div className="flex h-screen w-screen">

      <div className="bg-[#393939] flex-[1] p-8 flex flex-col">
        <section className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold">Todo App</h1>
        </section>
        <CurrentUser liftUserState={liftUserState} />
      </div>

      <main className="bg-[#2C2B2B] flex-[4] flex justify-center">
        <div className="w-[min(800px,_80%)] flex flex-col items-center gap-4 py-10">
          <h1 className="text-4xl font-bold mr-auto">Tasks</h1>
          <Tasks uid={uid} tasks={tasks} setTasks={setTasks}/>
          <button 
            className="w-[100%] justify-between py-2 cursor-pointer 
            transition-all bg-neutral-900 shadow-lg rounded-md
            hover:text-[1.1rem] hover:bg-[#131313]
            active:text-neutral-400 active:text-[1rem]"
            onClick={() => openModal()}
          >
            + Add Task
          </button>
        </div>
      </main>

      <TaskModal 
        modalActivated={modalActivated} 
        closeModal={closeModal} 
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
}

export default App;
