import Image from "next/image";

/**
 * Renders the author's quinoa business story with the supplied field photograph.
 * Example: BlogEntry uses this body at `/articles/selling-quinoa-validate-business-ideas`.
 */
export function QuinoaBusinessPost() {
  return (
    <>
      <figure className="article-figure">
        <Image
          src="/images/entrepreneurship/quinoa-field.png"
          alt="A field of colorful quinoa plants beside a lake."
          width={1920}
          height={979}
          sizes="(max-width: 850px) 100vw, 810px"
        />
      </figure>
      <p>A few years ago, I tried to sell quinoa from Bolivia in China.</p>
      <p>
        Initially, we planned to import it directly from Bolivia, but the Bolivian suppliers weren't interested in
        fulfilling such a small order. Therefore, we bought quinoa from a local importer and hired a packaging company to
        repackage it into smaller bags under our own brand.
      </p>
      <p>
        We originally intended to sell the quinoa online, but we soon discovered that our cost per package was higher
        than the retail price of similar products on Taobao. It seemed that we had paid far too much for the quinoa.
      </p>
      <p>As a result, we decided to sell it through local independent supermarkets instead.</p>
      <p>
        Before long, it became clear that the business wasn't profitable. Although our profit margins were reasonable,
        sales were too slow to make the business worthwhile.
      </p>
      <p>
        We had incorporated a company, registered a brand, and even purchased a toll-free customer service number. These
        expenses totaled around $1,000, which ended up being our entire loss. We didn't lose any money on the quinoa itself.
      </p>
      <p>
        <strong>
          The biggest lesson I learned from this experience was that we should validate business ideas with as little
          time and money as possible.
        </strong>
      </p>
      <p>
        If I could do it again, I wouldn't bother incorporating a company, registering a brand, or purchasing a toll-free
        number. Instead, I would simply buy some existing brands of quinoa and try selling them through local supermarkets
        to test market demand before making any significant investment.
      </p>
    </>
  );
}
