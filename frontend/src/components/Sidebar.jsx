import { Link, useLocation } from 'react-router-dom';
import { Home, Users, UserPlus, Book, ClipboardList, GraduationCap } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <Home size={18} />, path: '/' },
    { name: 'Students', icon: <Users size={18} />, path: '/students' },
    { name: 'Teachers', icon: <UserPlus size={18} />, path: '/teachers' },
    { name: 'Classes', icon: <Book size={18} />, path: '/classes' },
    { name: 'Subjects', icon: <ClipboardList size={18} />, path: '/subjects' },
    { name: 'Exams', icon: <GraduationCap size={18} />, path: '/exams' },
  ];

  return (
    <div className="w-64 h-screen bg-blue-900 text-white shadow-md fixed top-0 left-0 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Faulu School</h1>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center p-2 rounded-md hover:bg-blue-700 transition-all ${
                location.pathname === item.path ? 'bg-blue-700' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
