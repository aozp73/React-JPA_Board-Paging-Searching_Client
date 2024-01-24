import Header from "./components/Header";
import Footer from "./components/Footer";
import './styles/CustomStyles.css';
import { Container } from 'react-bootstrap';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./pages/user/LoginForm";
import JoinForm from "./pages/user/JoinForm";

function App() {
  return (
    <div>
        <Header />
        <Container>
            <Routes>
                <Route path="/" exact={true} element={<Home />} />
                <Route path="/loginForm" exact={true} element={<LoginForm />} />
                <Route path="/joinForm" exact={true} element={<JoinForm />} />
            </Routes>
        </Container>
        <Footer />
    </div>
  );
}

export default App;
