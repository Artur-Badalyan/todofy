// HEADERS

export const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

// API PATH

const API_PATH = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/`

export const apiEndpoints = {
    SIGNUP: `${API_PATH}signup`,
    LOGIN: `${API_PATH}login`,
    USER_PROFILE: `${API_PATH}userProfile`,
}

