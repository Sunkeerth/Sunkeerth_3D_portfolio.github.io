import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, MapPin, Phone, Send, Linkedin, Github, Code } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'sunkeerth@example.com',
      href: 'mailto:sunkeerth@example.com'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Your City, Country',
      href: '#'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 234 567 8900',
      href: 'tel:+12345678900'
    }
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sunkeerth-ab14b3337/',
      color: '#0A66C2'
    },
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/Sunkeerth',
      color: '#333'
    },
    {
      icon: Code,
      name: 'LeetCode',
      href: 'https://leetcode.com/u/sunkeerth/',
      color: '#FFA116'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2>Get In Touch</h2>
          <p>Let's collaborate on your next AI, VR or embedded project</p>
        </div>

        <motion.div 
          className="contact-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="contact-info" variants={itemVariants}>
            <h3>Let's talk about your project</h3>
            <p>
              I'm always interested in discussing new opportunities and innovative projects. 
              Whether it's AI, VR, or embedded systems, let's create something amazing together.
            </p>

            <div className="contact-details">
              {contactInfo.map((item) => (
                <a key={item.title} href={item.href} className="contact-item">
                  <div className="contact-icon">
                    <item.icon />
                  </div>
                  <div className="contact-text">
                    <h4>{item.title}</h4>
                    <span>{item.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="social-links">
              <h4>Follow me on</h4>
              <div className="social-icons">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="social-link"
                    style={{ '--social-color': social.color } as React.CSSProperties}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className="contact-form" variants={itemVariants}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <motion.button 
                type="submit" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
                <Send />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact