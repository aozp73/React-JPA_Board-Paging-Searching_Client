import React, {useState} from 'react';
import EmailInput from "../../components/user/joinform/EmailInput";
import PasswordInput from "../../components/user/joinform/PasswordInput";
import UsernameInput from "../../components/user/joinform/UsernameInput";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const JoinForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
        passwordConfirmation: '',
        username: ''
    });
    const [validCheck, setValidCheck] = useState({
        password: false,
        email: false,
        username: false
    });

    // Server 전송 (submitRequirements로 먼저 확인 -> 통신)
    const handleSave = (e) => {
        e.preventDefault();

        if (submitRequirements) {

            axios.post(`http://localhost:8080/api/join`, user)
                .then((res) => {
                    alert("회원가입 완료");
                    navigate('/loginForm');
                    console.log('회원가입 성공:', res.data);
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 400) {
                            console.error('400 Error:', error.response.data);
                            alert("입력 값을 확인해주세요.");
                        } else if (error.response.status === 500) {
                            console.error('500 Error:', error.response.data);
                            alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
                        }
                    } else {
                        // 서버에서 응답이 없거나 요청을 전송할 수 없는 경우
                        console.error('Error:', error.message);
                        alert("네트워크 오류가 발생했습니다.");
                    }
                });

        } else {
            alert("입력 값을 확인해주세요.")
        }
    };

    const submitRequirements = user.email &&
        user.password &&
        user.passwordConfirmation &&
        user.username &&
        validCheck.password &&
        validCheck.email &&
        validCheck.username;

    return (
        <div style={{ marginTop: '70px', marginBottom: '130px' }}>
            <div className="custom-join-container mb-5 mt-5">
                <div className="text-center" style={{ marginBottom: '35px' }}>
                    <h2>회원가입</h2>
                </div>
                <span></span>
                <form onSubmit={handleSave}>
                    <EmailInput user={user} setUser={setUser} validCheck={validCheck} setValidCheck={setValidCheck} />
                    <PasswordInput user={user} setUser={setUser} validCheck={validCheck} setValidCheck={setValidCheck}/>
                    <UsernameInput user={user} setUser={setUser} validCheck={validCheck} setValidCheck={setValidCheck}/>
                    <button className="btn btn-primary custom-join-btn">
                        등록하기
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JoinForm;