import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../ui/Image';
import NewsletterSubscription from './NewsletterSubscription';
import iso1 from '/assets/images/iso9001.png'; 
import iso2 from '/assets/images/iso14001.png'; 


const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Our Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Products</h3>
            <p className="text-gray-400 text-sm">
              Open Safety has been delivering modular rebreathers around the world since 2008. 
              These span the entire spectrum of diving, delivering unprecedented performance, 
              ruggedness and safety.
            </p>
            <div className="mt-4 flex space-x-3">
              <Image
                src={iso1}
                alt="Company Logo"
                title="Company Logo"
                width={100}
                height={100}
                // fallbackSrc="/images/fallback.png" 
                // blurDataURL="/images/anim-blur.jpg" 
                sizes="(max-width: 768px) 36px, 36px"
              />
              <Image
                src={iso2}
                alt="Company Logo"
                title="Company Logo"
                width={100}
                height={100}
                // fallbackSrc="/images/fallback.png" 
                // blurDataURL="/images/anim-blur.jpg" 
                sizes="(max-width: 768px) 36px, 36px"
              />
            </div>
          </div>

          {/* Corporate */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Corporate</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/safety-data" className="text-gray-400 hover:text-white transition">
                  Safety Data
                </Link>
              </li>
              <li>
                <Link to="/certifications" className="text-gray-400 hover:text-white transition">
                  Certifications
                </Link>
              </li>
              <li>
                <Link to="/safety-case" className="text-gray-400 hover:text-white transition">
                  Safety Case
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Terms */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Terms</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/distributors" className="text-gray-400 hover:text-white transition">
                  Distributors
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-gray-400 hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/returns-policy" className="text-gray-400 hover:text-white transition">
                  Service & Upgrades
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe for Newsletter */}
          <NewsletterSubscription />
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Open Safety Equipment Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;