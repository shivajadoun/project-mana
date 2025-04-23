import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import './App.css';
import Navbar from './pages/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import IssueDetails from './pages/IssueDetails/IssueDetails';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import Subscription from './pages/Subscription/Subscription'; // fixed import
import Auth from './pages/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './Redux/Auth/Action';
import { fetchProjects } from './Redux/project/action';


function App() {
  const dispatch=useDispatch();
  const {auth} = useSelector(state => state);
    useEffect(()=>{dispatch(getUser())
      dispatch(fetchProjects({}))
    },[auth.jwt])

  return (
    <>{
 auth.user?<div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails />} />
            <Route path="/upgrade_plan" element={<Subscription />} />
          </Routes>
       
     </div>:<Auth/>
    }

    </>
  );
}

export default App;
