import { Link, useLocation } from 'react-router-dom';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: 'HOME', path: '/' },
  { name: 'MILITARY DIVING', path: '/military-diving' },
  { name: 'COMMERCIAL DIVING', path: '/commercial-diving' },
  { name: 'SPORTS DIVING', path: '/sports-diving' },
  { name: 'RESPIRATORY VALIDATION', path: '/respiratory-validation' },
];

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className={`bg-navy-900 text-white ${isOpen ? 'block' : 'hidden lg:block'}`}>
      <div className="container mx-auto">
        <ul className="flex flex-col lg:flex-row">
          {menuItems.map((item) => {
            const isActive =
              item.path === '/'
                ? currentPath === '/'
                : currentPath.startsWith(item.path);

            return (
              <li key={item.path} className="group">
                <Link
                  to={item.path}
                  onClick={onClose}
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
