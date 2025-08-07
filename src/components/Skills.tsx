'use client';

import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  BarChart3, 
  Globe, 
  Smartphone, 
  Cloud,
  GitBranch,
  Shield
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Code,
      skills: [
        { name: 'Angular', level: 90, color: 'bg-red-500' },
        { name: 'Next.js', level: 85, color: 'bg-black' },
        { name: 'React', level: 80, color: 'bg-blue-500' },
        { name: 'TypeScript', level: 85, color: 'bg-blue-600' },
        { name: 'Tailwind CSS', level: 90, color: 'bg-cyan-500' },
      ]
    },
    {
      title: 'Backend Development',
      icon: Database,
      skills: [
        { name: 'Spring Boot', level: 85, color: 'bg-green-600' },
        { name: 'Node.js', level: 80, color: 'bg-green-500' },
        { name: 'Java', level: 90, color: 'bg-orange-500' },
        { name: 'Python', level: 75, color: 'bg-blue-500' },
        { name: 'REST APIs', level: 90, color: 'bg-purple-500' },
      ]
    },
    {
      title: 'Data Analysis',
      icon: BarChart3,
      skills: [
        { name: 'Power BI', level: 85, color: 'bg-yellow-500' },
        { name: 'SQL', level: 90, color: 'bg-blue-600' },
        { name: 'Excel', level: 95, color: 'bg-green-600' },
        { name: 'Tableau', level: 75, color: 'bg-orange-500' },
        { name: 'Python (Pandas)', level: 80, color: 'bg-blue-500' },
      ]
    },
    {
      title: 'Tools & Others',
      icon: GitBranch,
      skills: [
        { name: 'Git', level: 85, color: 'bg-orange-600' },
        { name: 'Docker', level: 70, color: 'bg-blue-500' },
        { name: 'AWS', level: 75, color: 'bg-orange-500' },
        { name: 'Agile/Scrum', level: 90, color: 'bg-purple-600' },
        { name: 'JIRA', level: 85, color: 'bg-blue-500' },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Technologies</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My technical expertise spans across multiple domains, from frontend development to data analysis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <category.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className={`h-2 rounded-full ${skill.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Additional Skills & Competencies
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Globe, label: 'Web Development', desc: 'Full-stack web applications' },
              { icon: Smartphone, label: 'Mobile Development', desc: 'Cross-platform solutions' },
              { icon: Cloud, label: 'Cloud Services', desc: 'AWS, Azure, Google Cloud' },
              { icon: Shield, label: 'Security', desc: 'Best practices & protocols' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                  <item.icon className="text-blue-600" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 