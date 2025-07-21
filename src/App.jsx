import { useEffect, useState } from "react";
import conf from "./conf/conf.js";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/auth.js";
import { logIn, logOut } from "./store/authSlice.js";
import { Header, Footer } from "./components/index.js";
import { Outlet } from "react-router";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(logIn({ userData: userdata }));  //in store there userData is there not userdata
          console.log(userdata)
        } else {
          dispatch(logOut());
          //if userdata is notfound(null) then we will update the state(for
          //safe side) that is user is logged out
          //so that our store always remains updated
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        {/* <h1 className="text-black border">A Blog App with Appwrite </h1> */}
        <div className="w-full block">
          <Header />
          {/* define outlet here */}
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
