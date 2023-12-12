import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetatils";
import SelectUser from "./pages/SelectUser";
import CallPage from "./pages/CallPage";
import CreateUser from "./pages/CreateUser";
import { SocketProvider } from "./provider/SocketProvider";
import StoreProvider from "./provider/StoreProvider";
import PrivateRoute from "./routes/AuthRoute";
import { PeerProvider } from "./provider/PeerProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <SelectUser />,
      },
      {
        path: "user/:userId",
        element: <UserDetails />,
      },
      {
        path: "video-call",
        element: <CallPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-user",
    element: <CreateUser />,
  },
]);

function App() {
  return (
    <PeerProvider>
      <StoreProvider>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </StoreProvider>
    </PeerProvider>
  );
}

export default App;

// ss-rtc.uviom.com
// x7p68EFO[Vm)o6
