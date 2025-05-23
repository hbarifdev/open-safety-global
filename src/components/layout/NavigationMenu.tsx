import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface NavigationMenuProps {
  isOpen: boolean;
}

const menuItems = [
  { name: 'HOME', path: '/' },
  { name: 'MILITARY DIVING', path: '/military-divin' },
  { name: 'COMMERCIAL DIVING', path: '/commercial-divin' },
  { name: 'SPORTS DIVING', path: '/sports-divin' },
  { name: 'RESPIRATORY VALIDATION', path: '/respiratory-validatio' },
];

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className={`bg-navy-900 text-white ${isOpen ? 'block' : 'hidden lg:block'}`}>
      <div className="container mx-auto">
        <ul className="flex flex-col lg:flex-row">
          {menuItems.map(item => {
            const isActive =
              item.path === '/'
                ? currentPath === '/'
                : currentPath.startsWith(item.path);

            return (
              <li key={item.path} className="group">
                <Link
                  to={item.path}
                  className={`block py-3 px-4 font-medium hover:bg-blue-800 transition-colors ${
                    isActive ? 'bg-blue-800' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationMenu;
