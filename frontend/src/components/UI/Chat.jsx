import { BsChatLeft } from "react-icons/bs";
import {
  closeNavBar,
  changeTitle,
} from "../../features/dashboard/dashboardSlice";
import { useDispatch } from "react-redux";
const Chat = ({ title, input }) => {
  const dispatch = useDispatch();
  const changeChat = (title) => {
    dispatch(changeTitle(title));
    dispatch(closeNavBar());
    input.current.value = "";
  };
  return (
    <li
      onClick={() => {
        changeChat(title);
      }}
    >
      <BsChatLeft size={20} />
      <h4>{title}</h4>
    </li>
  );
};

export default Chat;
