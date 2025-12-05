import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <button className="language-switcher" onClick={toggleLanguage} title="Change language">
      <Languages size={20} />
      <span className="lang-code">{i18n.language.toUpperCase()}</span>
    </button>
  );
};

export default LanguageSwitcher;
