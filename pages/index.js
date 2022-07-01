import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed"
import Widgets from "../components/Widgets";
import { useSession } from "next-auth/react"



export default function Home() {
  // console.log(newsResults,randomUsersResults);
    const { data: session,status } = useSession()
    console.log(session);

  return (
    <main className="flex min-h-screen mx-auto">
      <Sidebar />
      <Feed />
      {/* <Widgets newsResults={newsResults.articles}/> */}
      {status === "authenticated" && (
        <p>{session.user.name}</p>
      )} 
    </main>
  )
}

// export async function getServerSideProps() {
//   const newsResults = await fetch(
//     "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
//   ).then((res) => res.json());
//   return {
//     props: {
//       newsResults,
//     },
//   };
// }