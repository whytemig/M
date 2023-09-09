import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";




const Post = () => {
  const [posts, setPosts] = useState([])
  
  const token = useSelector(state => state.auth.token)
  

  useEffect(() => {

     const fetchPosts = async() => {
      try {
        const response = await fetch(`http://localhost:5500/post/timestatus/posts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        console.log(data);
        // setPosts(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchPosts()
  }, [])
  


  return (
    <div className='flex justify-center mx-auto bg-slate-400 h-full w-full max-w-[1240px]'>
      <h1>Post</h1>
    </div>
  )
}

export default Post