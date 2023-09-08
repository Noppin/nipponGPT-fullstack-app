import { Navbar } from "./UI";
import { PageWrapper } from "../Assests/Wrappers/index";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <>
      <PageWrapper>
        <Navbar />
        <Outlet />
      </PageWrapper>
    </>
  );
};

export default Home;
