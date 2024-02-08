"use client"
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const Profile = () => {
  const [data, setData] = useState("nothing")
  const router= useRouter()
  const logout=async()=>{
    try {
      await axios.get("/api/users/logout");
      router.push("/login")
    } catch (error:any) {
      console.log("error while logging out",error.message)
    }
  }
  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data);
    setData(res.data.data.username)
}
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      Welcome to Profile
      <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
      <button
        onClick={()=>logout()}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

         <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>
    </div>
  )
}

export default Profile
