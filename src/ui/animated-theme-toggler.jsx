import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';

const getCircleClipPaths = (x, y, radius, viewportWidth, viewportHeight) => {
    const toX = value => `${(value / viewportWidth) * 100}%`;
    const toY = value => `${(value / viewportHeight) * 100}%`;
    const center = `${toX(x)} ${toY(y)}`;
    const radiusPercent = (radius / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100;

    return [
        `circle(0% at ${center})`,
        `circle(${radiusPercent}% at ${center})`
    ];
};

// Circle-reveal variant adapted from Magic UI's Animated Theme Toggler.
function AnimatedThemeToggler({ className = '', duration = 400, ...props }) {
    const [isDark, setIsDark] = useState(() => document.body.classList.contains('dark-theme'));
    const buttonRef = useRef(null);
    const isTransitioning = useRef(false);
    const activeAnimation = useRef(null);

    const toggleTheme = () => {
        if (isTransitioning.current) return;

        const applyTheme = () => {
            const nextIsDark = !document.body.classList.contains('dark-theme');
            document.body.classList.toggle('dark-theme', nextIsDark);
            localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
            setIsDark(nextIsDark);
        };

        if (
            typeof document.startViewTransition !== 'function' ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            applyTheme();
            return;
        }

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const bounds = buttonRef.current.getBoundingClientRect();
        const x = bounds.left + bounds.width / 2;
        const y = bounds.top + bounds.height / 2;
        const radius = Math.hypot(
            Math.max(x, viewportWidth - x),
            Math.max(y, viewportHeight - y)
        );
        const clipPaths = getCircleClipPaths(x, y, radius, viewportWidth, viewportHeight);
        const root = document.documentElement;

        root.dataset.magicuiThemeVt = 'active';
        root.style.setProperty('--magicui-theme-toggle-vt-duration', `${duration}ms`);
        root.style.setProperty('--magicui-theme-vt-clip-from', clipPaths[0]);
        isTransitioning.current = true;

        const cleanup = () => {
            isTransitioning.current = false;
            delete root.dataset.magicuiThemeVt;
            root.style.removeProperty('--magicui-theme-toggle-vt-duration');
            root.style.removeProperty('--magicui-theme-vt-clip-from');
            activeAnimation.current?.cancel();
            activeAnimation.current = null;
        };

        const transition = document.startViewTransition(() => flushSync(applyTheme));
        transition.finished.then(cleanup, cleanup);
        transition.ready.then(() => {
            activeAnimation.current = root.animate(
                { clipPath: clipPaths },
                {
                    duration,
                    easing: 'ease-in-out',
                    fill: 'forwards',
                    pseudoElement: '::view-transition-new(root)'
                }
            );
        }, cleanup);
    };

    return (
        <button
            ref={buttonRef}
            type="button"
            className={`theme-toggle ${className}`.trim()}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            onClick={toggleTheme}
            {...props}
        >
            {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
        </button>
    );
}

export default AnimatedThemeToggler;
