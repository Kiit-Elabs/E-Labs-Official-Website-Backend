import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Layout from "./layouts/Layout.jsx";
import AddEvent from "./pages/AddEvent.jsx";
import AddMember from "./pages/AddMember.jsx";
import User from "./pages/User.jsx";
import Home from "./pages/Home.jsx";
import AddPhotos from "./pages/AddPhotos.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="addmember" element={<AddMember />}></Route>
        <Route path="addevent" element={<AddEvent />}></Route>
        <Route path="addphotos" element={<AddPhotos />}></Route>
        <Route path="/user/:userId" element={<User />}></Route>
        <Route
          path="*"
          element={
            <div className="text-5xl font-bold text-textColor1 h-screen w-full justify-center items-center flex">
              Not Found
            </div>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
