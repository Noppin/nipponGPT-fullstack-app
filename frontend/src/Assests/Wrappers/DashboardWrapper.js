import styled from "styled-components";

const Wrapper = styled.section`
  height: 100%;
  width: 100%;
  display: flex;

  .chat {
    padding: 10rem 3rem 5rem 3rem;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    gap: 3rem;

    &-feed {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      overflow-y: scroll;

      //hide scrollbar for chrome, safari and opera
      &::-webkit-scrollbar {
        display: none;
      }

      //hide scrollbar for firefox
      scrollbar-width: none;

      //hide scrollbar for ms edge
      -ms-overflow-style: none;
    }
  }

  .input-section {
    width: 100%;

    .input-container {
      position: relative;
      input {
        width: 100%;
        padding: 1rem;
        background-color: #555;
        border-radius: 10px;
        font-size: 2rem;
        color: #fff;
        resize: none;
      }
      .send-icon {
        position: absolute;
        bottom: 6px;
        right: 5px;
        cursor: pointer;
      }
    }
  }
  .sidebar {
    z-index: 999;
    transform: translateX(-100%);
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    transition: transform 0.3s linear,
      background 0.8s cubic-bezier(0.77, 0.5, 0.475, 1.2);
    &-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      background-color: #222;
      height: 100%;
      width: 60%;
      padding: 3rem 2rem;

      overflow-y: scroll;

      //hide scrollbar for chrome, safari and opera
      &::-webkit-scrollbar {
        display: none;
      }

      //hide scrollbar for firefox
      scrollbar-width: none;

      //hide scrollbar for ms edge
      -ms-overflow-style: none;

      ul {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        height: 100%;
        li {
          cursor: pointer;
          display: flex;
          gap: 1.6rem;
          padding: 1rem;
          &:hover {
            background-color: #333;
          }
        }
      }

      .logout-btn {
        justify-self: end;
      }
    }
    &-void {
      padding: 3rem 1rem;
      width: 40%;
    }
  }
  .sidebar-toggle {
    transform: translateX(0) !important;
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

export default Wrapper;
