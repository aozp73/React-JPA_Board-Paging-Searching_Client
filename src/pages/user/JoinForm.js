import React, {useEffect, useMemo, useState} from 'react';

const JoinForm = () => {
    // 입력 값
    const [user, setUser] = useState({
        email: '',
        password: '',
        passwordConfirmation: '',
        username: ''
    });
    // 전송 전, 유효성 체크
    const [validCheck, setValidCheck] = useState({
        password: false,
        email: true,
    });
    console.log('컴포넌트가 렌더링되었습니다.');
    // 유효성 체크 안내
    const validRegexs = {
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/, // 6-12글자 + 숫자-영문자 모두 포함
        username: /^.{0,6}$/ // 최대 6글자
    }
    const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
    const [emailChecMessage, setEmailCheckMessage] = useState('');
    const [userCheckMessage, setUserCheckMessage] = useState('');

    // 입력 값 랜더링
    const changeValue = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // 유효성 체크 - 패스워드
    const validatePassword = () => {
        // 둘 다 비었을 경우
        if (user.password === '' || user.passwordConfirmation === '') {
            setPasswordCheckMessage('');
            setValidCheck({
                ...validCheck,
                password: false,
            });
            return;
        }

        // 패스워드 일치
        if (user.password === user.passwordConfirmation) {

            // 패스워드 일치 -> 정규표현식
            if (!validRegexs.password.test(user.password)) {
                setPasswordCheckMessage('영어, 숫자를 조합해주세요. (6-12자)');
                setValidCheck({
                    ...validCheck,
                    password: false,
                });
                return;
            }

            setPasswordCheckMessage('비밀번호 일치');
            setValidCheck({
                ...validCheck,
                password: true,
            });

        // 패스워드 불일치
        } else {
            setPasswordCheckMessage('비밀번호가 일치하지 않습니다.');
            setValidCheck({
                ...validCheck,
                password: false,
            });
        }
    };

    const passwordCheckStyle = {
        color: passwordCheckMessage === '비밀번호 일치' ? 'green' : 'orangered',
    };

    useMemo(() => {
        validatePassword();
    }, [user.password, user.passwordConfirmation]);

    // Server 전송 (submitRequirements로 확인 후, 통신 진행)
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
        validCheck.email;

    return (
        <div style={{ marginTop: '70px', marginBottom: '70px' }}>
            <div className="custom-join-container mb-5 mt-5">
                <div className="text-center" style={{ marginBottom: '35px' }}>
                    <h2>회원가입</h2>
                </div>
                <span></span>
                <form onSubmit={handleSave}>
                    <div className="mb-3">
                        <input type="email" name="email" value={user.email} onChange={changeValue}
                               className="form-control" placeholder="이메일" required />
                        <div id="emailError" className="mt-2 mb-3 ms-2" style={{ color: 'orangered' }}>
                        </div>
                    </div>
                    <div className="mb-3">
                        <input type="password" name="password" value={user.password} onChange={changeValue}
                               className="form-control" placeholder="비밀번호" required />
                        <div id="passwordError" className="mt-2 mb-3 ms-2" style={{ color: 'orangered' }}>
                        </div>
                    </div>
                    <div>
                        <input type="password" name="passwordConfirmation" value={user.passwordConfirmation} onChange={changeValue}
                               className="form-control" placeholder="비밀번호 확인" required />
                        <div id="passwordConfirmationError" className="mt-2 mb-3 ms-2" style={passwordCheckStyle}>
                            {passwordCheckMessage}
                        </div>
                    </div>
                    <div className="mb-5">
                        <input type="text" name="username" value={user.username} onChange={changeValue}
                               className="form-control" placeholder="아이디" required />
                        <div className="mt-2 mb-3 ms-2" style={{ color: 'orangered' }}>
                        </div>
                    </div>
                    <div className="mb-2">
                        <button className="btn btn-primary custom-join-btn">
                            등록하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinForm;