import { ChevronRight, Home } from 'lucide-react';
import Link from './Link';
import { motion } from 'motion/react';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 text-[10px] sm:text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest"
    >
      <Link to="/" className="hover:text-[var(--color-safety)] transition-colors flex items-center">
        <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
        Domov
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          {item.href ? (
            <Link to={item.href} className="hover:text-[var(--color-safety)] transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="text-white">{item.name}</span>
          )}
        </div>
      ))}
    </motion.nav>
  );
}
