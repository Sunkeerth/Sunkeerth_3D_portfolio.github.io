import { useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return { ref, controls }
}