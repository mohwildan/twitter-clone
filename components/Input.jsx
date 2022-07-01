/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../Firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { XIcon } from "@heroicons/react/solid";

export default function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState();
  const filepickerref = useRef(null);
  const [selecFile, setSelecFile] = useState(null);
  const [loding, setLoding] = useState(false);

  const sendPost = async () => {
    if (loding) return;
    setLoding(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: input,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selecFile) {
      await uploadString(imageRef, selecFile, "data_url").then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadUrl,
        });
      });
    }
    setInput("");
    setSelecFile(null);
    setLoding(false);
  };

  const addImagePost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEven) => {
      setSelecFile(readerEven.target.result);
    };
  };

  return (
    <>
      {session && (
        <div className="flex  border-b border-gray-200 p-3 space-x-3">
          <img
            src={session.user.image}
            alt="user-img"
            className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
          />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                rows="2"
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {selecFile && (
              <div className="">
                <XIcon
                  onClick={() => setSelecFile(null)}
                  className="h-7 text-black absolute cursor-pointer shadow-md shadow-white rounded-full"
                />
                <img
                  src={selecFile}
                  alt=""
                  className={`${loding && "animate-pulse"}`}
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!loding && (
                <>
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filepickerref.current.click()}
                    >
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      <input
                        type="file"
                        hidden
                        ref={filepickerref}
                        onChange={addImagePost}
                      />
                    </div>
                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    disabled={!input}
                    onClick={sendPost}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
