import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material";
import Editor from "./components/Editor/Editor";
import Popup from "./components/Popup/Popup";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

function App() {
  return (
    // <ThemeProvider theme={darkTheme}>
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/editor" element={<Editor/>} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
