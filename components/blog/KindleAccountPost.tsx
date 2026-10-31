/**
 * Presents the author's Mac Kindle login experience and the supplied region-change steps.
 * Example: `/articles/kindle-mac-amazon-account-not-found` separates the observed fix from a possible backend explanation.
 */
export function KindleAccountPost() {
  return (
    <>
      <p>
        如果你有一个 Amazon 美国账户，在 MacBook 上下载了 Kindle，但是登录时却显示“账户不存在”，而你明明可以用这个账户登录 amazon.com，你一定会很纳闷。
      </p>
      <p>
        我曾经找客服折腾了几个小时都没搞定。最后发现，在我这次遇到的情况里，问题不在账户，而在 Mac 的地区设置：把电脑的地区改成美国后，就能成功登录了。
      </p>
      <h2>我对这个问题的理解</h2>
      <p>
        亚马逊是个非常傻的公司。我的推测是，美国区和中国区的账户验证服务不同：当 Mac 的地区是中国大陆时，Kindle 可能会连接到中国区的服务，而那个服务无法识别我的 Amazon.com 账户，所以显示“账户不存在”；把地区改成美国后，客户端可能切换到了美国区的服务，这下就能正常登录了。这是我根据这次经历作出的推测，并不是对亚马逊内部数据库实现的确认。
      </p>
      <p>我恨亚马逊！</p>
      <h2>如何更改</h2>
      <ol lang="en">
        <li>Completely quit Kindle with <kbd>Command + Q</kbd>.</li>
        <li>Open <strong>System Settings → General → Language &amp; Region</strong>.</li>
        <li>Change <strong>Region</strong> from <strong>China Mainland</strong> to <strong>United States</strong>.</li>
        <li>Reopen Kindle and try signing in with your Amazon.com account.</li>
      </ol>
    </>
  );
}
