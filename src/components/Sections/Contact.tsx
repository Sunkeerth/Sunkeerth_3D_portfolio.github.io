import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, MapPin, Phone, Send, Linkedin, Github, Code } from 'lucide-react'
import emailjs from '@emailjs/browser'
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
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState('')

  // Initialize EmailJS with your public key
  // You need to sign up at https://www.emailjs.com/ and get these credentials
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID' // Replace with your service ID
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID' // Replace with your template ID
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY' // Replace with your public key

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear any existing errors when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'sunkeerthaiml.bitm@gmail.com'
        },
        EMAILJS_PUBLIC_KEY
      )

      if (result.status === 200) {
        setIsSent(true)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        // Reset success message after 5 seconds
        setTimeout(() => setIsSent(false), 5000)
      }
    } catch (err) {
      console.error('Failed to send email:', err)
      setError('Failed to send message. Please try again or contact me directly at sunkeerthaiml.bitm@gmail.com')
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'sunkeerthaiml.bitm@gmail.com',
      href: 'mailto:sunkeerthaiml.bitm@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Ballari, Karnataka, India',
      href: '#'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91-9113838854',
      href: 'tel:+919113838854'
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
            {isSent && (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✅ Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
            
            {error && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ❌ {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                ></textarea>
              </div>
              
              <motion.button 
                type="submit" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send />
                  </>
                )}
              </motion.button>
            </form>

            {/* Alternative contact method */}
            <div className="direct-contact">
              <p>Prefer to email directly?</p>
              <a href="mailto:sunkeerthaiml.bitm@gmail.com" className="direct-email-link">
                sunkeerthaiml.bitm@gmail.com
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact