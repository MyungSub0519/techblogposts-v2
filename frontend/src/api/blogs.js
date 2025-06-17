import { apiClient } from '../utils/api'

// 블로그 목록 조회
export async function getBlogs() {
  const response = await apiClient.get('https://api.techblogposts.com/search', {
    params: { 
      query: '',
      page: 1
    }
  })

  // 회사 정보를 중복 제거하여 블로그 목록 생성
  const blogs = response.data.items.reduce((acc, item) => {
    const company = item.company
    if (!acc.find(blog => blog._source.title === company)) {
      acc.push({
        _id: company,
        _source: {
          id: `https://${company.toLowerCase()}.com`,
          title: company,
          rssURL: `https://${company.toLowerCase()}.com/rss`,
          lastUpdated: new Date(item.publish_date).getTime(),
          dataType: 'blog',
          cron: true
        }
      })
    }
    return acc
  }, [])

  return { blogs }
}