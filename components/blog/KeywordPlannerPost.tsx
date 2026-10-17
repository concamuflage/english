import Image from "next/image";

/**
 * Renders the author's demand-validation post with the two original Pages screenshots.
 *
 * Example: use this body inside BlogEntry on `/articles/validate-demand-google-keyword-planner`.
 * The phrase "my website" links to the author's Lotus Health site.
 */
export function KeywordPlannerPost() {
  return (
    <>
      <p>
        Often, when we’re trying to launch a product or service in a market we’re unfamiliar with, we don’t even know
        whether there’s real demand for it.
      </p>
      <p>
        After moving back to China from the U.S., I thought it would be a good idea to offer a medical tourism concierge
        service for Americans. I built a website without doing much research first. But{" "}
        <a href="https://lotushealth.cc/">my website</a> was getting only about
        one visitor a month, so I decided to study SEO to increase traffic. That’s how I found the book{" "}
        <a href="https://www.amazon.com/dp/1522005676"><em>3 Months to No.1</em></a>.
      </p>
      <p>
        Along the way, I stumbled upon a free tool that could help us gauge market demand: Google Keyword Planner. Its{" "}
        <strong>Get search volume and forecasts</strong> section is useful for finding out how often people in your target market
        search for your product or service over a given period.
      </p>
      <figure className="article-figure">
        <a href="/images/entrepreneurship/keyword-planner-overview.png" aria-label="View the full-size Google Keyword Planner screenshot">
          <Image
            src="/images/entrepreneurship/keyword-planner-overview.png"
            alt="Google Keyword Planner with Discover new keywords and Get search volume and forecasts options."
            width={2468}
            height={1074}
            sizes="(max-width: 850px) 100vw, 810px"
          />
        </a>
        <figcaption>Google Keyword Planner</figcaption>
      </figure>
      <figure className="article-figure">
        <a href="/images/entrepreneurship/keyword-planner-search-volume.png" aria-label="View the full-size search-volume screenshot">
          <Image
            src="/images/entrepreneurship/keyword-planner-search-volume.png"
            alt="U.S. keyword results showing 10–100 average monthly searches for dental implant cost china and dashes for the displayed hip and knee replacement terms."
            width={2790}
            height={1178}
            sizes="(max-width: 850px) 100vw, 810px"
          />
        </a>
        <figcaption>Search volume in the Get search volume and forecasts section.</figcaption>
      </figure>
      <p>
        Note: The screenshot above was taken while I was writing this post. For some reason, the average monthly search
        range had dropped to 10–100 from the 100–1,000 I saw when I first researched the keyword. The estimates don’t seem
        very precise.
      </p>
      <p>
        To my dismay, terms like “hip replacement cost China,” “knee replacement cost China,” and “root canal treatment
        China” showed fewer than ten searches per month. The most searched term I found was “dental implant cost China,”
        which initially showed an average of 100–1,000 searches per month. That helped explain why I was getting so little
        traffic: very few Americans appeared to be searching for these treatments in China.
      </p>
      <p>
        I thought Americans would want to come to China for various treatments because of the price differences. There
        may be opportunities for Americans to take advantage of more affordable healthcare in Asian countries, but it
        seemed that many weren’t aware of them. That might explain why even treatments with some of the biggest price
        differences attracted so few searches.
      </p>
      <p>
        I wish I’d known about this tool earlier. It could have helped me avoid spending so much time building a website
        before checking demand.
      </p>
      <p>
        For future projects, I’ll definitely use this tool first to see whether people are searching for the product or
        service I plan to offer.
      </p>
    </>
  );
}
