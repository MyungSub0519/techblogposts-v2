import { Link } from 'react-router-dom'
import Button from '../../components/common/Button/Button'
import { routes } from '../../utils/constants'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <p className="not-found-description">
            죄송합니다 😥 해당 페이지가 더는 존재하지 않거나 옮겨진 것 같습니다.
          </p>
          <Link to={routes.home}>
            <Button>시작 페이지로 가기</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}