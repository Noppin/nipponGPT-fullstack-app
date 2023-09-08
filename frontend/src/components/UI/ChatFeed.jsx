import { PiRobot } from "react-icons/pi";
import { RiUserSmileFill } from "react-icons/ri";
import styled from "styled-components";
const ChatFeed = ({ role, content }) => {
  return (
    <FeedWrapper className="user">
      <div className={role === "user" ? "feed user" : "feed"}>
        {role === "assistant" ? (
          <PiRobot size={40} />
        ) : (
          <RiUserSmileFill size={40} />
        )}
        <div
          className={
            role === "user" ? "message-box message-box-right" : "message-box"
          }
        >
          <h4>{content}</h4>
        </div>
      </div>
    </FeedWrapper>
  );
};

const FeedWrapper = styled.li`
  .feed {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    .message-box {
      background-color: #fff;
      color: #111;
      padding: 1rem;
      border-radius: 2rem 2rem 2rem 0rem;
      max-width: 60%;
    }
    .message-box-right {
      border-radius: 2rem 2rem 0rem 2rem !important;
    }
  }

  .user {
    flex-direction: row-reverse !important;
  }
`;
export default ChatFeed;
