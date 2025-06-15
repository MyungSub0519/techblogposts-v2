// 라우트 경로
export const routes = {
  home: '/',
  blogs: '/blogs',
  bookmarks: '/bookmarks',
  mypage: '/mypage',
  termsService: '/terms/service',
  termsPrivacy: '/terms/privacy',
  notFound: '*',
}

// React Query 키
export const queryKeys = {
  auth: ['auth'],
  posts: (params) => ['posts', params],
  postsSearch: (query) => ['posts', 'search', query],
  blogs: ['blogs'],
  bookmarks: (uid) => ['bookmarks', uid],
  bookmarkedPosts: (uid) => ['bookmarks', 'posts', uid],
}

// 회사 아이콘 매핑
export const companyIcons = {
  네이버: 'naver.ico',
  카카오: 'kakao.ico',
  라인: 'line.ico',
  쿠팡: 'coupang.ico',
  토스: 'toss.ico',
  우아한형제들: 'woowahan.ico',
  데브시스터즈: 'devsisters.png',
  뱅크샐러드: 'banksalad.ico',
  쏘카: 'socar.png',
  컬리: 'kurly.png',
  요기요: 'yogiyo.png',
  // 더 많은 회사 아이콘 추가...
}

// 에러 코드
export const errorCodes = {
  UNAUTHORIZED: 401000,
  NOT_EXIST_ID_TOKEN: 400001,
}

// 기타 상수
export const ES_DELAY_TIME = 1500
export const POSTS_PER_PAGE = 10
export const DEBOUNCE_DELAY = 300