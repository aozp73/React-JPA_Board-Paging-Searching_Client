const initialState = {
    accessToken: null,
    userId: null,
    email: null,
    username: null,
    isAuthenticated: false
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                accessToken: action.payload.accessToken,
                userId: action.payload.userId,
                email: action.payload.email,
                username: action.payload.username,
                isAuthenticated: true
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};
