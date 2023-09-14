import React from 'react'
import { useParams } from 'react-router-dom'

const SMPost = () => {
    const {id} = useParams();
  return (
    <div>SMPost {id}</div>
  )
}

export default SMPost