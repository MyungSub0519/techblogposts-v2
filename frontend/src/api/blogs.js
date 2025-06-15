import { apiClient, delay } from '../utils/api'
import { mockBlogs } from '../utils/mockData'

// 블로그 목록 조회
export async function getBlogs() {
  // 실제 API 요청
  // return await apiClient.get('/blogs')

  // 임시 데이터 반환
  await delay(500)
  
  // 더 많은 블로그 데이터 생성
  const additionalBlogs = [
    {
      _id: '6',
      _source: {
        id: 'https://tech.devsisters.com',
        title: '데브시스터즈',
        rssURL: 'https://tech.devsisters.com/rss',
        lastUpdated: new Date('2024-01-06').getTime(),
        dataType: 'blog',
        cron: true,
      },
    },
    {
      _id: '7',
      _source: {
        id: 'https://blog.banksalad.com',
        title: '뱅크샐러드',
        rssURL: 'https://blog.banksalad.com/rss',
        lastUpdated: new Date('2024-01-07').getTime(),
        dataType: 'blog',
        cron: true,
      },
    },
    {
      _id: '8',
      _source: {
        id: 'https://tech.socarcorp.kr',
        title: '쏘카',
        rssURL: 'https://tech.socarcorp.kr/rss',
        lastUpdated: new Date('2024-01-08').getTime(),
        dataType: 'blog',
        cron: true,
      },
    },
    {
      _id: '9',
      _source: {
        id: 'https://helloworld.kurly.com',
        title: '컬리',
        rssURL: 'https://helloworld.kurly.com/feed',
        lastUpdated: new Date('2024-01-09').getTime(),
        dataType: 'blog',
        cron: true,
      },
    },
    {
      _id: '10',
      _source: {
        id: 'https://techblog.yogiyo.co.kr',
        title: '요기요',
        rssURL: 'https://techblog.yogiyo.co.kr/feed',
        lastUpdated: new Date('2024-01-10').getTime(),
        dataType: 'blog',
        cron: true,
      },
    },
  ]
  
  return {
    blogs: [...mockBlogs, ...additionalBlogs],
  }
}