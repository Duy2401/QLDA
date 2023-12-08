import authReducer from "./authSlice";
import userReducer from "./userSlice";
import DepartmentReducer from "./departmentSlice";
import projectReducer from "./projectSlice";
import taskReducer from "./taskSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["auth"],
};
const authConfig = {
  key: "auth",
  storage,
  whitelist: ["login"],
};
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  users: userReducer,
  department: DepartmentReducer,
  project: projectReducer,
  task: taskReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
