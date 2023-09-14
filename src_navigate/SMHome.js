import React from 'react'
import SMFeed from './SMFeed'

const SMHome = ({posts}) => {
  return (
    <main className="Home">
        {posts.length ? (
            <SMFeed posts={posts} />
        ) : (
            <p style={{marginTop: "2rem"}}>
                No posts to dusplay.
            </p>
        )}
        <h1>Home</h1>
    </main>
  )
}

export default SMHome