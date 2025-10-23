import React from 'react'
import { motion, type MotionProps } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface ButtonProps extends MotionProps {
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ...motionProps
}) => {
  const baseClasses = 'btn inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300'
  
  const variantClasses = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    glass: 'btn-glass'
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        {...motionProps}
      >
        {children}
        {Icon && <Icon size={20} />}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      {...motionProps}
    >
      {children}
      {Icon && <Icon size={20} />}
    </motion.button>
  )
}

export default Button