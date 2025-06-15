import { forwardRef } from 'react'
import clsx from 'clsx'
import './Button.css'

const Button = forwardRef(({ 
  children,
  className,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  ...props
}, ref) => {
  const buttonClass = clsx(
    'button',
    `button-${variant}`,
    `button-${size}`,
    {
      'button-loading': loading,
      'button-full-width': fullWidth,
    },
    className
  )

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className="button-spinner" />
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button