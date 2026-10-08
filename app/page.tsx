import Image from "next/image";
import { ArticleCard } from "@/components/ArticleCard";
import { getFeaturedArticles } from "@/lib/content";

const practiceItems = [
  "Read one short passage and underline signal words.",
  "Save five new words with an original example sentence.",
  "Rewrite one sentence with stronger verbs and cleaner rhythm."
];

/**
 * Renders the home page for the English learning blog.
 *
 * Example: the page shows three featured articles and a daily practice checklist.
 */
export default function HomePage() {
  const featuredArticles = getFeaturedArticles();

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">English learning blog</p>
          <h1>Build sharper English, one focused habit at a time.</h1>
          <p className="hero-text">
            Reading notes, vocabulary systems, writing practice, and GRE strategies for learners who want steady,
            measurable progress.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#articles">
              Start reading
            </a>
            <a className="button-secondary" href="/gre">
              Explore GRE
            </a>
            <a className="button-secondary" href="/confusing-words">
              Practice confusing words
            </a>
          </div>
        </div>
        <div className="hero-image">
          <Image
            src="/images/english-study-hero.png"
            alt="A bright study desk with English learning materials, flashcards, and a laptop"
            width={1772}
            height={900}
            priority
          />
        </div>
      </section>

      <section className="section-band" id="articles">
        <div className="section-heading">
          <p className="eyebrow">Latest articles</p>
          <h2>Practical lessons for daily progress</h2>
        </div>
        <div className="article-grid">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="practice-section" id="practice">
        <div>
          <p className="eyebrow">Daily practice</p>
          <h2>A simple loop for today</h2>
        </div>
        <ol>
          {practiceItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
