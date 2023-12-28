import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../Firebase/config";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Authpage = () => {
  const [Signup, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setpasserror] = useState(true);
  const navigate = useNavigate();
  const handleGoogle = () => {
    signInWithPopup(auth, provider).then(() => navigate("/feed"));
  };
  // Epostayla Kayıt olma
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Signup) {
      //yeni hesap oluştur
      console.log(email, password);
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => toast.success("Hesabınız Oluşturuldu"))
        .catch((err) => toast.error(`Üzgünüz bir hata oluştu:${err.code}`));
    } else {
      //varolan hesaba giriş yap
      signInWithEmailAndPassword(auth, email, password)
        .then(() => toast.success("Giriş başarıyla yapılmıştır"))
        .catch((err) => {
          toast.error(`Üzgünüz yanlış şifre veya Email    ${err.code}`);
          console.dir(err);
          if (err.code === "autth/invalid-login-credentials") {
            setpasserror(true);
          }
        });
    }
  };
  //Şifre sıfırlama e postası

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email).then(() =>
      toast.info("Şifrenizi Sıfırlama isteği e-posta adresinize gönderilmiştir")
    );
  };

  return (
    <section className='h-screen grid place-items-center'>
      <div className='bg-black place-items-center flex flex-col gap-10 py-16 px-32 rounded-lg'>
        {/*Logo*/}

        <div>
          <img
            className='h-[60px] d-flex place-items-center'
            src='/public/twitterx.png'
            alt='img'
          />
        </div>
        <h1 className='text-center font-bold text-xl'>Twitter'a Giriş yap</h1>
        {/* Google button */}
        <button
          onClick={handleGoogle}
          className='flex items-center bg-white py-2 px-10 rounded-full text-black cursor-pointer gap-3 transition hover:bg-gray-300'
        >
          <img className='h-[20px]' src='g-logo.png' alt='google-logo' />
          <span className='whitespace-nowrap'>Google ile giriş yap</span>
        </button>
        {/* Giriş formu */}
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]'
            type='text'
            required
          />
          <label className='mt-5'>Şifre</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]'
            type='password'
            required
          />
          <button
            onClick={handleSubmit}
            className='bg-white text-black mt-10 rounded-full p-1 font-bold transition'
          >
            {Signup ? "Kaydol" : "Giriş Yap"}
          </button>

          <p className='mt-5 flex gap-4'>
            <span className='text-gray-500'>
              {Signup ? "Hesabınız Varsa" : "Hesabınız yoksa"}
            </span>
            <span
              className=' cursor-pointer text-blue-500'
              onClick={() => setSignUp(!Signup)}
            >
              {Signup ? "Giriş Yap" : "Kaydol"}
            </span>
          </p>
        </form>
        {/* Şifre hatası varsa sıfırlama butonu */}
        {passError && (
          <p
            onClick={resetPassword}
            className='text-center text-red-500 cursor-pointer'
          >
            Şifrenizi mi Unuttunuz ?
          </p>
        )}
      </div>
    </section>
  );
};

export default Authpage;
