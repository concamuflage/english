import type { ConfusingWordPair } from "@/lib/confusingWords";

/** General-only vocabulary; for example, door/doorway is not added to the GRE collection. */
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
