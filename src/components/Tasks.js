import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { FiCircle, FiCheckCircle } from "react-icons/fi"

const Tasks = (props) => {
  const { uid, tasks, setTasks } = props;

  const getTasks = async (uid) => {
    const docRef = doc(db, "Users", uid);

    const unsub = onSnapshot(docRef, (docSnap) => {
      const data = docSnap.exists() ? docSnap.data() : null;
      setTasks(data.tasks);
    })

    return unsub;
  }

  useEffect(() => {
    const unsub = getTasks(uid);

    return async () => await unsub();
  }, [uid]);

  const convertDate = (timestamp) => {
    const milliseconds = timestamp.seconds*1000;
    const dateObject = new Date(milliseconds);

    return dateObject.toLocaleDateString();
  }

  return (
    <ul className="w-[100%] flex flex-col items-center">
      {tasks.map(task => {
        const date = convertDate(task.date);
        return ( 
          <li 
            className="w-[100%] justify-between flex py-2 px-4 cursor-pointer 
            transition-all hover:bg-neutral-700 hover:shadow-lg rounded-md"
          >
            <div className="flex items-center gap-2">
              <FiCircle className="text-xl" />
              <p>{task.title}</p>
            </div>
            <p>{date}</p>
          </li>
        )
      })}
    </ul>
  ) 
};

export default Tasks;