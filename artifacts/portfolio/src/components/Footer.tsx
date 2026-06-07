import { Link } from "wouter";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface py-12 mt-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-3xl font-heading tracking-widest flex items-baseline mb-4">
              AAMIR<span className="text-accent">.</span>SAIFI
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              Building premium digital experiences with modern web technologies, precise code, and creative design.
            </p>
          </div>
          
          <div>
            <h4 className="text-foreground uppercase tracking-widest text-sm font-bold mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/projects" className="hover:text-accent transition-colors">Projects</Link></li>
              <li><Link href="/skills" className="hover:text-accent transition-colors">Skills</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground uppercase tracking-widest text-sm font-bold mb-6">Social</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300 hover:-translate-y-1">
                <FaGithub />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300 hover:-translate-y-1">
                <FaLinkedin />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300 hover:-translate-y-1">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300 hover:-translate-y-1">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-xs">
            © {currentYear} Aamir Saifi. All rights reserved.
          </p>
          <div className="w-full md:w-auto mt-4 md:mt-0 flex justify-center">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
