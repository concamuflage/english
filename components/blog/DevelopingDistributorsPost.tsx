import Image from "next/image";

/**
 * Renders the overseas-distributor article and original LinkedIn screenshot from hehe.pages.
 * Example: BlogEntry uses this body at `/articles/how-to-find-overseas-distributors`.
 */
export function DevelopingDistributorsPost() {
  return (
    <>
      <p>作为一个品牌，我们应该如何开发品牌代理商呢？我通常都是通过下面的方式开发。</p>

      <h2>网络开发</h2>
      <p>第一步：通过谷歌搜索，例如搜索关键词：</p>
      <ul>
        <li lang="en">vacuum cleaner importer in USA</li>
        <li lang="en">vacuum wholesaler in USA</li>
        <li lang="en">vacuum cleaner wholesaler in USA</li>
      </ul>
      <p>
        当你找到公司名字后，可以去 LinkedIn 上面看公司的组织结构，总共有多少员工，以及员工的大概职责。比如下面这个公司，有 81 个员工，大部分都是做销售，零售和 Marketing 人数较少。
      </p>
      <p>
        另外，有些公司可能通过谷歌搜索不一定搜到，可以使用谷歌地图搜索，或许能够搜索到更多潜在代理商。
      </p>
      <figure className="article-figure">
        <a href="/images/global-expansion/linkedin-company-team.png" aria-label="查看完整的 LinkedIn 公司员工信息截图">
          <Image
            src="/images/global-expansion/linkedin-company-team.png"
            alt="LinkedIn 公司 People 页面，显示 81 位关联成员，并列出销售、运营、产品管理等职能的人数分布。"
            width={1624}
            height={1224}
            sizes="(max-width: 850px) 100vw, 810px"
          />
        </a>
      </figure>
      <p>
        第二步：在 LinkedIn 上面联系对方公司的老板或者采购，通常对你的品牌有兴趣的话，会跟你交换 email。
      </p>
      <p>
        第三步：接下来就是线下见面了。当然，某些行业，没有线下见面也能签约或者成交第一个订单。
      </p>

      <h2>会展</h2>
      <p>
        坦白说，比起第一种方式，会展的效果并不是特别好。笔者参加过很多国际会展，感觉这些展会上面获取的客户屈指可数。那些很差的展会，到你展位的人都屈指可数，更不要谈转化成客户了。感觉展会是网络不发达的时候留下来的遗留方式，并没有很高的效率。
      </p>

      <h2>爬虫</h2>
      <p>
        这是一个很意外的方式。我之前写了一个脚本爬取目标市场的零售商网站上的邮箱，为了后续给他们发新品信息。很意外，这些看似零售商的邮箱中隐藏了一个批发商，他后续跟我签约成为了当地的客户。有些批发商的网站看起来和零售商差不多，你有可能觉得他们是零售商，但是他们其实是批发商。
      </p>

      <h2>查看竞争对手网站</h2>
      <p>
        通常他们会把自己各个国家的代理商放在他们网站的 distributors 页面，你可以直接去上面看。
      </p>

      <h2>进出口数据</h2>
      <p>
        市面上有公司提供这种数据，可以看到目标市场的进口商，而且还能看到你的品类进口了多少。
      </p>
    </>
  );
}
