import React, { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../Firebase/config";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Twitloader from "./twitloader";

const Form = ({ user }) => {
  const [isLoading, setisloading] = useState(null);
  //Koleksiyonun referansını alma
  const tweetim = collection(db, "tweets");
  //resmi storage'a yükler ve url'ini döndürür
  const uploadİmage = async (file) => {
    //  console.log(file);
    if (!file) {
      return null;
    }

    //dosyayı yükeleyeceğimiz konumun referansını alma
    const fileRef = ref(storage, file.name.concat(v4()));

    //Referansını aldığımız konuma dosyayı yükle
    return await uploadBytes(fileRef, file).then((response) =>
      getDownloadURL(response.ref)
    );
  };
  //formun gönderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisloading(true);
    //Formdaki verilere erişme
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];
    //yazı ve resim içeriği var mı?
    if (!textContent && !imageContent) {
      return toast.info("Lütfen Tweet içeriği ekleyin...");
    }
    // console.log(auth);

    //fonksiyonu storage'a yükler ve url'ini alır
    const İmageUrl = await uploadİmage(imageContent);

    console.log(İmageUrl);
    await addDoc(tweetim, {
      textContent,
      imageContent: İmageUrl,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });

    setisloading(false);
    e.target[0].value = "";
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='flex gap-3 p-4 border-b-[1px] border-gray-700'
    >
      <img
        className='gap-4 rounded-full h-[35px] md:h-[45px] mt-1'
        src={user?.photoURL}
        alt=''
      />
      <div className='w-full'>
        <input
          className='  w-full bg-transparent my-2 outline-none text-normal md:text-lg'
          placeholder='Neler oluyor ?'
          type='text'
        />
        <div className='flex justify-between items-center'>
          <label
            htmlFor='file-upload'
            className='hover:bg-gray-800 text-lg transition p-4  cursor-pointer'
          >
            <BsCardImage />
          </label>

          <input className='hidden' id='file-upload' type='file' />
          <button
            disabled={isLoading}
            className='bg-blue-600 flex justify-center items-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800'
          >
            {isLoading ? <Twitloader /> : "Tweetle"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
