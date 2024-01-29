import axios from 'axios';
import {store} from "./store";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

/**
 * /api/authOptional
 * - Spring Security 인증 필요 path x
 * - 용도: 게시글 상세 페이지 (로그인 유저는 editable 변수에 수정,삭제 유무 제공)
 */

const apiOptional = axios.create({
    baseURL: 'http://localhost:8080/api/authOptional',
});

// 요청 인터셉터
apiOptional.interceptors.request.use(config => {
    const token = store.getState().auth.accessToken;
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 응답 인터셉터
apiOptional.interceptors.response.use(response => {
    // 200번대 응답
    return response;
},
    // 200번대 이외 응답
    async error => {
        console.log("인증 필요한 페이지 에러 응답 - Interceptor 진입")
        const originalRequest = error.config;

    if (error.response.data.status === 400 && error.response.data.msg === 'Token Exception: EXPIRED_TOKEN') {
        console.log("AccessToken 만료 - RefreshToken으로 재발급")

        try {
            const res = await axios.get('http://localhost:8080/api/refreshToken', { withCredentials: true });
            const {accessToken, userId, email, username} = res.data.data;

            // 스토어 업데이트
            store.dispatch({
                type: 'LOGIN',
                payload: { accessToken, userId, email, username }
            });

            // 실패한 요청 재시도
            originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
            return axios(originalRequest);

        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    } else {
        console.log("AccessToken 없거나, 유효 x - 비정상 조작 (로그아웃 처리)")

        const dispatch = useDispatch();
        const navigate = useNavigate();

        alert("비정상 접근입니다.");
        dispatch({type: 'LOGOUT'});
        navigate('/loginForm');
    }

    return Promise.reject(error);
});

export default apiOptional;
