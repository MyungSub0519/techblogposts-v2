import './Loading.css'

export default function Loading({ 
  size = 'medium',
  fullScreen = false,
  text = '로딩 중...' 
}) {
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="loading-container">
          <div className={`loading-spinner loading-spinner-${size}`} />
          {text && <p className="loading-text">{text}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="loading-container">
      <div className={`loading-spinner loading-spinner-${size}`} />
      {text && <p className="loading-text">{text}</p>}
    </div>
  )
}