import SMHeader from './SMHeader'
import SMNav from './SMNav'
import SMMissing from './SMMissing'
import SMHome from './SMHome';
import SMNewPost from './SMNewPost'
import SMPostPage from './SMPostPage'
import SMAbout from './SMAbout'
import SMFooter from './SMFooter'
import { Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import SMPost from './SMPost';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';



function App() {
    const [posts, setPosts] = useState([
        {
            "id": 1,
            "title": "1st post",
            "datetime": "July 16, 2021 11:47:39 AM",
            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          },
          {
            "id": 2,
            "title": "Second post",
            "datetime": "July 16, 2021 11:47:48 AM",
            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. two"
          },
          {
            "id": 3,
            "title": "Number Three",
            "datetime": "July 16, 2021 11:48:01 AM",
            "body": "Third post... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          },
          {
            "id": 4,
            "title": "Testing a 4th post",
            "datetime": "August 09, 2021 4:44:22 PM",
            "body": "Some more testing words"
          }
    ]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const filteredResults = posts.filter((post) => 
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    },[posts, search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };        
        const allPosts = [...posts, newPost];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate("/");
    };
    const handleDelete= (id) => {
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
        navigate("/");
    };
    
    return (
        <div className="App">               
            <SMHeader title="Social media app" />
            <SMNav 
                search={search} setSearch={setSearch} 
            />
            <Routes>
                <Route path="/" element={<SMHome posts={searchResults} />} />
                <Route path="post">
                    <Route index element={<SMNewPost
                        handleSubmit={handleSubmit}
                        postTitle={postTitle}
                        setPostTitle={setPostTitle}
                        postBody={postBody}
                        setPostBody={setPostBody}
                    />} />
                    <Route path=":id" element={<SMPostPage posts={posts} handleDelete={handleDelete} />} />
                </Route>
                {/* <SMPostPage /> */}
                <Route path="about" element={<SMAbout /> } />
                <Route path="*" element={<SMMissing /> } />
            </Routes>            
            <SMFooter />
        </div>
    );
}

export default App;
