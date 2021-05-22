import React,{useState} from "react";
import SideBar from "./components/SideBar";
import Nav from "./components/Nav";
import { accessToken } from "./helpers/helperFunc";
import jwt_decode from "jwt-decode";

const NavSideBar = () => {
  let decoded: Record<string, unknown> = jwt_decode(accessToken);

  let names = decoded.name;
  let isAdminBool = decoded.isAdmin;

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const openSideBar = () => {
    setSideBarOpen(true);
  };
  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  return (
        <>
      <Nav name={names} openSideBar={openSideBar} />
      <SideBar
        isAdmin={isAdminBool}
        decoded={decoded}
        sideBarOpen={sideBarOpen}
        closeSideBar={closeSideBar}
      />
      </>
  );
};

export default NavSideBar;
