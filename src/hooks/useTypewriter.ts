import { useState, useEffect } from 'react'

export const useTypewriter = (texts: string[], speed = 100, pauseTime = 2000) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = texts[currentIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText === current) {
          setTimeout(() => setIsDeleting(true), pauseTime)
        } else {
          setCurrentText(current.slice(0, currentText.length + 1))
        }
      } else {
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentIndex((currentIndex + 1) % texts.length)
        } else {
          setCurrentText(current.slice(0, currentText.length - 1))
        }
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts, speed, pauseTime])

  return currentText
}