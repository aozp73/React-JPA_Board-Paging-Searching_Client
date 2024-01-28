import Header from "./components/Header";
import Footer from "./components/Footer";
import './styles/CustomStyles.css';
import { Container } from 'react-bootstrap';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./pages/user/LoginForm";
import JoinForm from "./pages/user/JoinForm";
import BoardDetail from "./pages/board/BoardDetail";
import BoardSaveForm from "./pages/board/BoardSaveForm";
import BoardUpdateForm from "./pages/board/BoardUpdateForm";
import BoardList from "./pages/board/BoardList";

function App() {
  return (
    <div>
        <Header />
        <Container>
            <Routes>
                <Route path="/" exact={true} element={<Home />} />
                <Route path="/loginForm" exact={true} element={<LoginForm />} />
                <Route path="/joinForm" exact={true} element={<JoinForm />} />

                <Route path="/board/list" exact={true} element={<BoardList />} />
                <Route path="/board/:boardId" exact={true} element={<BoardDetail />} />
                <Route path="/board/saveForm" exact={true} element={<BoardSaveForm />} />
                <Route path="/board/updateForm/:id" exact={true} element={<BoardUpdateForm />} />
            </Routes>
        </Container>
        <Footer />
    </div>
  );
}

export default App;
