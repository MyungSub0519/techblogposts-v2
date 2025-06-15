import { useQuery } from '@tanstack/react-query'
import { getBlogs } from '../../api'
import { queryKeys, companyIcons } from '../../utils/constants'
import Loading from '../../components/common/Loading/Loading'
import Empty from '../../components/common/Empty/Empty'
import './Blogs.css'

export default function Blogs() {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.blogs,
    queryFn: getBlogs,
  })

  if (isLoading) {
    return (
      <div className="blogs-page">
        <div className="container">
          <Loading text="블로그 목록을 불러오는 중..." />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="blogs-page">
        <div className="container">
          <Empty
            title="오류가 발생했습니다"
            description="블로그 목록을 불러올 수 없습니다."
          />
        </div>
      </div>
    )
  }

  const blogs = data?.blogs || []

  return (
    <div className="blogs-page">
      <div className="container">
        <section className="blogs-section">
          <h1 className="blogs-title">
            현재 <span className="blogs-count">{blogs.length}개</span>의 
            기술 블로그를 구독중입니다 ✨
          </h1>

          {blogs.length > 0 && (
            <div className="blogs-grid">
              {blogs.map((blog) => {
                const { id, title } = blog._source
                const icon = companyIcons[title]

                return (
                  <a
                    key={blog._id}
                    href={id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-item"
                  >
                    <div className="blog-icon-wrapper">
                      {icon ? (
                        <img
                          src={`/company-icons/${icon}`}
                          alt={title}
                          className="blog-icon"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.parentElement.classList.add('blog-icon-fallback')
                          }}
                        />
                      ) : (
                        <div className="blog-icon-fallback">
                          {title.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="blog-name">{title}</span>
                  </a>
                )
              })}
            </div>
          )}
        </section>

        <section className="blogs-contact">
          <h3 className="contact-title">
            원하시는 기업의 기술 블로그가 목록에 없나요?
          </h3>
          <p className="contact-description">
            저에게 알려주세요. 추가하겠습니다. 🙌
          </p>
          <a
            href="mailto:jthcast@gmail.com"
            className="contact-button"
          >
            제보하기 📧
          </a>
        </section>
      </div>
    </div>
  )
}