import React, { useState, useMemo } from "react";
import { Sun, Moon, Search as SearchIcon, Menu } from "lucide-react";
import { motion } from "framer-motion";

// News World - single file React component
// Multilingual: 20 languages option via dropdown

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "中文" },
  { code: "ar", name: "العربية" },
  { code: "ru", name: "Русский" },
  { code: "ja", name: "日本語" },
  { code: "pt", name: "Português" },
  { code: "it", name: "Italiano" },
  { code: "ko", name: "한국어" },
  { code: "tr", name: "Türkçe" },
  { code: "fa", name: "فارسی" },
  { code: "ur", name: "اردو" },
  { code: "bn", name: "বাংলা" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "ml", name: "മലയാളം" },
  { code: "gu", name: "ગુજરાતી" },
];

// Sample data (replace with API fetches in a real app)
const SAMPLE_ARTICLES = [
  {
    id: "1",
    title: {
      en: "Global Markets Rally After Major Policy Surprise",
      hi: "वैश्विक बाज़ारों में नीतिगत घोषणा से उछाल",
    },
    excerpt: {
      en: "Stocks surged worldwide today after an unexpected policy announcement that altered investor expectations.",
      hi: "एक अप्रत्याशित नीति घोषणा के बाद आज दुनिया भर के शेयर बाजारों में तेज़ी देखने को मिली।",
    },
    category: { en: "Business", hi: "व्यापार" },
    author: "Aisha Rahman",
    date: "2025-09-12",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
    content: {
      en: "In a rapid market response, investors digested the news and rotated into cyclicals. Experts caution volatility may continue as data comes in...",
      hi: "निवेशकों ने तुरंत प्रतिक्रिया देते हुए तेजी से खरीदारी की। विशेषज्ञों का कहना है कि आने वाले दिनों में अस्थिरता बनी रह सकती है...",
    },
  },
];

const CATEGORIES = {
  en: ["All", "Business", "Science", "Culture", "Sports"],
  hi: ["सभी", "व्यापार", "विज्ञान", "संस्कृति", "खेल"],
};

function IconButton({ children, ariaLabel }) {
  return (
    <button
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

function Header({ onToggleTheme, dark, query, setQuery, openMenu, lang, setLang }) {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={openMenu} aria-label="Open menu">
            <Menu />
          </button>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-tight">News World</span>
            <small className="text-xs text-gray-600 dark:text-gray-400">Global • Local • Multi-language</small>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === "hi" ? "खोजें समाचार, विषय..." : "Search news, topics, people..."}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none"
              aria-label="Search articles"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="px-2 py-1 rounded-md border bg-white dark:bg-gray-800"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>

          <IconButton ariaLabel="Toggle theme">
            {dark ? <Sun onClick={onToggleTheme} /> : <Moon onClick={onToggleTheme} />}
          </IconButton>
          <button className="hidden md:inline-flex px-4 py-2 rounded-md bg-blue-600 text-white">
            {lang === "hi" ? "सब्सक्राइब करें" : "Subscribe"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default function NewsWorld() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [lang, setLang] = useState("en");

  const toggleTheme = () => setDark((d) => !d);

  if (typeof document !== "undefined") {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header
        onToggleTheme={toggleTheme}
        dark={dark}
        query={query}
        setQuery={setQuery}
        openMenu={() => alert("Open menu")}
        lang={lang}
        setLang={setLang}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">
          {lang === "hi" ? "ताज़ा खबरें" : "Latest News"}
        </h2>
        <div className="grid gap-4">
          {SAMPLE_ARTICLES.map((a) => (
            <div key={a.id} className="p-4 bg-white dark:bg-gray-900 rounded-xl">
              <h3 className="font-semibold text-lg">{a.title[lang] || a.title.en}</h3>
              <p className="text-sm mt-2">{a.excerpt[lang] || a.excerpt.en}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
