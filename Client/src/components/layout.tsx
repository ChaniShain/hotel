import { Home } from './home';
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


export const Layout = () => {
    const location = useLocation();

  console.log(location.pathname)
    if (location.pathname !== '/' ) {
     
  console.log("location")
     
      return (
        
          <Outlet />
      );
    }
  
    return (
      <div >
        <Home/>
        <Outlet />
      </div>
    );

}