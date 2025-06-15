import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Command } from 'cmdk'
import { Search } from 'lucide-react'
import { searchPosts, postViewCount, getAuth, getBookmarks } from '../../../api'
import { queryKeys } from '../../../utils/constants'
import { useDebounce } from '../../../hooks/useDebounce'
import Post from '../../common/Post/Post'
import Loading from '../../common/Loading/Loading'
import './SearchDialog.css'

export default function SearchDialog({ isOpen, onClose }) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

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

  // 검색 결과 조회
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.postsSearch(debouncedSearch),
    queryFn: () => searchPosts({ query: debouncedSearch }),
    enabled: !!debouncedSearch && isOpen,
  })

  // 조회수 증가
  const viewCountMutation = useMutation({
    mutationFn: postViewCount,
  })

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // 포스트 선택 핸들러
  const handlePostSelect = (post) => {
    window.open(post._source.id, '_blank', 'noopener,noreferrer')
    viewCountMutation.mutate({ id: post._source.id })
    onClose()
  }

  if (!isOpen) return null

  const searchResults = data?.posts || []

  return (
    <>
      <div className="search-overlay" onClick={onClose} />
      <div className="search-dialog">
        <Command className="search-command">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="검색어를 입력하세요..."
              className="search-input"
            />
          </div>

          <Command.List className="search-list">
            {isLoading && (
              <div className="search-loading">
                <Loading size="small" text="" />
              </div>
            )}

            {!isLoading && debouncedSearch && searchResults.length === 0 && (
              <Command.Empty className="search-empty">
                검색 결과가 없습니다
              </Command.Empty>
            )}

            {!isLoading && searchResults.length > 0 && (
              <Command.Group heading="검색 결과" className="search-group">
                {searchResults.map((post) => {
                  const isBookmarked = bookmarksData?.bookmarks.some(
                    bookmark => bookmark._source.parent === post._source.id
                  )

                  return (
                    <Command.Item
                      key={post._id}
                      value={post._source.title}
                      onSelect={() => handlePostSelect(post)}
                      className="search-item"
                    >
                      <Post
                        post={post}
                        isBookmarked={isBookmarked}
                        onBookmarkToggle={(e) => {
                          e?.stopPropagation()
                          // 북마크 기능은 여기서 구현
                        }}
                      />
                    </Command.Item>
                  )
                })}
              </Command.Group>
            )}
          </Command.List>
        </Command>
      </div>
    </>
  )
}