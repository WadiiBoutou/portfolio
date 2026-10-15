import { useCallback, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';

// Copyable component adapted from Magic UI's Animated Theme Toggler.
function getCircleClipPaths(x, y, radius, viewportWidth, viewportHeight) {
    const toX = value => `${(value / viewportWidth) * 100}%`;
    const toY = value => `${(value / viewportHeight) * 100}%`;
    const point = `${toX(x)} ${toY(y)}`;
    const radiusPercent = (radius / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100;

    return [
        `circle(0% at ${point})`,
        `circle(${radiusPercent}% at ${point})`
    ];
}

export function AnimatedThemeToggler({
    className,
    duration = 400,
    fromCenter = false,
    theme,
    onThemeChange,
    ...props
}) {
    const buttonRef = useRef(null);
    const isTransitioning = useRef(false);
    const activeAnimation = useRef(null);
    const isDark = theme === 'dark';

    const cancelAnimation = useCallback(() => {
        activeAnimation.current?.cancel();
        activeAnimation.current = null;
    }, []);

    useEffect(() => () => {
        cancelAnimation();
        const root = document.documentElement;
        if (root.dataset.magicuiThemeVt !== 'active') return;
        delete root.dataset.magicuiThemeVt;
        root.style.removeProperty('--magicui-theme-toggle-vt-duration');
        root.style.removeProperty('--magicui-theme-vt-clip-from');
    }, [cancelAnimation]);

    const toggleTheme = useCallback(() => {
        const button = buttonRef.current;
        if (
            !button ||
            isTransitioning.current ||
            document.documentElement.dataset.magicuiThemeVt === 'active'
        ) {
            return;
        }

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const bounds = button.getBoundingClientRect();
        const x = fromCenter ? viewportWidth / 2 : bounds.left + bounds.width / 2;
        const y = fromCenter ? viewportHeight / 2 : bounds.top + bounds.height / 2;
        const radius = Math.hypot(
            Math.max(x, viewportWidth - x),
            Math.max(y, viewportHeight - y)
        );

        const applyTheme = () => {
            const nextTheme = isDark ? 'light' : 'dark';
            document.documentElement.classList.toggle('dark');
            onThemeChange(nextTheme);
        };

        if (
            typeof document.startViewTransition !== 'function' ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            applyTheme();
            return;
        }

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
            cancelAnimation();
        };

        const transition = document.startViewTransition(() => {
            flushSync(applyTheme);
        });
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
    }, [cancelAnimation, duration, fromCenter, isDark, onThemeChange]);

    return (
        <button
            type="button"
            ref={buttonRef}
            onClick={toggleTheme}
            className={className}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            {...props}
        >
            {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
        </button>
    );
}
