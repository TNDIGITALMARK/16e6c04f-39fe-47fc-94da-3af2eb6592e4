'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, TrendingUp, Database, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'Capture',
    icon: Camera,
    href: '/',
  },
  {
    label: 'Progress',
    icon: TrendingUp,
    href: '/progress',
  },
  {
    label: 'Foods',
    icon: Database,
    href: '/foods',
  },
  {
    label: 'Profile',
    icon: User,
    href: '/profile',
  },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors relative',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />
              )}

              {/* Icon */}
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-xl transition-colors',
                  isActive ? 'bg-primary/10' : 'hover:bg-muted'
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Label */}
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
