import Header from '@/components/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import { AtomIcon, Edit, Share2, ChevronRight, Sparkles, Briefcase, GraduationCap, Code, FileText } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import './home.css'

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Add scroll animation listener
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.scroll-animate');
      scrollElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          el.classList.add('animate-in');
        }
      });
    };
    
    document.addEventListener('DOMContentLoaded', function() {
      const handleIntersection = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const valueDisplay = counter.querySelector('.counter-value');
            const duration = 2000; // milliseconds
            const step = Math.ceil(target / (duration / 16)); // 60fps approx
            
            let currentValue = 0;
            const timer = setInterval(() => {
              currentValue += step;
              if (currentValue >= target) {
                valueDisplay.textContent = target;
                clearInterval(timer);
              } else {
                valueDisplay.textContent = currentValue;
              }
            }, 16);
          }
        });
      };
    
      // Setup Intersection Observer for counters
      const counterObserver = new IntersectionObserver(handleIntersection, {
        threshold: 0.1
      });
      
      document.querySelectorAll('.counter-animation').forEach(counter => {
        counterObserver.observe(counter);
      });
    });
    // Add mouse move effect
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Parallax effect for hero section
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const heroX = e.clientX - heroRect.left;
        const heroY = e.clientY - heroRect.top;
        
        const elements = heroRef.current.querySelectorAll('.parallax-element');
        elements.forEach(el => {
          const speed = parseFloat(el.getAttribute('data-speed')) || 0.05;
          const x = (heroX - heroRect.width / 2) * speed;
          const y = (heroY - heroRect.height / 2) * speed;
          el.style.transform = `translate(${x}px, ${y}px)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial check for visible elements
    setTimeout(handleScroll, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Resume keyword data
  const resumeKeywords = [
    { text: 'Education', icon: <GraduationCap className="w-4 h-4 mr-2" /> },
    { text: 'Experience', icon: <Briefcase className="w-4 h-4 mr-2" /> },
    { text: 'Skills', icon: <Code className="w-4 h-4 mr-2" /> },
    { text: 'Languages', icon: <AtomIcon className="w-4 h-4 mr-2" /> },
    { text: 'Certifications', icon: <FileText className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="particles-container">
        {Array.from({ length: 50 }).map((_, index) => (
          <div 
            key={index} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)]"></div>
      
      {/* Mouse follower light effect */}
      <div 
        className="pointer-events-none fixed z-10 rounded-full mix-blend-screen blur-3xl opacity-30 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(138,58,255,0.8) 0%, rgba(138,58,255,0) 70%)',
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
        }}
      ></div>
      
      {/* Floating resume keywords */}
      <div className={`absolute inset-0 overflow-hidden ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-1000`}>
        {resumeKeywords.map((keyword, index) => (
          <div 
            key={index}
            className="floating-keyword"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDuration: `${15 + Math.random() * 25}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <div className="keyword-content flex items-center">
              {keyword.icon}
              <span>{keyword.text}</span>
            </div>
          </div>
        ))}
      </div>
      
      <Header />
      
      {/* Main content */}
      <section className="relative z-10 pt-20" ref={heroRef}>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:py-24 lg:py-32 text-center">
          {/* Floating elements background */}
          <div className={`absolute inset-0 overflow-hidden pointer-events-none ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
            <div className="floating-element left-1/4 top-1/4 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-10 animate-float-slow parallax-element" data-speed="0.03"></div>
            <div className="floating-element right-1/4 top-2/4 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-float-medium parallax-element" data-speed="0.05"></div>
            <div className="floating-element left-2/4 bottom-1/4 w-72 h-72 bg-pink-500 rounded-full filter blur-3xl opacity-10 animate-float-fast parallax-element" data-speed="0.07"></div>
          </div>
          
          {/* Header with animated entrance */}
          <div className={`relative transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-1000 delay-300`}>
            <div className="mb-3 inline-flex items-center px-4 py-2 rounded-full bg-indigo-900/30 border border-indigo-700/30 text-indigo-300 backdrop-blur-sm animate-pulse-slow">
              <Sparkles className="w-4 h-4 mr-2 animate-sparkle" />
              <span className="text-sm font-medium">AI-Powered Resume Builder</span>
            </div>
          </div>

          {/* Main heading with staggered reveal */}
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-7xl relative z-10">
            <span className={`block text-glitch parallax-element ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 delay-500`} data-speed="0.02">
              Build Your Resume
            </span>
            <span className={`mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animated-gradient parallax-element ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 delay-700`} data-speed="0.04">
              With AI Precision
            </span>
          </h1>

          {/* Description text with fade-in */}
          <p className={`mb-10 text-lg font-normal text-gray-300 lg:text-xl max-w-2xl mx-auto parallax-element ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 delay-900`} data-speed="0.01">
            Effortlessly craft a standout resume with our AI-powered builder. 
            Stand out from the crowd and land your dream job faster.
          </p>

          {/* CTA button with hover effects */}
          <div className={`flex flex-col mb-10 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 delay-1100`}>
            <a 
              href="/dashboard" 
              className="group relative overflow-hidden inline-flex justify-center items-center py-4 px-8 text-base font-medium text-center text-white rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 btn-glow animate-pulse-slow"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ChevronRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute -inset-px bg-gradient-to-br from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></span>
              <span className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 btn-glow-border"></span>
            </a>
          </div>
          
          {/* Feature cards with staggered entrance */}
          <div className={`mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-700 delay-1300`}>
            {[
              { icon: <Edit className="w-8 h-8" />, title: "Smart Editing", desc: "AI suggests improvements to your content" },
              { icon: <AtomIcon className="w-8 h-8" />, title: "ATS Optimized", desc: "Tailored for applicant tracking systems" },
              { icon: <Share2 className="w-8 h-8" />, title: "Easy Sharing", desc: "Export and share in multiple formats" }
            ].map((feature, i) => (
              <div 
                key={i} 
                className={`scroll-animate p-6 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 card-hover-effect ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${1400 + i * 100}ms` }}
              >
                <div className="p-3 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-900/30 text-indigo-400 icon-glow">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
                <div className="absolute inset-0 border border-indigo-500/0 rounded-xl transition-all duration-500 hover:border-indigo-500/50 card-border-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats counter section with animated counting */}
      <section className="py-16 relative z-10 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4">
          
          
          
        </div>
      </section>
      
      {/* Add a subtle footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Resume Builder AI • All rights reserved</p>
        
        {/* Add animated social icons */}
        
      </footer>
    </div>
  )
}

export default Home;