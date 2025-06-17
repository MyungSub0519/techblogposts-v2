import { apiClient } from '../utils/api'

// 포스트 목록 조회
export async function getPosts({ cursor = '' }) {
  const page = cursor ? parseInt(cursor) : 1
  const response = await apiClient.get('http://api.techblogposts.com/search', {
    params: { 
      query: '',
      page 
    }
  })
  
  return {
    posts: response.data.items.map(item => ({
      _id: item.url,
      _source: {
        id: item.url,
        title: item.title.trim(),
        company: item.company,
        publishDate: item.publish_date,
        viewCount: item.view_count
      }
    })),
    cursor: response.data.items.length > 0 ? String(page + 1) : null,
  }
}

// 포스트 조회수 증가
export async function postViewCount({ id }) {
  const response = await apiClient.post('http://api.techblogposts.com/posts/view-count', { id })
  return response.data
}

// 포스트 검색
export async function searchPosts({ query }) {
  const response = await apiClient.get('http://api.techblogposts.com/search', {
    params: { 
      query,
      page: 1
    }
  })
  
  return { 
    posts: response.data.items.map(item => ({
      _id: item.url,
      _source: {
        id: item.url,
        title: item.title.trim(),
        company: item.company,
        publishDate: item.publish_date,
        viewCount: item.view_count
      }
    }))
  }
}