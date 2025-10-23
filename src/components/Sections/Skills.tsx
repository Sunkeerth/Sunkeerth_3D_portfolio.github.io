// import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Brain, Glasses, Cpu } from 'lucide-react'
import './Skills.css'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skillCategories = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      skills: [
        { name: 'Deep Learning', level: 90 },
        { name: 'Computer Vision', level: 85 },
        { name: 'Natural Language Processing', level: 80 },
        { name: 'Reinforcement Learning', level: 75 }
      ]
    },
    {
      icon: Glasses,
      title: 'VR/XR Development',
      skills: [
        { name: 'Unity 3D', level: 85 },
        { name: 'AR Development', level: 80 },
        { name: '3D Modeling', level: 70 },
        { name: 'VR Interaction Design', level: 75 }
      ]
    },
    {
      icon: Cpu,
      title: 'Embedded AI & Programming',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'C/C++', level: 85 },
        { name: 'TensorFlow Lite', level: 80 },
        { name: 'IoT Systems', level: 75 }
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2>My Skills</h2>
          <p>Technical expertise across multiple domains</p>
        </div>

        <motion.div 
          className="skills-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={category.title}
              className="skill-category"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="category-header">
                <category.icon className="category-icon" />
                <h3>{category.title}</h3>
              </div>
              
              <div className="skills-list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div 
                        className="skill-progress"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills