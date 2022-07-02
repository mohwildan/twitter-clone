/* eslint-disable @next/next/no-img-element */
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../Atom/modalAtom";
import Modal from "react-modal";
import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../Firebase";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState({});
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const router = useRouter()

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot);
    });
  }, [postId]);
  const sendComment = async () => {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: input,
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    setOpen(false);
    setInput("");
    router.push(`posts/${postId}`)
  };
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%] bordedr-gray-400 absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 rounded-xl shadow-md"
        >
          <div className="p-1">
            <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
            <div className="border-b border-gray-200 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-12 h-12 flex items-center justify-center"
              >
                <XIcon className="h-[22px] text-gray-700" />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <img
                className="h-11 w-11 rounded-full mr-4"
                src={post?.data()?.userImg}
                alt="user-img"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.data()?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post?.data()?.username} -{" "}
              </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.data()?.text}
            </p>
            <div className="flex p-3 space-x-3">
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
                    placeholder="Tweet your reply"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filepickerref.current.click()}
                    >
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      {/* <input
                              type="file"
                              hidden
                              ref={filepickerref}
                              onChange={addImagePost}
                            /> */}
                    </div>
                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    disabled={!input}
                    onClick={sendComment}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentModal;
