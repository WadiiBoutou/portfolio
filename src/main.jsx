import { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import parse from 'html-react-parser';
import portfolioSource from '../portfolio-source.html?raw';
import interactionScriptUrl from '../script.js?url';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler.jsx';

const bodyMarkup = portfolioSource
    .replace(/\r\n?/g, '\n')
    .match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
    ?.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<script\b[^>]*\/?>/gi, '')
    .replace(/\s+src=(["'])\1/gi, '')
    .replace(/\sonclick=(["']).*?\1/gi, '') ?? '';

function ThemeControl() {
    const [theme, setTheme] = useState(() => document.body.classList.contains('dark-theme') ? 'dark' : 'light');

    const handleThemeChange = useCallback(nextTheme => {
        const isDark = nextTheme === 'dark';
        document.body.classList.toggle('dark-theme', isDark);
        localStorage.setItem('theme', nextTheme);
        setTheme(nextTheme);
    }, []);

    return (
        <AnimatedThemeToggler
            className="theme-toggle"
            theme={theme}
            onThemeChange={handleThemeChange}
        />
    );
}

function App() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = interactionScriptUrl;
        script.dataset.portfolioInteractions = 'true';
        document.body.append(script);
        return () => script.remove();
    }, []);

    return parse(bodyMarkup, {
        replace(node) {
            if (node.type === 'tag' && node.name === 'div' && node.attribs.id === 'theme-toggle-root') {
                return <ThemeControl />;
            }
        }
    });
}

const root = window.__portfolioRoot ?? createRoot(document.getElementById('root'));
window.__portfolioRoot = root;
root.render(<App />);

if (import.meta.hot) {
    import.meta.hot.dispose(() => {
        root.unmount();
        delete window.__portfolioRoot;
    });
}
