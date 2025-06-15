import './Post.css'

export default function PostSkeleton() {
  return (
    <div className="post-skeleton">
      <div className="post-skeleton-title" />
      <div className="post-skeleton-meta">
        <div className="post-skeleton-company" />
        <div className="post-skeleton-time" />
      </div>
    </div>
  )
}

export function PostSkeletonList({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </>
  )
}