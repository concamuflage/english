import type { ConfusingWordPair } from "@/lib/confusingWords";

/** Additional vocabulary merged into the shared English list; e.g. restrain/constrain retains its overlapping valid answers. */
export const generalConfusingWordPairs: ConfusingWordPair[] = [
  {
    slug: "door-doorway",
    words: ["door", "doorway"],
    pronunciations: ["/ dɔr /", "/ ˈdɔrweɪ /"],
    questions: [
      { sentence: "She turned the handle and closed the wooden ____ to keep the cold air out.", answer: "door" },
      { sentence: "The ____ had no door attached, so we could walk straight through the open entrance.", answer: "doorway" },
      { sentence: "The carpenter lifted the ____ off its hinges and laid it flat to repaint it.", answer: "door" },
      { sentence: "Even after the door was removed, the piano was too wide to fit through the ____.", answer: "doorway" }
    ],
    note: "A door is the movable panel that opens or closes an entrance. A doorway is the opening you pass through, whether or not a door is fitted. For example, you can remove a door from its hinges, but the doorway remains. Door can also refer to an entrance in everyday speech, so some uses overlap."
  },
  {
    slug: "illusion-delusion",
    words: ["illusion", "delusion"],
    pronunciations: ["/ ɪˈluːʒən /", "/ dɪˈluːʒən /"],
    questions: [
      { sentence: "The straight straw looked bent in the glass of water, but this optical ____ disappeared when she lifted it out.", answer: "illusion" },
      { sentence: "The stage mirrors created the ____ of an endless hallway, although the set was only a few feet deep.", answer: "illusion" },
      { sentence: "Despite clear evidence that the messages were ordinary advertisements, he held the fixed ____ that they contained secret instructions intended only for him.", answer: "delusion" },
      { sentence: "He clung to the ____ that he could never lose money gambling, even after his bank statements showed years of losses.", answer: "delusion" }
    ],
    note: "An illusion is a misleading appearance or impression, often involving what you see: a straight straw can look bent in water. A delusion is a false belief held despite evidence against it: someone may remain convinced that gambling guarantees a profit despite repeated losses. Illusion can also refer to a mistaken belief, so the words sometimes overlap; optical effects favor illusion, while a firmly held false conviction favors delusion."
  },
  {
    slug: "restrain-constrain",
    words: ["restrain", "constrain"],
    pronunciations: ["/ rɪˈstreɪn /", "/ kənˈstreɪn /"],
    questions: [
      // Both verbs can describe physical restriction or emotional control; restrain is the usual choice here.
      { sentence: "The handler used a strong leash to ____ the dog, holding it back from running into the busy road.", answer: "restrain", alternativeAnswers: ["constrain"] },
      { sentence: "She struggled to ____ her anger during the meeting, keeping her voice calm despite the insulting remarks.", answer: "restrain", alternativeAnswers: ["constrain"] },
      { sentence: "A lack of funds may ____ the organizers to cancel the event, even though they want it to go ahead.", answer: "constrain" },
      { sentence: "The new evidence may ____ the committee to revise its decision, despite its reluctance to change course.", answer: "constrain" }
    ],
    note: {
      paragraphs: [
        "Restrain usually emphasizes holding back a person, action, or emotion. Constrain often emphasizes limits on freedom or circumstances that force a choice.",
        "Their meanings overlap. Both can describe physical restriction or controlling anger, so those practice sentences accept either answer; restrain is the more usual choice in those examples."
      ],
      bullets: [
        "Restrain someone from leaving: stop or hold them back from leaving.",
        "Constrain someone to stay: compel them to stay because of pressure or circumstances.",
        "Constrain your choices: limit the options available to you."
      ]
    }
  },
  {
    slug: "tallow-callow",
    words: ["tallow", "callow"],
    pronunciations: ["/ ˈtæloʊ /", "/ ˈkæloʊ /"],
    questions: [
      { sentence: "She melted the ____ made from rendered beef fat and poured it around the wicks to make candles.", answer: "tallow" },
      { sentence: "The soap maker used ____ rendered from sheep fat as an ingredient in a batch of traditional soap.", answer: "tallow" },
      { sentence: "The ____ recruit had never worked in an office before and made mistakes that an experienced colleague would have avoided.", answer: "callow" },
      { sentence: "Looking back on his ____ judgment as a teenager, he realized how much maturity and experience he had gained since then.", answer: "callow" }
    ],
    note: "Tallow is a noun for rendered animal fat, especially from cattle or sheep, used in products such as candles and soap. Callow is an adjective meaning immature or inexperienced, often describing a young person. For example, a candle maker can melt tallow, while a callow recruit still has much to learn. Both words rhyme: tallow /ˈtæloʊ/ and callow /ˈkæloʊ/."
  },
  {
    slug: "venue-avenue",
    words: ["venue", "avenue"],
    pronunciations: ["/ ˈvɛnjuː /", "/ ˈævənuː /"],
    questions: [
      { sentence: "They booked a hotel ballroom as the wedding ____, with space for two hundred guests and a dance floor.", answer: "venue" },
      { sentence: "The concert's original ____ was too small, so the organizers moved the performance to a larger theater.", answer: "venue" },
      { sentence: "With negotiations stalled, mediation offered another ____ for resolving the dispute without going to court.", answer: "avenue" },
      { sentence: "The scholarship opened an ____ to higher education for students who could not otherwise afford university.", answer: "avenue" },
      { sentence: "Detectives pursued every ____ of inquiry, checking phone records and interviewing witnesses for new leads.", answer: "avenue" }
    ],
    note: "A venue is the place where an event takes place, such as a wedding hall or concert theater. An avenue is literally a road, but figuratively it is a possible approach, route, or opportunity for achieving something. For example, an avenue of inquiry is a line of investigation, while an avenue to higher education is a way to gain access to it."
  }
];
