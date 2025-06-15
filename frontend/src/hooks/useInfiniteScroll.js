import { useEffect, useRef, useCallback } from 'react'

export function useInfiniteScroll({ 
  callback, 
  hasMore = true,
  threshold = 100,
  rootMargin = '50px'
}) {
  const observerRef = useRef(null)
  const targetRef = useRef(null)

  const handleIntersect = useCallback((entries) => {
    const [entry] = entries
    if (entry.isIntersecting && hasMore) {
      callback()
    }
  }, [callback, hasMore])

  useEffect(() => {
    const node = targetRef.current
    const options = {
      root: null,
      rootMargin,
      threshold: 0
    }

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(handleIntersect, options)

    if (node) {
      observerRef.current.observe(node)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleIntersect, rootMargin])

  return targetRef
}