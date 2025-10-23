import React from 'react'
import { motion, type MotionProps } from 'framer-motion'

interface CardProps extends MotionProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  glass = false,
  ...motionProps 
}) => {
  const baseClasses = 'rounded-lg border border-opacity-10 transition-all duration-300'
  const glassClasses = glass ? 'glass' : 'bg-dark-light'
  const hoverClasses = hover ? 'hover:border-opacity-30 hover:shadow-lg' : ''

  return (
    <motion.div
      className={`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`}
      whileHover={hover ? { y: -5 } : {}}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

export default Card