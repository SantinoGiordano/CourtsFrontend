import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 sm:px-8">
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold">
          Your Logo
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
      
      {/* Mobile Hamburger Button */}
      <div className="md:hidden">
        <button 
          onClick={toggleMenu}
          className="btn btn-square btn-ghost"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={`absolute top-16 left-0 right-0 bg-base-100 shadow-md transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } md:hidden`}
      >
        <ul className="menu p-4">
          <li><Link href="/" className="active:bg-primary">Home</Link></li>
          <li><Link href="/about" className="active:bg-primary">About</Link></li>
          <li><Link href="/services" className="active:bg-primary">Services</Link></li>
          <li><Link href="/contact" className="active:bg-primary">Contact</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;