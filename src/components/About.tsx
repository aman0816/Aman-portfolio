'use client';

import { motion } from 'framer-motion';
import { User, Calendar, MapPin, Mail } from 'lucide-react';

const About = () => {
  const personalInfo = [
    { icon: Calendar, label: 'Age', value: '24 years' },
    { icon: MapPin, label: 'Location', value: 'Patna, Bihar' },
    { icon: Mail, label: 'Email', value: 'amankant1608@gmail.com' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get to know me better and understand my journey in technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <User size={120} className="text-white" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">5+</span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
                         <h3 className="text-2xl font-bold text-gray-900">
               Front End Developer
             </h3>
            
                         <p className="text-gray-600 leading-relaxed">
 HEAD
               I am a passionate front-end developer with over 5 years of experience in building 
=======
               I&apos;m a passionate front-end developer with over 5 years of experience in building 
 31f5243 (Fix: escaped apostrophes and cleaned up code)
               modern web applications and creating exceptional user interfaces. My journey in 
               technology started with curiosity and has evolved into a deep passion 
               for creating beautiful, responsive web experiences.
             </p>
             
             <p className="text-gray-600 leading-relaxed">
               I specialize in React, Angular, and Next.js for front-end development, 
               while also being proficient in modern CSS frameworks like Tailwind CSS and 
               state management solutions. I believe in writing clean, maintainable code and creating 
               user experiences that are both beautiful and functional.
             </p>

            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {personalInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <info.icon className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">{info.label}</p>
                    <p className="font-medium text-gray-900">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-600">
                  Strong problem-solving skills and attention to detail
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-600">
                  Experience with agile methodologies and team collaboration
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-600">
                  Continuous learning and staying updated with latest technologies
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-600">
                  Passion for creating user-centered design solutions
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 
