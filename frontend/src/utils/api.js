import axios from 'axios'

// API 기본 설정
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'
const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1'

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 토큰이 있다면 헤더에 추가
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      // 인증 에러 처리
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// 지연 시간을 위한 유틸리티 함수
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))