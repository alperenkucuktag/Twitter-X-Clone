import React, { useEffect } from "react";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import moment from "moment/moment";
import "moment/locale/tr";
import { auth, db } from "../../Firebase/config";
import Dropdown from "./Dropdown";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useState } from "react";
import EditMode from "../EditMode";
import "aos/dist/aos.css";
import AOS from "aos";
const Post = ({ tweet }) => {
  const [isPicDelete, setispicdelete] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const [isLiked, setisliked] = useState(null);

  // AOS

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  console.log(tweet);
  //tarih verisi şuandan ne kadar önce hesaplama
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  const handleDelete = async () => {
    if (confirm("Tweet'i silmeyi onaylıyo rmusunuz")) {
      //Silinicek tweetin referansını alma
      const tweetRef = doc(db, "tweets", tweet.id);
      await deleteDoc(tweetRef);
    }
  };

  //Kullanıcının tweet'i like layıp like'lamadığını kontrol eder

  useEffect(() => {
    const found = tweet.likes.find((id) => id === auth.currentUser.uid);
    setisliked(found);
  }, [tweet]);

  //like yoksa atar varsa kaldırır
  const handleLike = async () => {
    const tweetRef = doc(db, "tweets", tweet.id);
    await updateDoc(tweetRef, {
      likes: isLiked //bu kullanıcı tweeti like'ladı mı
        ? arrayRemove(auth.currentUser.uid) //like kaldırır
        : arrayUnion(auth.currentUser.uid), //like eklenir
    });
  };

  return (
    <div
      data-aos='fade-down'
      className='relative flex gap-3 p-3 border-b-[1px] border-gray-700'
    >
      <img className='w-12 h-12 rounded-full' src={tweet.user.photo} alt='' />
      <div className='w-full'>
        {/*Üst kısım>kullanıcı bilgileri*/}
        <div className='flex justify-between'>
          <div className='flex items-center gap-3'>
            <p className='font-bold'>{tweet.user.name}</p>
            <p className='text-gray'>
              @{tweet.user.name?.toLowerCase().replace(" ", "_")}
            </p>
            <p className='text-gray'>{date}</p>
          </div>
          {/* Ayar */}
          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown
              handleDelete={handleDelete}
              handleEdit={() => setEditmode(true)}
            />
          )}
          <p></p>
        </div>
        {/* Orta Kısım>tweet içeriği */}

        <div data-aos='zoom-in' className='my-3'>
          {editmode ? (
            <EditMode
              isPicDelete={isPicDelete}
              setispicdelete={setispicdelete}
              id={tweet.id}
              // Silmekten vazgeçme
              close={() => {
                setEditmode(false), setispicdelete(false);
              }}
              isİmage={tweet.imageContent}
              text={tweet.textContent}
            />
          ) : (
            <p>{tweet.textContent}</p>
          )}
          {tweet.imageContent && (
            <img
              className={`${
                isPicDelete ? "blur-sm" : " "
              } my-2 rounded-lg object-cover w-full mx-auto max-h-[440px]`}
              src={tweet.imageContent}
            />
          )}
        </div>
        {/* Alt kısım>etkileşim butonları */}
        <div className='flex justify-between'>
          <div className='p-2 px-3 rounded-full transition cursor-pointer hover:bg-[blue]'>
            <BiMessageRounded />
          </div>
          <div className='p-2 px-3 rounded-full transition cursor-pointer hover:bg-[blue]'>
            <FaRetweet />
          </div>
          <div
            onClick={handleLike}
            className='flex items-center gap-1 p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#bb229a]'
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}

            {tweet.likes.length}
          </div>
          <div className='p-2 px-3 rounded-full transition cursor-pointer hover:bg-[blue]'>
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
