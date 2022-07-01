/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import SidemenuItem from "./SidemenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          alt="logo"
          width={50}
          height={50}
        />
      </div>
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidemenuItem text="Home" Icon={HomeIcon} active />
        <SidemenuItem text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SidemenuItem text="Notifications" Icon={BellIcon} />
            <SidemenuItem text="Messages" Icon={InboxIcon} />
            <SidemenuItem text="Bookmarks" Icon={BookmarkIcon} />
            <SidemenuItem text="Lists" Icon={ClipboardIcon} />
            <SidemenuItem text="Profile" Icon={UserIcon} />
            <SidemenuItem text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>
      {session ? (
        <>
          <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
            Tweet
          </button>
          <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
            <img
              src={session.user.image}
              alt="profile"
              className="h-10 w-10 rounded-full xl:mr-2"
              onClick={() => signOut()}
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold">{session.user.name}</h4>
              <p className="text-gray-500">@{session.user.username}</p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
          </div>
        </>
      ) : (
        <button onClick={() => signIn()} className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
          Sing in
        </button>
      )}
    </div>
  );
};

export default Sidebar;
