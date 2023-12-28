import { doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { db } from "../Firebase/config";

const EditMode = ({
  isPicDelete,
  setispicdelete,
  close,
  id,
  text,
  isİmage,
}) => {
  const inputRef = useRef();
  //değişikleri kaydeder
  const handleSave = async () => {
    const tweetRef = doc(db, "tweets", id);
    try {
      //yazı içeriği günceller
      await updateDoc(tweetRef, { textContent: inputRef.current.value });
      //resim silinecekse onu kaldırır
      if (isPicDelete) {
        await updateDoc(tweetRef, {
          imageContent: null,
        });
      }
    } catch (err) {
      console.log(err);
    }

    close();
  };
  //tweetin fotoğraf içeriğini sil
  const deletePic = async () => {
    setispicdelete(!isPicDelete);
  };
  return (
    <>
      <input
        ref={inputRef}
        className=' bg-black rounded p-1 px-2 text-white'
        defaultValue={text}
        type='text'
      />
      <button
        onClick={handleSave}
        className='rounded-full mx-5 p-1 text-green-400 hover:bg-slate-500'
      >
        <BiSolidSave />
      </button>
      <button
        onClick={close}
        className='rounded-full  p-1 text-red-400 hover:bg-slate-500'
      >
        <ImCancelCircle />
      </button>
      {isİmage && (
        <button
          onClick={deletePic}
          className='absolute text-xl p-2 end-0 top-[77px] bg-gray-200 rounded-full   text-red-400 transition hover:bg-gray-500 '
        >
          <BsFillTrashFill />
        </button>
      )}
    </>
  );
};

export default EditMode;
