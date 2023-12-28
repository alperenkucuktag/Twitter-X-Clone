import React, { useEffect, useState } from "react";
import Form from "./Form";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/config";
import Loading from "./Post/Loading";
import Post from "./Post";
import { orderBy, query } from "firebase/firestore";
const Main = ({ user }) => {
  const [tweet, setTweet] = useState(null);
  const tweetsCol = collection(db, "tweets");
  //atılan tweetleri çekme
  useEffect(() => {
    //verileri alırken devreye giricek ayarları belirleme
    const option = query(tweetsCol, orderBy("createdAt", "desc"));
    const sendTweet = onSnapshot(option, (snapShot) => {
      const tempTweets = [];
      snapShot.docs.forEach((doc) =>
        tempTweets.push({ id: doc.id, ...doc.data() })
      );
      setTweet(tempTweets);
    });
  }, []);
  
  return (
    <main className='border border-gray-700 overflow-y-auto'>
      <header className='font-bold p-4 border-b-[1px] border-gray-700'>
        Anasayfa
      </header>
      <Form user={user} />
      {!tweet ? (
        <Loading />
      ) : (
        tweet.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
