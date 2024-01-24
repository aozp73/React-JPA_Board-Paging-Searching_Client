import React, {useState} from 'react';
import EmailInput from "../../components/user/joinform/EmailInput";
import PasswordInput from "../../components/user/joinform/PasswordInput";
import UsernameInput from "../../components/user/joinform/UsernameInput";

const JoinForm = () => {

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
            console.log("모든 입력 값 Valid 통과")
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