import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(filePerc);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = file.name + new Date().getTime();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({
            ...formData,
            avatar: downloadURL,
          })
        );
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center font-semibold text-3xl my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="h-24 w-24 self-center rounded-full mt-2 cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error uploading file</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-500">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-500">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
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
