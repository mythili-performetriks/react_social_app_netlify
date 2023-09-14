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
import api from "./api/posts"
import SMEditPost from './SMEditPost';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';


function App() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    const {width} = useWindowSize();
    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');
    
    useEffect(() => {
        setPosts(data);
    }, [data]);
    useEffect(() => {
        const filteredResults = posts.filter((post) => 
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    },[posts, search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };   
        try {
            const response = await api.post('/posts', newPost);
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
            navigate("/");
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }     
        
    };
    const handleEdit = async (id) => {        
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try{
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map(post => post.id === id ? {...response.data} : post));
            setEditTitle('');
            setEditBody('');
            navigate("/");
        }catch(err){
            console.log(`Error: ${err.message}`);
        }
    };
    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const postsList = posts.filter(post => post.id !== id);
            setPosts(postsList);
            navigate("/");           
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }
    return (
        <div className="App">               
            <SMHeader title="Social media app" width={width} />
            <SMNav 
                search={search} setSearch={setSearch} 
            />
            <Routes>
                <Route path="/" 
                    element={<SMHome posts={searchResults} fetchError={fetchError} isLoading={isLoading} />} />
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
                <Route path="/edit/:id" 
                        element={<SMEditPost posts={posts} 
                                handleEdit={handleEdit} 
                                editBody={editBody} setEditBody={setEditBody} 
                                editTitle={editTitle} setEditTitle={setEditTitle} />} />
                {/* <SMPostPage /> */}
                <Route path="about" element={<SMAbout /> } />
                <Route path="*" element={<SMMissing /> } />
            </Routes>            
            <SMFooter />
        </div>
    );
}

export default App;
