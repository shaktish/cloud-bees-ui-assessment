import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import UserList from "./pages/user_list/user_list";
import MainLayout from "./pages/main_layout/Mainlayout";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import UserProfile from "./pages/user_profile/user_profile";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" Component={UserList} />
            <Route path="/user/:id" Component={UserProfile} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
