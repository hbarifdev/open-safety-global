import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationMenuProps {
  isOpen: boolean;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-800' : '';
  };

  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'MILITARY DIVING', path: '/military-diving' },
    { name: 'COMMERCIAL DIVING', path: '/commercial-diving' },
    { name: 'SPORTS DIVING', path: '/sports-diving' },
    { name: 'RESPIRATORY VALIDATION', path: '/respiratory-validation' },
  ];

  return (
    <nav className={`bg-navy-900 text-white ${isOpen ? 'block' : 'hidden lg:block'}`}>
      <div className="container mx-auto">
        <ul className="flex flex-col lg:flex-row">
          {menuItems.map((item) => (
            <li key={item.path} className="group">
              <Link
                to={item.path}
                className={`block py-3 px-4 font-medium hover:bg-blue-800 transition-colors ${isActive(item.path)}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationMenu;