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
            setTranslations(window.__INITIAL_STATE__);
            // Determine lang from HTML tag or just URL
            setLang(document.documentElement.lang || 'en');
        } else {
            // Fallback: Fetch from API (for dev flow)
            // Detect lang from URL manually since server didn't inject it
            const path = window.location.pathname;
            let currentLang = 'en';
            if (path.startsWith('/pt')) currentLang = 'pt';
            else if (path.startsWith('/sv')) currentLang = 'sv';

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

export const useTranslation = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }
    return context;
};
