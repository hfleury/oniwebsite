import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Defines the shape of our translations
type Translations = Record<string, string>;

// Global definition for the injected state
declare global {
    interface Window {
        __INITIAL_STATE__?: Translations;
    }
}

export type Locale = 'en' | 'pt' | 'sv';

// eslint-disable-next-line react-refresh/only-export-components -- shared locale-prefix constant, reused by main.tsx and LanguageDropdown.tsx outside this component tree
export const LOCALE_PREFIXES: Record<Locale, string> = {
    en: '',
    pt: '/pt',
    sv: '/sv',
};

// eslint-disable-next-line react-refresh/only-export-components -- standalone URL-prefix helper, must be callable before I18nProvider mounts
export function getLocaleFromPath(pathname: string): Locale {
    if (pathname.startsWith('/pt')) return 'pt';
    if (pathname.startsWith('/sv')) return 'sv';
    return 'en';
}

// eslint-disable-next-line react-refresh/only-export-components -- standalone URL-prefix helper, must be callable before I18nProvider mounts
export function getBasename(pathname: string = window.location.pathname): string {
    return LOCALE_PREFIXES[getLocaleFromPath(pathname)];
}

interface I18nContextType {
    t: (key: string) => string;
    lang: string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
    const [translations, setTranslations] = useState<Translations>({});
    const [lang, setLang] = useState<string>('en');

    useEffect(() => {
        // 1. Try to read from Server Injection
        if (window.__INITIAL_STATE__) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from server-injected global state on mount, not a derived-state update
            setTranslations(window.__INITIAL_STATE__);
            // Determine lang from HTML tag or just URL
            setLang(document.documentElement.lang || 'en');
        } else {
            // Fallback: Fetch from API (for dev flow)
            // Detect lang from URL manually since server didn't inject it
            const currentLang = getLocaleFromPath(window.location.pathname);
            setLang(currentLang);

            fetch(`/api/translations?lang=${currentLang}`)
                .then(res => res.json())
                .then(data => {
                    setTranslations(data);
                })
                .catch(err => {
                    console.error("i18n: Failed to fetch translations", err);
                });
        }
    }, []);

    const t = (key: string): string => {
        return translations[key] || key;
    };

    return (
        <I18nContext.Provider value={{ t, lang }}>
            {children}
        </I18nContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components -- Provider + companion hook is an intentional, common context pattern
export const useTranslation = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }
    return context;
};
