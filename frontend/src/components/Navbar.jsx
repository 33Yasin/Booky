import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faRightFromBracket, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Chart from "./Chart";

const Navbar = ({
    onLoginClick,
    showUserMenu = false,
    onLogoutClick = () => {},
    onSearch = () => {},
    cartCount = 0,
    onCartClick = () => {},
}) => {
    const [q, setQ] = React.useState("");
    const [theme, setTheme] = React.useState(() => {
        // Initialize theme from localStorage or system preference
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', initialTheme);
            return initialTheme;
        }
        return 'light';
    });
    
    const [isAnimating, setIsAnimating] = React.useState(false);

    // Add smooth transition class to html element and sync theme
    React.useEffect(() => {
        const html = document.documentElement;
        html.style.transition = 'background-color 300ms ease, color 200ms ease';
        
        // Ensure theme is applied to html element
        html.setAttribute('data-theme', theme);
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        return () => {
            html.style.transition = '';
        };
    }, [theme]);

    const toggleTheme = () => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        // Add transition class for smooth animation
        document.documentElement.classList.add('theme-transition');
        
        // Update theme state (which will trigger the effect to update localStorage and html attribute)
        setTheme(newTheme);
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
            setIsAnimating(false);
        }, 300);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const query = q.trim();
        if (!query) return;
        onSearch(query);
    };
    return (
        <header className="bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Top Row: Logo + Icons */}
                <div className="flex items-center justify-between h-16 w-full">
                    {/* Left: Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="#"
                            className="text-xl font-bold text-primary"
                            onClick={(e) => { e.preventDefault(); window.location.reload(); }}
                            aria-label="Ana sayfayı yenile"
                        >
                            Booky
                        </a>
                    </div>

                    {/* Right: Icons */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Chart count={cartCount} onClick={onCartClick} />
                        {showUserMenu ? (
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <button 
                                        onClick={toggleTheme}
                                        className={`btn btn-ghost btn-circle hover:bg-base-200 transition-all duration-300 transform ${
                                            isAnimating ? 'scale-90 opacity-80' : 'scale-100 opacity-100'
                                        }`}
                                        aria-label="Tema Değiştir"
                                        disabled={isAnimating}
                                    >
                                        {theme === 'light' ? (
                                            <FontAwesomeIcon 
                                                icon={faMoon} 
                                                className="text-lg transition-transform duration-300"
                                            />
                                        ) : (
                                            <FontAwesomeIcon 
                                                icon={faSun} 
                                                className="text-lg text-yellow-400 transition-transform duration-300"
                                            />
                                        )}
                                    </button>
                                    {isAnimating && (
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></span>
                                        </span>
                                    )}
                                </div>
                                <button 
                                    onClick={onLogoutClick}
                                    className="btn btn-ghost btn-circle hover:bg-base-200 transition-colors text-error"
                                    aria-label="Çıkış Yap"
                                >
                                    <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-outline btn-primary"
                                onClick={onLoginClick}
                            >
                                Giriş Yap
                            </button>
                        )}
                    </div>
                </div>

                {/* Bottom Row: Search (visible on all screens) */}
                <div className="pb-3 md:hidden">
                    <form className="w-full" role="search" aria-label="Site search" onSubmit={handleSubmit}>
                        <div className="flex gap-2">
                            <input
                                type="search"
                                name="q"
                                placeholder="Kitap, yazar veya ISBN ara..."
                                className="input input-bordered flex-1"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary">Ara</button>
                        </div>
                    </form>
                </div>

                {/* Desktop Search (hidden on mobile) */}
                <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3">
                    <form className="w-full" role="search" aria-label="Site search" onSubmit={handleSubmit}>
                        <div className="flex gap-2">
                            <input
                                type="search"
                                name="q"
                                placeholder="Kitap, yazar veya ISBN ara..."
                                className="input input-bordered flex-1"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary">Ara</button>
                        </div>
                    </form>
                </div>
                
                <ScrollToTop />
            </div>
        </header>
    );
};

// Scroll to top button component
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    // Show button when page is scrolled down
    React.useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg transition-all duration-300 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            } hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 z-50`}
            aria-label="En üste çık"
        >
            <FontAwesomeIcon icon={faArrowUp} className="w-5 h-5" />
        </button>
    );
};

export default Navbar;