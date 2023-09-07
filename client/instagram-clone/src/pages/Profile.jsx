import Layout from "../components/Layout";
import Profile from "../components/Profile";
import { Outlet, Link } from "react-router-dom";;
// import Layout from "./Layout";

const ProfilePage = () => {

  return (
    <Layout />,
    <Profile />,
    <Outlet/>
  )

}

export default ProfilePage