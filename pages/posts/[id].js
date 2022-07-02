import Sidebar from "../../components/Sidebar";


import { useSession } from "next-auth/react"
import CommentModal from "../../components/CommentModal";
import Input from "../../components/Input";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import {useEffect, useState} from 'react'
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase";
import Comment from "../../components/Comment";




export default function PostId() {
  
    const [post, setPost] = useState([])
    const [comment, setComment] = useState([])
    const router = useRouter()
    const {id} = router.query
    
    // useEffect(() => {
    //   onSnapshot(doc(db, "posts", id), (snapshot) => {
    //     setPost(snapshot)
    //   })
    // }, [id])

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComment(snapshot.docs)
    );
  }, [ id]);

  return (
    <main className="flex min-h-screen mx-auto">
      <Sidebar />
      <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 items-center sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="hoverEffect" onClick={() => router.push("/")}>
          <ArrowLeftIcon className="h-5"/>
        </div>
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Tweet</h2>
      </div>
      {comment.map((comments) => (
        <Comment key={comments.id} comment={comments.data()}/>
        
      ))}
    </div>
      <CommentModal />
    </main>
  )
}