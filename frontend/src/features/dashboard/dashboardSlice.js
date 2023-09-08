import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
const initialState = {
  isLoading: false,
  navBarIsOpened: false,
  isANewUser: true,
  message: null,
  prevChatFeed: [],
  currentTitle: null,
  context: [],
};

export const fetchMessage = createAsyncThunk(
  "dashboard/Message",
  async (input, thunkAPI) => {
    if (input) {
      const {
        dashboardSlice: { context, currentTitle },
      } = thunkAPI.getState();
      const options = {
        method: "POST",
        body: JSON.stringify({
          content: input,
          context,
          currentTitle,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        toast.loading("NipponGPT is thinking");
        const response = await fetch(
          `${import.meta.env.VITE_APP_URL}`,
          options
        );
        const { data } = await response.json();
        return data.choices[0].message;
      } catch (error) {
        toast.dismiss();
        toast.error("NipponGPT failed to understand");
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    } else {
      toast.error("Please Enter your message");
    }
  }
);

export const getUserData = createAsyncThunk(
  "dashboard/GetUserData",
  async (currentUser, thunkAPI) => {
    try {
      const userRef = doc(db, "users", currentUser);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().userId === currentUser) {
        return userSnap.data();
      } else {
        return thunkAPI.rejectWithValue("User not found");
      }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const storeUserData = createAsyncThunk(
  "dashboard/StoreUserData",
  async (currentUser, thunkAPI) => {
    try {
      const {
        dashboardSlice: { context, prevChatFeed },
      } = thunkAPI.getState();
      const userRef = doc(db, "users", currentUser);
      await setDoc(userRef, {
        context,
        prevChatFeed,
        userId: currentUser,
      });
      return { context, prevChatFeed, currentUser };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    openNavBar: (state) => {
      state.navBarIsOpened = true;
    },
    closeNavBar: (state) => {
      state.navBarIsOpened = false;
    },
    setCurrentTitle: (state, { payload }) => {
      state.currentTitle = payload;
    },
    setPrevChatFeed: (state, { payload }) => {
      state.prevChatFeed = [
        ...state.prevChatFeed,
        { title: state.currentTitle, role: "user", content: payload },
        {
          title: state.currentTitle,
          role: state.message.role,
          content: state.message.content,
        },
      ];
      state.context =
        state.prevChatFeed.map((feed) => {
          return { context: feed?.content, title: feed?.title };
        }) || null;
    },
    instantiateChat: (state) => {
      state.message = null;
      state.currentTitle = null;
    },
    changeTitle: (state, { payload }) => {
      state.currentTitle = payload;
    },
    clearData: (state) => {
      state.isLoading = false;
      state.navBarIsOpened = false;
      state.message = null;
      state.prevChatFeed = [];
      state.currentTitle = null;
      state.context = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessage.fulfilled, (state, { payload }) => {
        state.message = payload;
      })
      .addCase(fetchMessage.rejected, (state, payload) => {
        toast.error({ payload });
      })
      .addCase(storeUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(storeUserData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(storeUserData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isANewUser = true;
        if (payload) {
          state.isANewUser = false;
          state.context = payload.context;
          state.prevChatFeed = payload.prevChatFeed;
        }
      })
      .addCase(getUserData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  openNavBar,
  closeNavBar,
  setCurrentTitle,
  setPrevChatFeed,
  instantiateChat,
  changeTitle,
  clearData,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
