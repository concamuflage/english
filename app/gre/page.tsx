import { ArticleCard } from "@/components/ArticleCard";
import { getGreArticles, greResources } from "@/lib/content";

/**
 * Renders the GRE section requested for the top navigation.
 *
 * Example: learners can jump from `/gre` into sentence equivalence and vocabulary resources.
 */
export default function GrePage() {
  const greArticles = getGreArticles();

  return (
    <main>
      <section className="subpage-hero">
        <p className="eyebrow">GRE</p>
        <h1>GRE verbal practice without the panic spiral.</h1>
        <p>
          Learn the logic behind sentence equivalence, text completion, and high-value vocabulary so practice sessions
          become easier to review and repeat.
        </p>
      </section>

      <section className="resource-grid" aria-label="GRE study focus areas">
        {greResources.map((resource) => (
          <article className="resource-card" key={resource.title}>
            <h2>{resource.title}</h2>
            <p>{resource.focus}</p>
            <strong>Example</strong>
            <span>{resource.example}</span>
          </article>
        ))}
      </section>

      <section className="section-band">
        <div className="section-heading">
          <p className="eyebrow">GRE articles</p>
          <h2>Start with these lessons</h2>
        </div>
        <div className="article-grid">
          {greArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
