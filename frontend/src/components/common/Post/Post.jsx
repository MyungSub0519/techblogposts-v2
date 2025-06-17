import { formatDistanceToNowStrict } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Eye } from 'lucide-react'
import { companyIcons } from '../../../utils/constants'
import './Post.css'

export default function Post({ 
  post, 
  onViewCountUpdate 
}) {
  const { id, title, company, publishDate, viewCount } = post._source

  const handleClick = () => {
    window.open(id, '_blank', 'noopener,noreferrer')
    onViewCountUpdate?.(id)
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
        </div>
      </div>
    </article>
  )
}