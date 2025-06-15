import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPosts, postViewCount, addBookmark, deleteBookmark } from '../../api'
import { getAuth, getBookmarks } from '../../api'
import { queryKeys } from '../../utils/constants'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import Post from '../../components/common/Post/Post'
import { PostSkeletonList } from '../../components/common/Post/PostSkeleton'
import Loading from '../../components/common/Loading/Loading'
import Empty from '../../components/common/Empty/Empty'
import './Home.css'

export default function Home() {
  const queryClient = useQueryClient()
  
  // 사용자 정보 조회
  const { data: authData } = useQuery({
    queryKey: queryKeys.auth,
    queryFn: getAuth,
  })

  // 북마크 목록 조회
  const { data: bookmarksData } = useQuery({
    queryKey: queryKeys.bookmarks(authData?.user?.uid),
    queryFn: () => getBookmarks({ uid: authData.user.uid }),
    enabled: !!authData?.user?.uid,
  })

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

  // 북마크 추가
  const addBookmarkMutation = useMutation({
    mutationFn: addBookmark,
    onSuccess: () => {
      // 북마크 목록 다시 조회
      queryClient.invalidateQueries(queryKeys.bookmarks(authData?.user?.uid))
    },
  })

  // 북마크 삭제
  const deleteBookmarkMutation = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      // 북마크 목록 다시 조회
      queryClient.invalidateQueries(queryKeys.bookmarks(authData?.user?.uid))
    },
  })

  // 무한 스크롤 설정
  const loadMoreRef = useInfiniteScroll({
    callback: fetchNextPage,
    hasMore: hasNextPage,
  })

  // 북마크 토글
  const handleBookmarkToggle = (postId) => {
    if (!authData?.user?.uid) {
      alert('로그인이 필요합니다.')
      return
    }

    const isBookmarked = bookmarksData?.bookmarks.some(
      bookmark => bookmark._source.parent === postId
    )

    if (isBookmarked) {
      deleteBookmarkMutation.mutate({
        uid: authData.user.uid,
        parent: postId,
      })
    } else {
      addBookmarkMutation.mutate({
        uid: authData.user.uid,
        parent: postId,
      })
    }
  }

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
          {posts.map((post) => {
            const isBookmarked = bookmarksData?.bookmarks.some(
              bookmark => bookmark._source.parent === post._source.id
            )

            return (
              <Post
                key={post._id}
                post={post}
                isBookmarked={isBookmarked}
                onBookmarkToggle={() => handleBookmarkToggle(post._source.id)}
                onViewCountUpdate={(id) => viewCountMutation.mutate({ id })}
              />
            )
          })}
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