import { useQuery, useMutation } from '@tanstack/react-query'
import { getAuth, getBookmarkedPosts, deleteBookmark, postViewCount } from '../../api'
import { queryKeys } from '../../utils/constants'
import Post from '../../components/common/Post/Post'
import Loading from '../../components/common/Loading/Loading'
import Empty from '../../components/common/Empty/Empty'
import Button from '../../components/common/Button/Button'
import { useNavigate } from 'react-router-dom'
import './Bookmarks.css'

export default function Bookmarks() {
  const navigate = useNavigate()

  // 사용자 정보 조회
  const { data: authData } = useQuery({
    queryKey: queryKeys.auth,
    queryFn: getAuth,
  })

  // 북마크한 포스트 목록 조회
  const { 
    data, 
    isLoading, 
    isError,
    refetch 
  } = useQuery({
    queryKey: queryKeys.bookmarkedPosts(authData?.user?.uid),
    queryFn: () => getBookmarkedPosts({ uid: authData.user.uid }),
    enabled: !!authData?.user?.uid,
  })

  // 조회수 증가
  const viewCountMutation = useMutation({
    mutationFn: postViewCount,
  })

  // 북마크 삭제
  const deleteBookmarkMutation = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      // 북마크 목록 다시 조회
      refetch()
    },
  })

  // 북마크 삭제 핸들러
  const handleBookmarkRemove = (postId) => {
    if (!authData?.user?.uid) return

    deleteBookmarkMutation.mutate({
      uid: authData.user.uid,
      parent: postId,
    })
  }

  // 로그인하지 않은 경우
  if (!authData?.isAuthenticated) {
    return (
      <div className="bookmarks-page">
        <div className="container">
          <Empty
            title="로그인이 필요합니다"
            description="북마크 기능을 사용하려면 로그인해주세요."
            action={
              <Button onClick={() => navigate('/')}>
                로그인하러 가기
              </Button>
            }
          />
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="bookmarks-page">
        <div className="container">
          <h1 className="bookmarks-title">즐겨찾기</h1>
          <Loading text="북마크 목록을 불러오는 중..." />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bookmarks-page">
        <div className="container">
          <h1 className="bookmarks-title">즐겨찾기</h1>
          <Empty
            title="오류가 발생했습니다"
            description="북마크 목록을 불러올 수 없습니다."
          />
        </div>
      </div>
    )
  }

  const posts = data?.posts || []

  return (
    <div className="bookmarks-page">
      <div className="container">
        <h1 className="bookmarks-title">즐겨찾기</h1>
        
        {posts.length === 0 ? (
          <Empty
            title="북마크한 포스트가 없습니다"
            description="관심 있는 포스트를 북마크해보세요."
            action={
              <Button onClick={() => navigate('/')}>
                포스트 둘러보기
              </Button>
            }
          />
        ) : (
          <div className="bookmarks-list">
            {posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                isBookmarked={true}
                onBookmarkToggle={() => handleBookmarkRemove(post._source.id)}
                onViewCountUpdate={(id) => viewCountMutation.mutate({ id })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}