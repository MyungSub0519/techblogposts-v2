import { apiClient, delay } from '../utils/api'
import { mockPosts, generateMockPosts } from '../utils/mockData'

// 포스트 목록 조회
export async function getPosts({ cursor = '' }) {
  // 실제 API 요청
  // return await apiClient.get('/posts', {
  //   params: { cursor }
  // })

  // 임시 데이터 반환
  await delay(500) // API 호출 시뮬레이션
  
  const page = cursor ? parseInt(cursor) : 1
  const posts = page === 1 ? mockPosts : generateMockPosts(page)
  const hasMore = page < 5 // 5페이지까지만 데이터 제공
  
  return {
    posts,
    cursor: hasMore ? String(page + 1) : null,
  }
}

// 포스트 조회수 증가
export async function postViewCount({ id }) {
  // 실제 API 요청
  // return await apiClient.post('/posts/view-count', { id })

  // 임시 응답
  await delay(200)
  return { success: true }
}

// 포스트 검색
export async function searchPosts({ query }) {
  // 실제 API 요청
  // return await apiClient.get('/posts/search', {
  //   params: { query }
  // })

  // 임시 데이터 반환
  await delay(300)
  
  if (!query) {
    return { posts: [] }
  }
  
  const filteredPosts = mockPosts.filter((post) =>
    post._source.title.toLowerCase().includes(query.toLowerCase()) ||
    post._source.company.toLowerCase().includes(query.toLowerCase())
  )
  
  return { posts: filteredPosts }
}

// 북마크 추가
export async function addBookmark({ uid, parent }) {
  // 실제 API 요청
  // return await apiClient.put('/posts/bookmark', { uid, parent })

  // 임시 응답
  await delay(300)
  return { success: true }
}

// 북마크 삭제
export async function deleteBookmark({ uid, parent }) {
  // 실제 API 요청
  // return await apiClient.delete('/posts/bookmark', { 
  //   data: { uid, parent }
  // })

  // 임시 응답
  await delay(300)
  return { success: true }
}