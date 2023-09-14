import React from 'react'
import { Link } from 'react-router-dom'

const SMPostPage = () => {
  return (
    <main>
        <h1>Post Page</h1>
        <Link to="/postpage/1" >Post1</Link>
        <br></br>
        <Link to="/postpage/2" >Post2</Link>
        <br></br>
        <Link to="/postpage/3" >Post3</Link>
    </main>
  )
}

export default SMPostPage