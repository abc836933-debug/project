import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Upodatepswd()
 {
  const[userlist,setUserlist]=useState({});
  const ursid = sessionStorage.getItem('ursid');
  const[password,setPassword]=useState('');
  const[confirmpassword,setConfirmpassword]=useState('');


  useEffect(()=>{
    getusers();
  },[])

  function getusers() /* Assign Values for Update Password */
  {
      axios
      .get(`http://localhost:8080/getusers/${ursid}`)
      .then((res) => {
        setUserlist(res.data.password);
      })
      .catch((err) => {
        toast.error(err.response?.data);
      });
  }


  function Updatepswd()  /* Update Password */
  {
    if(password!==confirmpassword)
    {
      toast.error("New password and confirm password do not match!");
      return;
    }
    const obj={password};
       axios
      .put(`http://localhost:8080/Updatepswd/${ursid}`,obj)
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response?.data);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 to-indigo-300">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Update Password
        </h1>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              value={userlist}
              onChange={(e)=>setUserlist(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmpassword}
              onChange={(e)=>setConfirmpassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-300"
            onClick={Updatepswd}
          >
            Update Password
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-6">
          Make sure your new password is strong and secure.
        </p>
      </div>
    </div>
  );
}
