import { Link, useLocation } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'
import { useState } from 'react'
import Button from '../Button/Button'
import SearchDialog from '../../features/search/SearchDialog'
import { routes } from '../../../utils/constants'
import './Header.css'

export default function Header() {
  const location = useLocation()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <Link to={routes.home} className="header-logo">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 512 512" 
                fill="currentColor"
              >
                <path fill="var(--accent-secondary)" d="M32 96V32h96v64H32zM384 96V32h96v64h-96z" />
                <path fill="var(--accent-primary)" d="M32 279V130h95.893v154c0 55.228 44.772 100 100 100h56.713c55.229 0 100-44.772 100-100V130H480v149c0 110.457-89.543 200-200 200h-48c-110.457 0-200-89.543-200-200z" />
              </svg>
              <span className="header-title">TechBlogPosts</span>
            </Link>
          </div>

          <nav className="header-nav">
            <Link 
              to={routes.home} 
              className={`header-nav-link ${location.pathname === routes.home ? 'active' : ''}`}
            >
              포스트
            </Link>
            <Link 
              to={routes.blogs} 
              className={`header-nav-link ${location.pathname === routes.blogs ? 'active' : ''}`}
            >
              블로그
            </Link>
          </nav>

          <div className="header-right">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              aria-label="검색"
            >
              <Search size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(true)}
              aria-label="메뉴"
              className="header-menu-button"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </header>

      <SearchDialog 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  )
}