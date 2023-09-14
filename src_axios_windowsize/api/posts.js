import axios from "axios"

const posts = () => {
  return (
    <div>posts</div>
  )
}

export default axios.create({
    baseURL: 'http://localhost:3500'
});