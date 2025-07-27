import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Download, 
  Linkedin, 
  Github, 
  Facebook, 
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code,
  GraduationCap,
  Briefcase,
  Award,
  User,
  Home,
  Settings,
  FolderOpen,
  MessageCircle,
  Sun,
  Moon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AnimatedSection = ({ children, id, className }: { children: React.ReactNode, id?: string, className?: string }) => (
  <motion.section
    id={id}
    className={className}
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 60, damping: 18, duration: 1 }}
    viewport={{ once: false, amount: 0.12 }}
  >
    {children}
  </motion.section>
);

function App() {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const sections = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'apropos', label: 'À propos', icon: User },
    { id: 'services', label: 'Mes Services', icon: Settings },
    { id: 'projets', label: 'Projets', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

  const skills = {
    frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'TailwindCSS'],
    backend: ['C', 'C++', 'C#', 'Java', 'Python', 'PHP'],
    database: ['MySQL', 'PostgreSQL', 'SQLite'],
    tools: ['Figma', 'Canva', 'Photoshop', 'Git', 'GitHub'],
    office: ['Word', 'PowerPoint', 'Excel']
  };

  const projects = [
    {
      title: 'Gestion de Restaurant',
      description: 'Application complète de gestion de restaurant avec interface admin et client',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
      demo: '#',
      github: 'https://github.com/ElyseRaz/Gestion-Restaurant'
    },
    {
      title: 'Pot au Feu',
      description: 'Site web moderne pour un restaurant avec menu interactif',
      technologies: ['Next.js', 'TailwindCSS'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      demo: 'https://pot-au-feu-beta.vercel.app',
      github: 'http://github.com/ElyseRaz/pot-au-feu'
    },
    {
      title: 'Mon Portfolio',
      description: 'Portfolio personnel responsive avec design moderne',
      technologies: ['React', 'TailwindCSS'],
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      demo: '#',
      github: 'https://github.com/ElyseRaz/MyPortfolio'
    }
  ];

  const services = [
    {
      title: 'Développement Frontend',
      description: 'Création d\'interfaces utilisateur modernes et responsives avec React, HTML, CSS et JavaScript',
      icon: Code
    },
    {
      title: 'Développement Backend',
      description: 'Développement d\'APIs robustes et de systèmes backend avec Java, PHP, Python',
      icon: Settings
    },
    {
      title: 'Design UI/UX',
      description: 'Conception d\'interfaces utilisateur intuitives avec Figma, Canva et Photoshop',
      icon: Award
    },
    {
      title: 'Gestion de Bases de Données',
      description: 'Conception et optimisation de bases de données MySQL, PostgreSQL, SQLite',
      icon: Briefcase
    }
  ];

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    emailjs.sendForm(
      'service_ie78bgt',
      'template_g84banf',
      form,
      'y-eUiPIjf526drm89'
    )
    .then(() => {
      toast.success('Message envoyé avec succès !');
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      toast.error('Erreur lors de l\'envoi du message.');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              ELYSE
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                  }`}
                >
                  <section.icon size={18} />
                  <span>{section.label}</span>
                </button>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                className="text-gray-600 dark:text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                  }`}
                >
                  <section.icon size={18} />
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Accueil Section */}
      <AnimatedSection id="accueil" className="scroll-mt-24 min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <img
                src="Profile.jpg"
                alt="Razafindravonjy Solofonirina Elysé"
                className="w-48 h-48 rounded-full mx-auto object-cover shadow-xl border-4 border-emerald-100 dark:border-emerald-800"
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Razafindravonjy Solofonirina Elysé
            </h1>
            
            <p className="text-xl md:text-2xl text-emerald-600 dark:text-emerald-400 mb-8 font-medium">
              Développeur • Designer
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Passionné par le développement web et le design, je crée des solutions numériques 
              innovantes et esthétiques qui allient performance et expérience utilisateur.
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-12">
              <a
                href="https://www.linkedin.com/in/elys%C3%A9-razafindravonjy-9355b32b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full hover:bg-emerald-600 hover:text-white transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/ElyseRaz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full hover:bg-emerald-600 hover:text-white transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Github size={24} />
              </a>
              <a
                href="https://web.facebook.com/elyse.razafindravonjy.2025"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full hover:bg-emerald-600 hover:text-white transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Facebook size={24} />
              </a>
              <a
                href="mailto:erazafindravonjy@gmail.com"
                className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full hover:bg-emerald-600 hover:text-white transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Mail size={24} />
              </a>
            </div>

            {/* CV Download Button */}
            <a
              href="/CV.pdf"
              download
              className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Download size={20} />
              <span className="font-medium">Télécharger mon CV</span>
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* À propos Section */}
      <AnimatedSection id="apropos" className="scroll-mt-24 py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">À propos de Moi</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez mon parcours, mes formations et mes compétences techniques
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Éducation */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <GraduationCap className="text-emerald-600 dark:text-emerald-400 mr-3" size={28} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Éducation</h3>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-emerald-600 dark:border-emerald-400 pl-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white">2024-2025</h4>
                  <p className="text-emerald-700 dark:text-emerald-300 font-medium">Deuxième année de Licence à L'Ecole Nationale d'Informatique Fianarantsoa</p>
                  <p className="text-gray-600 dark:text-gray-300">Génie Logiciel et Base de Données</p>
                </div>
                <div className="border-l-4 border-emerald-400 dark:border-emerald-300 pl-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white">2023-2024</h4>
                  <p className="text-emerald-700 dark:text-emerald-300 font-medium">1ère Année de Licence  à L'Ecole Nationale d'Informatique Fianarantsoa</p>
                  <p className="text-gray-600 dark:text-gray-300">Génie Logiciel et Base de Données</p>
                </div>
                <div className="border-l-4 border-emerald-300 dark:border-emerald-200 pl-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white">2022-2023</h4>
                  <p className="text-emerald-700 dark:text-emerald-300 font-medium">Baccalauréat</p>
                </div>
              </div>
            </div>

            {/* Formations et Expériences */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Award className="text-amber-600 dark:text-amber-400 mr-3" size={28} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Formations & Expériences</h3>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-amber-600 dark:border-amber-400 pl-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white">26-29 Novembre 2024</h4>
                  <p className="text-amber-700 dark:text-amber-300 font-medium">Formation Java</p>
                  <p className="text-gray-600 dark:text-gray-300">ODC Fianarantsoa</p>
                </div>
                <div className="border-l-4 border-amber-400 dark:border-amber-300 pl-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white">16 Juin - 04 Juillet</h4>
                  <p className="text-amber-700 dark:text-amber-300 font-medium">Data Analyst avec Excel</p>
                  <p className="text-gray-600 dark:text-gray-300">IDEA Academy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Compétences */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Mes Compétences</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill) => (
                    <span key={skill} className="bg-emerald-600 dark:bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">Backend</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((skill) => (
                    <span key={skill} className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4">Bases de Données</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.database.map((skill) => (
                    <span key={skill} className="bg-purple-600 dark:bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-orange-800 dark:text-orange-200 mb-4">Outils</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <span key={skill} className="bg-orange-600 dark:bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/30 dark:to-teal-800/30 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-teal-800 dark:text-teal-200 mb-4">Bureautique</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.office.map((skill) => (
                    <span key={skill} className="bg-teal-600 dark:bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection id="services" className="scroll-mt-24 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Mes Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Je propose des services complets de développement et de design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                    <service.icon className="text-emerald-600 dark:text-emerald-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white ml-4">{service.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Projets Section */}
      <AnimatedSection id="projets" className="scroll-mt-24 py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Mes Projets</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez quelques-uns de mes projets récents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.demo}
                      className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
                    >
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </a>
                    <a
                      href={project.github}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="scroll-mt-24 py-20 bg-emerald-50 dark:bg-emerald-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              N'hésitez pas à me contacter pour discuter de vos projets
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald-600 dark:bg-emerald-500 text-white rounded-xl">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">erazafindravonjy@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald-600 dark:bg-emerald-500 text-white rounded-xl">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Téléphone</h3>
                  <p className="text-gray-600 dark:text-gray-300">+261 34 65 713 48</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald-600 dark:bg-emerald-500 text-white rounded-xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Localisation</h3>
                  <p className="text-gray-600 dark:text-gray-300">Madagascar</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                    placeholder="Votre message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-lg hover:shadow-xl"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Razafindravonjy Solofonirina Elysé</h3>
            <p className="text-gray-400 dark:text-gray-500 mb-8">Développeur • Designer</p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-emerald-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-emerald-400 transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-emerald-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-emerald-400 transition-colors">
                <Mail size={24} />
              </a>
            </div>
            
            <p className="text-gray-500 dark:text-gray-600 text-sm">
              © 2025 Razafindravonjy Solofonirina Elysé. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;