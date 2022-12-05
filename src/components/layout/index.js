import { LOGIN } from "lib/routes";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/auth";
import Navbar from "components/navbar";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {user, isLoading} = useAuth(); //Asynchrounous task will have a loading state

  useEffect(() => {
    if (pathname.startsWith("/protected") && !user) {    //redirects users to login if not logged in
      navigate(LOGIN);
    }
  }, [pathname, user, isLoading]);

  if (isLoading) return "Loading...";

  return (
    <>
    <Navbar />
    <Outlet />
    </>
  );
}
