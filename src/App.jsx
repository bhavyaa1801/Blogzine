import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { useDispatch } from "react-redux";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";


function App() {
 // loading cause data aane mai tem lgegea

 const [loading,setLoading]=useState(true)
 const dispatch = useDispatch()
 useEffect(()=> {
  authService.getCurrentUser()
  .then( (userData) => {
    if(userData){
      dispatch(login({userData}))
    }
    else {
      dispatch(logout())
    }
  })
  .finally( ()=> setLoading(false))
 }, []);

  return !loading ? (
  <div className='min-h-screen flex flex-col bg-[#F5F5DD]'>
    
    <Header />

    {/* LIGHT MIDDLE AREA */}
    <main className='flex-grow py-10'>
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-[#FFF9EE] rounded-2xl p-6 shadow-sm">
          <Outlet />
        </div>
      </div>
    </main>

    <Footer />

  </div>
) : null

}

export default App
