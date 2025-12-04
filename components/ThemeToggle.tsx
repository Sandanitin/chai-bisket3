'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render until mounted to avoid hydration mismatch
    if (!mounted) {
        return (
            <div className="p-2 rounded-lg bg-[#120a07] border border-[#2d1a11] w-[40px] h-[40px]" />
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[#120a07] dark:bg-[#120a07] border border-[#2d1a11] hover:border-[#c87534] transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-[#f0a35c]" />
            ) : (
                <Moon className="h-5 w-5 text-[#2d1a11]" />
            )}
        </button>
    );
}
