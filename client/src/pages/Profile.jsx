import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center font-semibold text-3xl my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="h-24 w-24 self-center rounded-full mt-2"
        />
        <input
          type="text"
          placeholder="username"
          id="name"
          className="focus:outline-none focus:shadow-lg rounded-lg p-3"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="focus:outline-none focus:shadow-lg rounded-lg p-3"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="focus:outline-none focus:shadow-lg rounded-lg p-3"
        />
        <button className="rounded-lg p-3 uppercase bg-yellow-400 text-white">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5 ">
        <span className="text-red-600">Delete Account</span>
        <span className="text-red-600">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
