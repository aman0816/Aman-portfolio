'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail, Upload, Github, Linkedin, Twitter, Instagram, Phone, MapPin, Send, X, CheckCircle, FileText, ExternalLink } from 'lucide-react';

export default function Home() {
  const [showUpload, setShowUpload] = useState(false);
  const [hasCV, setHasCV] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const cvFile = localStorage.getItem('cvFile');
      setHasCV(cvFile !== null);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCVDownload = async () => {
    if (typeof window !== 'undefined') {
      const cvFile = localStorage.getItem('cvFile');
      if (cvFile) {
        const fileInfo = JSON.parse(cvFile);
        if (fileInfo.data) {
          const base64Response = await fetch(fileInfo.data);
          const blob = await base64Response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileInfo.name || 'Aman_Kant_Ranjan_CV.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const CVUploadModal = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [error, setError] = useState('');

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (file.type !== 'application/pdf') {
          setError('Please select a PDF file');
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          setError('File size should be less than 5MB');
          return;
        }
        setSelectedFile(file);
        setError('');
      }
    };

    const handleUpload = async () => {
      if (!selectedFile) return;
      setUploading(true);
      setError('');

      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (typeof window !== 'undefined') {
          const reader = new FileReader();
          reader.onload = () => {
            const base64Data = reader.result as string;
            localStorage.setItem('cvFile', JSON.stringify({
              name: selectedFile.name,
              size: selectedFile.size,
              lastModified: selectedFile.lastModified,
              data: base64Data
            }));
          };
          reader.readAsDataURL(selectedFile);
        }
        
        setUploaded(true);
        setSelectedFile(null);
        setHasCV(true);
      } catch (err) {
        setError('Upload failed. Please try again.');
      } finally {
        setUploading(false);
      }
    };

    const removeFile = () => {
      setSelectedFile(null);
      setError('');
    };

    const resetUpload = () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cvFile');
      }
      setUploaded(false);
      setHasCV(false);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => setShowUpload(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upload CV</h2>
            <button
              onClick={() => setShowUpload(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {!uploaded ? (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select PDF File (Max 5MB)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {selectedFile && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="text-blue-600" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={removeFile}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Upload CV
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="text-center">
              <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">CV Uploaded Successfully!</h3>
              <p className="text-gray-600 mb-6">Your CV is now ready for download.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpload(false)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={resetUpload}
                  className="flex-1 border border-gray-300 hover:border-red-300 text-gray-700 hover:text-red-600 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Remove CV
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => scrollToSection('#home')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Aman Kant Ranjan
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Frontend Developer & Data Analyst</p>
              </div>
            </motion.div>

            <nav className="hidden md:block">
              <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-gray-100">
                {['Home', 'About', 'Skills', 'Education', 'Projects', 'Contact'].map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                    className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group"
                  >
                    <span className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300">
                      {item}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-4 transition-all duration-300"
                      initial={false}
                    />
                  </motion.button>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-xl bg-white/80 backdrop-blur-md shadow-lg border border-gray-100"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <div className="w-5 h-0.5 bg-gray-700 rounded-full"></div>
                <div className="w-5 h-0.5 bg-gray-700 rounded-full"></div>
                <div className="w-5 h-0.5 bg-gray-700 rounded-full"></div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-blue-600 font-medium"
            >
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-gray-900"
            >
              Aman Kant Ranjan
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-2xl md:text-4xl font-semibold text-gray-700"
            >
              Frontend Developer & Data Analyst
            </motion.h2>

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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Mail size={20} />
                Get In Touch
              </motion.button>

                             <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => window.open('https://drive.google.com/file/d/19x8wtIONReTdBTfZrhH9JpdfYVa1NT_2/view?usp=sharing', '_blank')}
                 className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200"
               >
                 <ExternalLink size={20} />
                 View Resume
               </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="pt-8"
            >
              <motion.button
                whileHover={{ y: 5 }}
                onClick={() => scrollToSection('#about')}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <ChevronDown size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get to know me better and understand my journey in technology
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-2xl mx-auto"
                >
                  <span className="text-white text-6xl">👨‍💻</span>
                </motion.div>

              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frontend Developer & Data Analyst</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                I am a passionate technology enthusiast skilled in both Frontend Development and Data Analytics. As a Frontend Developer, I specialize in creating responsive and interactive web applications using HTML, CSS, JavaScript, and modern frameworks like Next.js. I enjoy building user-friendly interfaces that deliver a seamless experience.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                In addition, I am a Data Analyst with expertise in Excel, SQL, Power BI, and Python for data cleaning, visualization, and advanced analytics. I love uncovering patterns, building dashboards, and transforming raw data into meaningful business insights that support decision-making.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: '📅', label: 'Age', value: '24 years' },
                  { icon: '📍', label: 'Location', value: 'Patna, Bihar' },
                  { icon: '📧', label: 'Email', value: 'amankant1608@gmail.com' }
                ].map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-white/20 transition-colors duration-200"
                  >
                    <span className="text-blue-600 text-xl">{info.icon}</span>
                    <div>
                      <p className="text-sm text-gray-500">{info.label}</p>
                      <p className="font-medium text-gray-900">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Technologies and tools I work with
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'HTML/CSS', level: 95, color: 'from-orange-400 to-orange-600' },
              { name: 'JavaScript', level: 92, color: 'from-yellow-400 to-yellow-600' },
              { name: 'Next.js', level: 88, color: 'from-gray-400 to-gray-600' },
              { name: 'Tailwind CSS', level: 90, color: 'from-cyan-400 to-cyan-600' },
              { name: 'Excel', level: 90, color: 'from-green-400 to-green-600' },
              { name: 'SQL', level: 85, color: 'from-blue-500 to-blue-700' },
              { name: 'Power BI', level: 88, color: 'from-purple-400 to-purple-600' },
              { name: 'Python', level: 82, color: 'from-blue-600 to-blue-800' }
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-200 backdrop-blur-sm bg-white/10 border border-white/20"
              >
                <div className="mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <span className="text-white font-bold text-lg">{skill.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className={`h-2 bg-gradient-to-r ${skill.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Education</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              My academic journey and achievements
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                             {
                 degree: 'B.Tech in Computer Science',
                 university: 'DIT UNIVERSITY',
                 duration: '2020 – 2024',
                 cgpa: '8.26/10',
                 achievements: [
                   'First Class with Distinction',
                   'Completed 4 years of Computer Science Engineering',
                   'Specialized in Software Development and Web Technologies'
                 ],
                 icon: '🎓'
               },
                             {
                 degree: 'Higher Secondary Education',
                 university: 'Central Board of Secondary Education',
                 duration: '2017 – 2019',
                 cgpa: '72%',
                 achievements: [
                   'Science Stream with Mathematics',
                   'Strong foundation in Physics, Chemistry, and Mathematics',
                   'Active participation in school activities'
                 ],
                 icon: '📚'
               },
                             {
                 degree: 'Secondary Education',
                 university: 'Central Board of Secondary Education',
                 duration: '2016 – 2017',
                 cgpa: '9.4/10',
                 achievements: [
                   'Completed 10th standard with distinction',
                   'Excellent academic performance',
                   'Participated in various school competitions'
                 ],
                 icon: '🏫'
               }
            ].map((education, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group backdrop-blur-sm bg-white/10 border border-white/20"
              >
                <div className="text-4xl mb-4">{education.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {education.degree}
                </h3>
                <p className="text-gray-600 mb-2 font-medium">{education.university}</p>
                <p className="text-blue-600 mb-3 font-semibold">{education.duration}</p>
                <p className="text-green-600 mb-4 font-bold">CGPA: {education.cgpa}</p>
                <div className="space-y-2">
                  {education.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <p className="text-sm text-gray-600">{achievement}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              whileHover={{ 
                scale: 1.05,
                color: "#3b82f6"
              }}
              transition={{ duration: 0.3 }}
            >
              Projects
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              whileHover={{ 
                scale: 1.02,
                color: "#1f2937"
              }}
              transition={{ duration: 0.3 }}
            >
              Some of my recent work
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'EdTech SaaS Platform',
                description: 'Led the end-to-end development and planning of a multi-page B2B SaaS website suite tailored for EdTech platforms and higher education institutions. Architected responsive, SEO-optimized layouts using Next.js, integrating structured CTAs, dashboards, pricing modules, and lead generation forms. Designed feature-specific pages including Resume Builder, QR Certificate Generator, CRM Tools, Marketing Suite, Bootcamp Portal, and White-Labeled LMS for client customization.',
                tech: 'Next.js, TypeScript, Tailwind CSS, SaaS Development',
                image: '🎓',
                githubLink: 'https://github.com/aman0816/edtech'
              },
              {
                title: 'Blinkit Sales and Operations Dashboard',
                description: 'Developed an interactive Excel dashboard to track and analyze sales, orders, revenue, and delivery performance for Blinkit, supporting data-driven decisions across teams. Leveraged Pivot Tables, VLOOKUP, INDEX-MATCH, and advanced Excel functions to process and analyze over 10,000+ order records efficiently. Designed dynamic charts, slicers, and applied conditional formatting for real-time visualization of key metrics.',
                tech: 'Excel, Pivot Tables, KPI Tracking, Data Analysis',
                image: '📊',
                githubLink: 'https://github.com/aman0816/Blinkit-Dashboard'
              },
              {
                title: 'Sports Analytics Capstone Project',
                description: 'Leveraged Excel, SQL, and Power BI to analyze 100+ years of Olympic Games data, uncovering trends in athlete participation, medal distribution, gender parity, and regional performance. Built interactive dashboards and reports that visualized key insights (e.g., 29 Summer vs. 22 Winter Games, 57% Summer event share, U.S. leading with 9,200+ participants and 2,500+ gold medals). Applied advanced data modeling, DAX calculations, and SQL queries to drive actionable recommendations for improving athlete development and global sports inclusivity.',
                tech: 'Excel, SQL, Power BI, Data Visualization, Data Analysis',
                image: '🏃‍♂️',
                githubLink: 'https://github.com/aman0816/Sports-Analytics-Capstone-Project'
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group backdrop-blur-sm bg-white/10 border border-white/20"
              >
                <div className="text-4xl mb-4">{project.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <p className="text-sm text-blue-600 font-medium mb-4">{project.tech}</p>
                <div className="flex gap-2">
                  {project.githubLink ? (
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <Github size={16} />
                      View Code
                    </motion.a>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <Github size={16} />
                      View Code
                    </motion.button>
                  )}
                  {!project.githubLink && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Live Demo
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Let&apos;s work together on your next project
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: 'amankant1608@gmail.com', href: 'mailto:amankant1608@gmail.com' },
                  { icon: Phone, label: 'Phone', value: '+91 9135585392', href: 'tel:+919135585392' },
                  { icon: MapPin, label: 'Location', value: 'Patna, Bihar', href: '#' }
                ].map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm bg-white/10 border border-white/20"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <info.icon className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{info.label}</p>
                      <p className="font-medium text-gray-900">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Me</h4>
                <div className="flex gap-4">
                                  {[
                  { icon: Github, href: 'https://github.com/aman0816', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/aman0816/', label: 'LinkedIn' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Instagram, href: '#', label: 'Instagram' }
                ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <p className="text-green-800">Message sent successfully!</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gray-900 text-white py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Aman Kant Ranjan. All rights reserved.</p>
        </div>
      </motion.footer>

      {/* CV Upload Modal */}
      {showUpload && <CVUploadModal />}
    </div>
  );
}
