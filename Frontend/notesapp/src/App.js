import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Shared from "./components/Shared/Shared";
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
          <Route exact path="/shared" element={<Shared/>} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
