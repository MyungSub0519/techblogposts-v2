// 임시 데이터
export const mockPosts = [
  {
    _id: '1',
    _source: {
      id: 'https://tech.kakao.com/2024/01/01/sample-post-1',
      title: 'React 18의 새로운 기능들: Concurrent Features deep dive',
      company: '카카오',
      publishDate: new Date('2024-01-01').getTime(),
      viewCount: 1523,
      dataType: 'post',
      isShow: true,
    },
  },
  {
    _id: '2',
    _source: {
      id: 'https://techblog.woowahan.com/2024/01/02/sample-post-2',
      title: 'MSA 환경에서의 분산 트랜잭션 처리 전략',
      company: '우아한형제들',
      publishDate: new Date('2024-01-02').getTime(),
      viewCount: 2341,
      dataType: 'post',
      isShow: true,
    },
  },
  {
    _id: '3',
    _source: {
      id: 'https://engineering.linecorp.com/ko/blog/sample-post-3',
      title: 'Kotlin Coroutines를 활용한 비동기 프로그래밍',
      company: '라인',
      publishDate: new Date('2024-01-03').getTime(),
      viewCount: 987,
      dataType: 'post',
      isShow: true,
    },
  },
  {
    _id: '4',
    _source: {
      id: 'https://medium.com/naver-place-dev/sample-post-4',
      title: 'Spring Boot 3.0 마이그레이션 경험기',
      company: '네이버',
      publishDate: new Date('2024-01-04').getTime(),
      viewCount: 3456,
      dataType: 'post',
      isShow: true,
    },
  },
  {
    _id: '5',
    _source: {
      id: 'https://blog.toss.im/article/sample-post-5',
      title: '토스에서 TypeScript를 활용하는 방법',
      company: '토스',
      publishDate: new Date('2024-01-05').getTime(),
      viewCount: 4521,
      dataType: 'post',
      isShow: true,
    },
  },
]

export const mockBlogs = [
  {
    _id: '1',
    _source: {
      id: 'https://tech.kakao.com',
      title: '카카오',
      rssURL: 'https://tech.kakao.com/feed',
      lastUpdated: new Date('2024-01-01').getTime(),
      dataType: 'blog',
      cron: true,
    },
  },
  {
    _id: '2',
    _source: {
      id: 'https://techblog.woowahan.com',
      title: '우아한형제들',
      rssURL: 'https://techblog.woowahan.com/feed',
      lastUpdated: new Date('2024-01-02').getTime(),
      dataType: 'blog',
      cron: true,
    },
  },
  {
    _id: '3',
    _source: {
      id: 'https://engineering.linecorp.com',
      title: '라인',
      rssURL: 'https://engineering.linecorp.com/ko/feed',
      lastUpdated: new Date('2024-01-03').getTime(),
      dataType: 'blog',
      cron: true,
    },
  },
  {
    _id: '4',
    _source: {
      id: 'https://d2.naver.com',
      title: '네이버',
      rssURL: 'https://d2.naver.com/rss',
      lastUpdated: new Date('2024-01-04').getTime(),
      dataType: 'blog',
      cron: true,
    },
  },
  {
    _id: '5',
    _source: {
      id: 'https://blog.toss.im',
      title: '토스',
      rssURL: 'https://blog.toss.im/feed',
      lastUpdated: new Date('2024-01-05').getTime(),
      dataType: 'blog',
      cron: true,
    },
  },
]

export const mockBookmarks = [
  {
    _id: '1',
    _source: {
      parent: 'https://tech.kakao.com/2024/01/01/sample-post-1',
      publishDate: new Date('2024-01-10').getTime(),
    },
  },
  {
    _id: '3',
    _source: {
      parent: 'https://engineering.linecorp.com/ko/blog/sample-post-3',
      publishDate: new Date('2024-01-11').getTime(),
    },
  },
]

export const mockUser = {
  uid: 'mock-user-123',
  email: 'user@example.com',
  creationTime: new Date('2023-01-01').toISOString(),
  providerId: 'google.com',
}

// 더 많은 포스트를 생성하는 함수 (무한 스크롤 테스트용)
export const generateMockPosts = (page = 1, limit = 10) => {
  const posts = []
  const startIndex = (page - 1) * limit
  
  for (let i = startIndex; i < startIndex + limit; i++) {
    posts.push({
      _id: `post-${i}`,
      _source: {
        id: `https://example.com/post-${i}`,
        title: `샘플 포스트 제목 ${i}: 최신 기술 트렌드와 개발 경험 공유`,
        company: ['카카오', '네이버', '라인', '쿠팡', '토스'][i % 5],
        publishDate: new Date(2024, 0, i + 1).getTime(),
        viewCount: Math.floor(Math.random() * 5000) + 100,
        dataType: 'post',
        isShow: true,
      },
    })
  }
  
  return posts
}