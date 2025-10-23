// import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Heart, Linkedin, Github, Code, Mail } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/sunkeerth-ab14b3337/',
      label: 'LinkedIn'
    },
    {
      icon: Github,
      href: 'https://github.com/Sunkeerth',
      label: 'GitHub'
    },
    {
      icon: Code,
      href: 'https://leetcode.com/u/sunkeerth/',
      label: 'LeetCode'
    },
    {
      icon: Mail,
      href: 'mailto:sunkeerth@example.com',
      label: 'Email'
    }
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a href="#home" className="logo">
              <Code2 className="logo-icon" />
              <span>Sunkeerth</span>
            </a>
            <p>
              AI/ML & VR Developer passionate about creating intelligent systems 
              and immersive experiences that shape the future of technology.
            </p>
          </motion.div>

          <motion.div 
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="link-group">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h4>Technologies</h4>
              <ul>
                <li><a href="#projects">AI/ML</a></li>
                <li><a href="#projects">VR/XR</a></li>
                <li><a href="#projects">Embedded AI</a></li>
                <li><a href="#projects">Robotics</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h4>Connect</h4>
              <ul>
                <li><a href="https://www.linkedin.com/in/sunkeerth-ab14b3337/">LinkedIn</a></li>
                <li><a href="https://github.com/Sunkeerth">GitHub</a></li>
                <li><a href="https://leetcode.com/u/sunkeerth/">LeetCode</a></li>
                <li><a href="https://www.hackerrank.com/profile/sunkeerth123">HackerRank</a></li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="social-links">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="social-link"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon />
              </motion.a>
            ))}
          </div>

          <div className="copyright">
            <p>
              © {currentYear} Sunkeerth. All rights reserved. 
              Made with <Heart className="heart-icon" /> for the future of technology.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer