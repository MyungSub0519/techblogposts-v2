import { formatDistanceToNowStrict } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Eye, Star } from 'lucide-react'
import { companyIcons } from '../../../utils/constants'
import Button from '../Button/Button'
import './Post.css'

export default function Post({ 
  post, 
  isBookmarked = false, 
  onBookmarkToggle,
  onViewCountUpdate 
}) {
  const { id, title, company, publishDate, viewCount } = post._source

  const handleClick = () => {
    window.open(id, '_blank', 'noopener,noreferrer')
    onViewCountUpdate?.(id)
  }

  const handleBookmarkClick = (e) => {
    e.stopPropagation()
    onBookmarkToggle?.()
  }

  const companyIcon = companyIcons[company]

  return (
    <article className="post">
      <h3 className="post-title">
        <a 
          href={id} 
          onClick={(e) => {
            e.preventDefault()
            handleClick()
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      </h3>
      
      <div className="post-meta">
        <div className="post-meta-left">
          {companyIcon && (
            <img 
              src={`/company-icons/${companyIcon}`} 
              alt={company}
              className="post-company-icon"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          )}
          <span className="post-company">{company}</span>
        </div>
        
        <div className="post-meta-right">
          <time className="post-time" dateTime={new Date(publishDate).toISOString()}>
            {formatDistanceToNowStrict(new Date(publishDate), { 
              addSuffix: true,
              locale: ko 
            })}
          </time>
          
          <div className="post-view-count">
            <Eye size={14} />
            <span>{viewCount.toLocaleString()}</span>
          </div>
          
          {onBookmarkToggle && (
            <Button
              variant="ghost"
              size="icon"
              className="post-bookmark-button"
              onClick={handleBookmarkClick}
              aria-label={isBookmarked ? '북마크 제거' : '북마크 추가'}
            >
              <Star 
                size={16} 
                fill={isBookmarked ? 'var(--accent-primary)' : 'none'}
                color={isBookmarked ? 'var(--accent-primary)' : 'currentColor'}
              />
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}