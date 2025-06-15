import { apiClient, delay } from '../utils/api'
import { mockBookmarks, mockPosts } from '../utils/mockData'

// 북마크 목록 조회
export async function getBookmarks({ uid }) {
  // 실제 API 요청
  // return await apiClient.get('/bookmarks', {
  //   params: { uid }
  // })

  // 임시 데이터 반환
  await delay(300)
  return {
    bookmarks: mockBookmarks,
  }
}

// 북마크한 포스트 목록 조회
export async function getBookmarkedPosts({ uid }) {
  // 실제 API 요청
  // return await apiClient.get('/bookmarks/posts', {
  //   params: { uid }
  // })

  // 임시 데이터 반환
  await delay(500)
  
  // 북마크된 포스트만 필터링
  const bookmarkedPostIds = mockBookmarks.map(b => b._source.parent)
  const bookmarkedPosts = mockPosts.filter(post => 
    bookmarkedPostIds.includes(post._source.id)
  )
  
  return {
    posts: bookmarkedPosts,
  }
}