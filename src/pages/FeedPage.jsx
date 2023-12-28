import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import Main from "../Components/Main";
import Aside from "../Components/Aside";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/config";

const FeedPage = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    //*Oturumu açık olan kullanıcının
    //*hesap bilgilerine erişme
    onAuthStateChanged(auth, (res) => {
      setUser(res);
    });
  }, []);

  return (
    <div className='feed h-screen bg-black overflow-hidden'>
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default FeedPage;
