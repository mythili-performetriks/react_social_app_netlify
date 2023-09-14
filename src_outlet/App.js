import SMHeader from './SMHeader'
import SMNav from './SMNav'
import SMMissing from './SMMissing'
import SMHome from './SMHome';
import SMNewPost from './SMNewPost'
import SMPostPage from './SMPostPage'
import SMAbout from './SMAbout'
import SMFooter from './SMFooter'
import { Route, Routes, Link } from 'react-router-dom';
import SMPost from './SMPost';
import SMPostLayout from './SMPostLayout';

function App() {
  return (
    <div className="App">
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                {/* <li><Link to="/newpost">Newpost</Link></li> */}
                <li><Link to="/postpage">PostPage</Link></li>
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<SMHome />} />
            <Route path="/about" element={<SMAbout />} />
            <Route path="/newpost" element={<SMNewPost />} />
            <Route path="/postpage" element={<SMPostLayout />}>
                <Route index element={<SMPostPage />} />
                <Route path=":id" element={<SMPost />} />
                <Route path="newpost" element={<SMNewPost />} />
            </Route>
            <Route path="*" element={<SMMissing />} />
        </Routes>
        {/* <SMHeader />
        <SMNav />
        <SMHome />
        <SMNewPost />
        <SMPostPage />
        <SMAbout />
        <SMMissing />
        <SMFooter /> */}
    </div>
  );
}

export default App;
