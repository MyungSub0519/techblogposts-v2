import axios from 'axios'

// Axios 인스턴스 생성
export const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
})

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 지연 시간을 위한 유틸리티 함수
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))