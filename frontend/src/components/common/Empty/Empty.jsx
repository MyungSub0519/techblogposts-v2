import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import emptyAnimation from '../../../assets/lotties/empty.json'
import './Empty.css'

export default function Empty({ 
  title = '데이터가 없습니다',
  description = '',
  action 
}) {
  const animationContainer = useRef(null)

  useEffect(() => {
    if (animationContainer.current) {
      const animation = lottie.loadAnimation({
        container: animationContainer.current,
        animationData: emptyAnimation,
        renderer: 'svg',
        loop: true,
        autoplay: true,
      })

      return () => {
        animation.destroy()
      }
    }
  }, [])

  return (
    <div className="empty">
      <div className="empty-animation" ref={animationContainer} />
      <h3 className="empty-title">{title}</h3>
      {description && (
        <p className="empty-description">{description}</p>
      )}
      {action && (
        <div className="empty-action">{action}</div>
      )}
    </div>
  )
}