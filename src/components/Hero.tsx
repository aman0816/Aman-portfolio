'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail, Upload, ExternalLink } from 'lucide-react';
import CVUpload from './CVUpload';

const Hero = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [hasCV, setHasCV] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const cvFile = localStorage.getItem('cvFile');
      setHasCV(cvFile !== null);
    }
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const checkCVExists = () => {
    return hasCV;
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blue-600 font-medium"
          >
 HEAD
            Hello, I am
=======
            Hello, I&apos;m
 31f5243 (Fix: escaped apostrophes and cleaned up code)
          </motion.p>

                     {/* Name */}
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             className="text-5xl md:text-7xl font-bold text-gray-900"
           >
             Aman Kant Ranjan
           </motion.h1>

           {/* Title */}
           <motion.h2
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="text-2xl md:text-4xl font-semibold text-gray-700"
           >
             Front End Developer
           </motion.h2>

                     {/* Description */}
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8 }}
             className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
           >
             I create beautiful and responsive web interfaces that provide exceptional user experiences. 
             Passionate about modern web technologies and turning design concepts into interactive, 
             user-friendly applications.
           </motion.p>

                     {/* CTA Buttons */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1 }}
             className="flex flex-col sm:flex-row gap-4 justify-center items-center"
           >
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={scrollToContact}
               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200"
             >
               <Mail size={20} />
               Get In Touch
             </motion.button>
             
                           <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.open('https://drive.google.com/file/d/19x8wtIONReTdBTfZrhH9JpdfYVa1NT_2/view?usp=sharing', '_blank');
                }}
                className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200"
              >
                <ExternalLink size={20} />
                View Resume
              </motion.button>
           </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={scrollToAbout}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              <ChevronDown size={24} />
            </motion.button>
                     </motion.div>
         </motion.div>
       </div>
       
       {/* CV Upload Modal */}
       {showUpload && <CVUpload />}
     </section>
   );
 };

export default Hero; 
