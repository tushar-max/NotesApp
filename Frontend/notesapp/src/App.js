import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Editor from "./components/Editor";
import { ThemeProvider, createTheme } from "@mui/material";

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
