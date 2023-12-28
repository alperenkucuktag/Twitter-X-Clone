//Kullanıcının yetkisi varsa alt route'lara erişime izin ver
//Yoksa login sayfasına yönlendir

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/config";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [isAuth, setisAuth] = useState(null);
  useEffect(() => {
    //*Kullanıcı oturumu her değiştiğinde çalışır
    onAuthStateChanged(auth, (user) => {
      //   console.log(user);
      if (user) {
        setisAuth(true);
      } else {
        setisAuth(false);
      }
    });
  }, []);

  // Kullanıcının yetkisi yoksa logine yönlendir

  if (isAuth === false) {
    return <Navigate to={"/"} replace />;
  }

  //Yetkisi varsa alt route'u göster
  return <Outlet />;
};

export default ProtectedRoute;
