import SMHeader from './SMHeader'
import SMNav from './SMNav'
import SMMissing from './SMMissing'
import SMHome from './SMHome';
import SMNewPost from './SMNewPost'
import SMPostPage from './SMPostPage'
import SMAbout from './SMAbout'
import SMFooter from './SMFooter'
import { Route, Routes } from 'react-router-dom';
import SMEditPost from './SMEditPost';
import { DataProvider } from './context/DataContext';

function App() {
    
    return (
        <div className="App">   
            <DataProvider>
                <SMHeader title="Social media app" />
                <SMNav />
                <Routes>
                    <Route path="/" 
                        element={<SMHome />} />
                    <Route path="post">
                        <Route index element={<SMNewPost />} />                    
                        <Route path=":id" element={<SMPostPage />} />
                    </Route>
                    <Route path="/edit/:id" 
                            element={<SMEditPost />} />
                    {/* <SMPostPage /> */}
                    <Route path="about" element={<SMAbout /> } />
                    <Route path="*" element={<SMMissing /> } />
                </Routes>            
                <SMFooter />
            </DataProvider>
        </div>
    );
}

export default App;
