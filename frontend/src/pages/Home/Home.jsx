import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { getPosts, postViewCount } from '../../api'
import { queryKeys } from '../../utils/constants'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import Post from '../../components/common/Post/Post'
import { PostSkeletonList } from '../../components/common/Post/PostSkeleton'
import Loading from '../../components/common/Loading/Loading'
import Empty from '../../components/common/Empty/Empty'
import './Home.css'

export default function Home() {
  // 포스트 목록 조회 (무한 스크롤)
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: queryKeys.posts({}),
    queryFn: ({ pageParam = '' }) => getPosts({ cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.cursor,
  })

  // 조회수 증가
  const viewCountMutation = useMutation({
    mutationFn: postViewCount,
  })

  // 무한 스크롤 설정
  const loadMoreRef = useInfiniteScroll({
    callback: fetchNextPage,
    hasMore: hasNextPage,
  })

  if (isLoading) {
    return (
      <div className="home-page">
        <div className="container">
          <PostSkeletonList count={10} />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="home-page">
        <div className="container">
          <Empty
            title="오류가 발생했습니다"
            description="잠시 후 다시 시도해주세요."
          />
        </div>
      </div>
    )
  }

  const posts = data?.pages.flatMap(page => page.posts) || []

  if (posts.length === 0) {
    return (
      <div className="home-page">
        <div className="container">
          <Empty
            title="아직 포스트가 없습니다"
            description="곧 새로운 포스트가 업데이트될 예정입니다."
          />
        </div>
      </div>
    )
  }

  return (
    <div className="home-page">
      <div className="container">
        <div className="post-list">
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              onViewCountUpdate={(id) => viewCountMutation.mutate({ id })}
            />
          ))}
        </div>

        {/* 무한 스크롤 타겟 */}
        <div ref={loadMoreRef} className="load-more-trigger">
          {isFetchingNextPage && (
            <Loading size="small" text="더 불러오는 중..." />
          )}
        </div>
      </div>
    </div>
  )
}