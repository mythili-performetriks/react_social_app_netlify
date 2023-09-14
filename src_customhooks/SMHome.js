import SMFeed from './SMFeed'

const SMHome = ({posts, fetchError, isLoading}) => {
  return (
    <main className="Home">
        {isLoading && <p className="statusMsg">Loading posts...</p>}
        {!isLoading && fetchError && 
            <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>
        }
        {
        !isLoading && !fetchError && 
            (posts.length ? <SMFeed posts={posts} /> : 
                <p className="statusMsg">No posts to display.</p>)}
    </main>
  )
}

export default SMHome