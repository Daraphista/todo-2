import { useAuthState } from "react-firebase-hooks/auth"
import { auth, signInWithGoogle, signOutUser } from '../firebase';
import { FiLogOut } from 'react-icons/fi';
import { useEffect } from "react";

const CurrentUser = (props) => {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    props.liftUserState(user);
  }, [user])

  if (user) {
    return (
      <div
        className="mt-auto py-3 grid grid-cols-[1fr_3fr_1fr] gap-x-2"
      >
        <img 
          className="row-[1/3] rounded-full"
          src={user.photoURL} 
          alt="user profile"
        ></img>
        <h2 className="text-2xl col-[2/3] flex items-end">{user.displayName}</h2>
        <p className="col-[2/3] flex items-start">{user.email}</p>
        <button 
          className="col-[3/4] row-[1/3] text-3xl flex justify-center 
          items-center"
          onClick={signOutUser}
        >
          <FiLogOut className="hover:border-2 border-neutral-800 hover:bg-neutral-800 
          rounded-md transition-colors"/>
        </button>
      </div>
    );
  } else if (loading) {
    return (
      <div
        className="mt-auto py-3 flex justify-center"
      >
        Loading...
      </div>
    )
  } else if (error) {
    return (
      <div
        className="mt-auto py-3 flex justify-center"
      >
        An error has occured. Please refresh the page.
      </div>
    )
  } else if (!user) {
    return (
      <button 
        className="mt-auto hover:bg-neutral-800 transition-[200ms] 
        rounded-md py-3"
        onClick={signInWithGoogle}
      >
        Sign In
      </button>
    );
  }
}

export default CurrentUser;