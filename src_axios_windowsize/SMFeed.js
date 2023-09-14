import SMPost from './SMPost'

const SMFeed = ({posts}) => {
  return (
    <>
        {
            posts.map(post => (
                <SMPost key={post.id} post={post} />
            ))
        }
    </>
  )
}

export default SMFeed