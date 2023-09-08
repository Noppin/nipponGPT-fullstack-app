import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch} from "react-redux";
import { openNavBar } from "../../features/dashboard/dashboardSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <FaBars
        size={30}
        className="icon"
        onClick={() => {
          dispatch(openNavBar());
        }}
      />
      <h2>
        <Link to="/">NipponGPT</Link>
      </h2>
      <CgProfile size={30} className="icon" />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3rem;
  position: fixed;
  top: 0;
  overflow: hidden;
`;
export default Navbar;
