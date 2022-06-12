// import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PlayQuiz from "./pages/PlayQuiz";
import Leaderboard from "./pages/Leaderboard";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [authState, setAuthState] = useState({
    fname: "",
    username: "",
    status: false,
  });

  useEffect(() => {
    axios
      .get("https://project-vocabtime-nrn.herokuapp.com/auth/validate", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            fname: response.data.fname,
            username: response.data.username,
            status: true,
          });
        }
      });
  }, [authState.username]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/play-quiz" element={<PlayQuiz />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<PageNotFound />} />
            {/* <Route path="/dashboard/language/:id" element={<VocabCategories />} />
          <Route
            path="/dashboard/language/:id/category/:id/quiz"
            element={<VocabQuiz />}
          /> */}
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
