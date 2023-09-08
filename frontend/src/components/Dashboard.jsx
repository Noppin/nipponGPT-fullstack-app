import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Loading from "../Assests/Animations/Loading.json";
import { useAuth } from "./context/AuthContext";
import { DashboardWrapper } from "../Assests/Wrappers";

import { RxCross2 } from "react-icons/rx";
import Chat from "./UI/Chat";
import ChatFeed from "./UI/ChatFeed";
import { IoMdSend } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
  closeNavBar,
  fetchMessage,
  setCurrentTitle,
  setPrevChatFeed,
  instantiateChat,
  storeUserData,
  getUserData,
  clearData,
} from "../features/dashboard/dashboardSlice";
import { toast } from "react-toastify";
const Dashboard = () => {
  const {
    navBarIsOpened,
    message,
    currentTitle,
    prevChatFeed,
    isLoading,
    isANewUser,
  } = useSelector((store) => store.dashboardSlice);
  const { signout, currentUser } = useAuth();
  const dispatch = useDispatch();
  const [input, setInput] = useState(null);
  const currentChat = prevChatFeed.filter(
    (chat) => chat.title === currentTitle
  );
  const existingTitles = Array.from(
    new Set(prevChatFeed.map((chatFeed) => chatFeed.title))
  );

  const createNewChat = () => {
    dispatch(instantiateChat());
    dispatch(closeNavBar());
    setInput("");
  };

  const handleLogout = async () => {
    try {
      await dispatch(storeUserData(currentUser)).unwrap();
      signout();
      dispatch(clearData());
    } catch (error) {
      console.log("Failed to store user data:", error);
    }
  };
  useEffect(() => {
    if (currentUser) {
      dispatch(getUserData(currentUser)).then((returnedAction) => {
        if (getUserData.fulfilled.match(returnedAction)) {
          console.log("user logged in");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!currentTitle && input && message) {
      dispatch(setCurrentTitle(input));
      toast.dismiss();
    }
    if (currentTitle && input && message) {
      dispatch(setPrevChatFeed(input));
      toast.dismiss();
    }
    setInput("");
  }, [message, currentTitle]);

  if (isLoading) {
    return (
      <>
        <Lottie animationData={Loading} />
        <h2>Loading</h2>
      </>
    );
  }

  return (
    <DashboardWrapper>
      <section
        className={navBarIsOpened ? `sidebar sidebar-toggle` : "sidebar"}
      >
        <div className="sidebar-content">
          <button className="btn" onClick={createNewChat}>
            + New chat
          </button>
          <ul className="history">
            {existingTitles.map((title, index) => {
              return <Chat key={index} title={title} input={input} />;
            })}
          </ul>
          <button className="btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div
          className="sidebar-void"
          onClick={() => {
            dispatch(closeNavBar());
          }}
        >
          <RxCross2
            size={30}
            className="icon"
            onClick={() => {
              dispatch(closeNavBar());
            }}
          />
        </div>
      </section>

      <section className="chat">
        <ul className="chat-feed">
          {currentChat.map((feed, index) => {
            return <ChatFeed key={index} {...feed} />;
          })}
        </ul>
        <div className="input-section">
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <IoMdSend
              size={30}
              className="send-icon"
              onClick={() => {
                dispatch(fetchMessage(input));
              }}
            />
          </div>
          <p className="info"></p>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Dashboard;
