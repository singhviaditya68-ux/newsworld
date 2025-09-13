import React, { useState, useMemo } from "react";
import { Sun, Moon, Search as SearchIcon, Menu } from "lucide-react";
import { motion } from "framer-motion";

// हिंदी समाचार वेबसाइट - एकल फ़ाइल React component

const SAMPLE_ARTICLES = [
  {
    id: "1",
    title: "वैश्विक बाज़ारों में उछाल, नीति बदलाव से निवेशकों में उत्साह",
    excerpt:
      "एक अप्रत्याशित नीति घोषणा के बाद आज दुनियाभर के शेयर बाज़ारों में जबरदस्त उछाल देखा गया।",
    category: "व्यापार",
    author: "आइशा रहमान",
    date: "2025-09-12",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
    content:
      "बाज़ार विशेषज्ञों का कहना है कि यह तेजी अस्थायी हो सकती है और आने वाले आर्थिक आंकड़े तस्वीर को और स्पष्ट करेंगे...",
  },
  {
    id: "2",
    title: "नई बैटरी तकनीक से मिनटों में चार्ज होगा फ़ोन",
    excerpt:
      "वैज्ञानिकों ने ऐसी बैटरी तकनीक विकसित की है जो बेहद कम समय में चार्ज हो जाएगी और लंबे समय तक चलेगी।",
    category: "विज्ञान",
    author: "मिगुएल टोरेस",
    date: "2025-09-10",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&q=80",
    content:
      "शोधकर्ताओं का दावा है कि रासायनिक संरचना वही है, लेकिन नई आंतरिक संरचना आयन ट्रांसफर को तेज करती है...",
  },
  {
    id: "3",
    title: "स्थानीय कलाकारों ने पुराने गोदाम को कला गाँव में बदला",
    excerpt:
      "त्यागे गए औद्योगिक क्षेत्र को कलाकारों ने मिलकर एक रचनात्मक केंद्र में बदल दिया।",
    category: "संस्कृति",
    author: "नोरा चेन",
    date: "2025-09-08",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=80",
    content:
      "स्थानीय लोगों ने इस पहल का स्वागत किया जिसमें पॉप-अप प्रदर्शन और खुले स्टूडियो सालभर चलेंगे...",
  },
  {
    id: "4",
    title: "फ़ाइनल मैच में अंडरडॉग्स की ऐतिहासिक जीत",
    excerpt:
      "नाटकीय ओवरटाइम के बाद मेहमान टीम ने खिताब जीतकर सबको चौंका दिया।",
    category: "खेल",
    author: "रवि सिंह",
    date: "2025-09-11",
    image: "https://images.unsplash.com/photo-1505842465776-3d8ec2e6f7b7?w=1200&q=80",
    content:
      "मैच के आखिरी क्षणों में किए गए शॉट से जीत सुनिश्चित हुई। प्रशंसक सड़कों पर जश्न मनाने निकल पड़े...",
  },
];

const CATEGORIES = ["सभी", "व्यापार", "विज्ञान", "संस्कृति", "खेल"];

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

function Header({ onToggleTheme, dark, query, setQuery, openMenu }) {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={openMenu} aria-label="मेन्यू खोलें">
            <Menu />
          </button>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-tight">ऑलओवर न्यूज़</span>
            <small className="text-xs text-gray-600 dark:text-gray-400">वैश्विक सुर्ख़ियाँ • स्थानीय कहानियाँ</small>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="समाचार खोजें..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none"
              aria-label="लेख खोजें"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IconButton ariaLabel="थीम बदलें">
            {dark ? <Sun onClick={onToggleTheme} /> : <Moon onClick={onToggleTheme} />}
          </IconButton>
          <button className="hidden md:inline-flex px-4 py-2 rounded-md bg-blue-600 text-white">सब्सक्राइब</button>
        </div>
      </div>
    </header>
  );
}

function CategoryNav({ selected, setSelected }) {
  return (
    <nav className="flex gap-2 overflow-auto py-3">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelected(cat)}
          className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium ${
            selected === cat ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}

function ArticleCard({ article, open }) {
  return (
    <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="md:flex">
        <img src={article.image} alt="" className="h-40 md:h-auto md:w-48 object-cover w-full" />
        <div className="p-4 flex-1">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">{article.category}</span>
            <span>•</span>
            <span>{article.author}</span>
            <span>•</span>
            <time>{article.date}</time>
          </div>
          <h3 className="mt-2 text-lg font-semibold">{article.title}</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{article.excerpt}</p>
          <div className="mt-3">
            <button
              onClick={() => open(article)}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              पूरी खबर पढ़ें →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeaturedArticle({ article, open }) {
  if (!article) return null;
  return (
    <section className="rounded-2xl overflow-hidden relative">
      <div className="aspect-[16/8] md:aspect-[16/6] bg-gray-200">
        <img src={article.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-6 bottom-6 text-white max-w-lg">
          <div className="text-sm uppercase tracking-wider bg-black/30 inline-block px-3 py-1 rounded">मुख्य समाचार</div>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold">{article.title}</h2>
          <p className="mt-2 text-sm md:text-base opacity-90">{article.excerpt}</p>
          <button
            onClick={() => open(article)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium"
          >
            पढ़ें
          </button>
        </div>
      </div>
    </section>
  );
}

export default function AlloverNewsHindi() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("सभी");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openMenu = () => {
    alert("मेन्यू खोलें (होस्ट ऐप में लागू करें)");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_ARTICLES.filter((a) => {
      if (category !== "सभी" && a.category !== category) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const featured = filtered.length ? filtered[0] : SAMPLE_ARTICLES[0];

  const toggleTheme = () => setDark((d) => !d);

  if (typeof document !== "undefined") {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header onToggleTheme={toggleTheme} dark={dark} query={query} setQuery={setQuery} openMenu={openMenu} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col gap-6">
            <FeaturedArticle article={featured} open={setSelectedArticle} />

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4">
              <h3 className="text-lg font-semibold">मुख्य खबरें</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">ताज़ा अपडेट</p>

              <div className="mt-4">
                <CategoryNav selected={category} setSelected={setCategory} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {filtered.map((a) => (
                    <ArticleCard key={a.id} article={a} open={setSelectedArticle} />
                  ))}

                  {filtered.length === 0 && (
                    <div className="col-span-full p-6 text-center text-gray-500">कोई लेख नहीं मिला।</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside className="hidden md:block">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-4">
                <h4 className="font-semibold">न्यूज़लेटर</h4>
                <p className="text-sm text-gray-500">हर सुबह आपके इनबॉक्स में ताज़ा खबरें।</p>
                <div className="mt-3">
                  <input placeholder="अपना ईमेल दर्ज करें" className="w-full px-3 py-2 rounded-md border bg-transparent" />
                  <button className="mt-3 w-full px-3 py-2 bg-blue-600 text-white rounded-md">सब्सक्राइब</button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-4">
                <h4 className="font-semibold">लोकप्रिय</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  {SAMPLE_ARTICLES.slice(0, 3).map((a) => (
                    <li key={a.id} className="flex items-start gap-3">
                      <img src={a.image} className="w-12 h-12 rounded object-cover" alt="" />
                      <div>
                        <div className="font-medium text-sm">{a.title}</div>
                        <div className="text-xs text-gray-500">{a.author}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-4">
                <h4 className="font-semibold">हमारे बारे में</h4>
                <p className="text-sm text-gray-500">ऑलओवर न्यूज़ — स्वतंत्र पत्रकारिता, वैश्विक और स्थानीय कहानियों के लिए।</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {selectedArticle && (
        <motion.dialog
          className="fixed inset-0 z-50 flex items-start justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedArticle(null)}
        >
          <motion.div
            layoutId={`article-${selectedArticle.id}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <img src={selectedArticle.image} className="w-full h-52 object-cover rounded-t-2xl" alt="" />
            <div className="p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">{selectedArticle.category} • {selectedArticle.author} • {selectedArticle.date}</div>
              <h1 className="mt-2 text-2xl font-extrabold">{selectedArticle.title}</h1>
              <p className="mt-4 text-gray-700 dark:text-gray-300">{selectedArticle.content}</p>

              <div className="mt-6 flex gap-3">
                <button onClick={() => setSelectedArticle(null)} className="px-4 py-2 rounded-md border">बंद करें</button>
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white">सहेजें</button>
              </div>
            </div>
          </motion.div>
        </motion.dialog>
      )}

      <footer className="mt-12 py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-sm text-gray-600 dark:text-gray-400 flex flex-col md:flex-row justify-between gap-4">
          <div>
            © {new Date().getFullYear()} ऑलओवर न्यूज़. सर्वाधिकार सुरक्षित।
          </div>
          <div className="flex gap-3">
            <a>हमारे बारे में</a>
            <a>संपर्क</a>
            <a>गोपनीयता नीति</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
