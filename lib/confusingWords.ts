import { wordPronunciations } from "@/lib/wordPronunciations";

export type ConfusingWordQuestion = {
  sentence: string;
  answer: string;
  /** Other valid choices, e.g. unfathomable also fits the fathomless ocean-depth sentence. */
  alternativeAnswers?: string[];
};

/** At least one question per group; e.g. abyssal / abysmal can practice only the "very bad" meaning. */
export type ConfusingWordQuestions = [ConfusingWordQuestion, ...ConfusingWordQuestion[]];

/** Supports plain notes, paragraph/list explanations (e.g. quantile / quartile), or comparison tables. */
export type ConfusingWordNote = string | {
  paragraphs: string[];
  bullets: string[];
} | {
  table: { columns: string[]; rows: string[][] };
  heading: string;
  examples: string[];
  conclusion: string;
};

export type ConfusingWordPair = {
  slug: string;
  words: readonly [string, string, ...string[]];
  /** IPA in word order; for example, solipsism is `/ ˈsɒl ɪpˌsɪz əm /`. */
  pronunciations: readonly string[];
  questions: ConfusingWordQuestions;
  note?: ConfusingWordNote;
  /** Image-only note; e.g. the apothem card displays a labeled hexagon diagram. */
  noteImage?: { src: string; alt: string; width: number; height: number; wide?: boolean };
  /** Side-by-side labeled images; e.g. embossed on the left and debossed on the right. */
  noteImages?: { src: string; alt: string; width: number; height: number; caption: string }[];
};

type ConfusingWordAnswerKey = "wordOne" | "wordTwo";

type ConfusingWordExtraQuestion = readonly [sentence: string, answerKey: ConfusingWordAnswerKey];

type ConfusingWordPairRow = readonly [string, string, string, string, ...ConfusingWordExtraQuestion[]];

/** Explicit groups support three or more choices, e.g. jagged / rugged / ragged. */
type ConfusingWordGroupRow = {
  words: [string, string, ...string[]];
  questions: ConfusingWordQuestions;
};

const confusingWordPairRows: (ConfusingWordPairRow | ConfusingWordGroupRow)[] = [
  ["coma", "comma", "After the crash, he fell into a ____.", "Add a ____ after the opening phrase."],
  ["bowl", "bowel", "She poured soup into the ____.", "The surgeon examined the lower ____."],
  ["geography", "geology", "The class studied the ____ of river valleys.", "The class studied the ____ of volcanic rock."],
  ["latitude", "altitude", "The island lies at a low ____.", "The plane climbed to a higher ____."],
  ["weather", "whether", "The ____ turned stormy by noon.", "I asked ____ the train was late."],
  ["cash", "cache", "The shop accepts only ____.", "The browser saved the file in its ____."],
  ["borough", "furlough", "Brooklyn is a New York City ____.", "The soldier came home on ____."],
  ["literal", "liberal", "The ____ meaning of the phrase is plain.", "The mayor supported a ____ reform plan."],
  ["August", "august", "School reopens in ____.", "The judge entered with an ____ air."],
  ["elder", "elderly", "My ____ brother gave me advice.", "The nurse helped the ____ patient."],
  [
    "flare",
    "flair",
    "A bright ____ rose from the road.",
    "She decorated the room with ____.",
    ["She has a ____ for languages.", "wordTwo"],
    ["He dressed with quiet ____.", "wordTwo"]
  ],
  ["cahoot", "cohort", "The thieves were in ____ with the guard.", "The study followed one student ____."],
  ["sensor", "censor", "The smoke ____ detected heat.", "The editor refused to ____ the report."],
  ["means", "mean", "Saving is one ____ of reaching the goal.", "What does this symbol ____?"],
  ["chili", "Chile", "He added beans to the ____.", "She flew south to ____."],
  ["house", "housing", "They bought a small ____ near campus.", "The city needs affordable ____."],
  [
    "strip",
    "stripes",
    "Tear one ____ from the sheet.",
    "The flag has red ____.",
    ["Cut a thin ____ of paper.", "wordOne"],
    ["They bought a narrow ____ of land by the road.", "wordOne"],
    ["The zebra's ____ helped it blend into the grass.", "wordTwo"]
  ],
  ["premium", "premier", "Members pay a ____ for better service.", "The ____ opened the new parliament."],
  [
    "ingenuous",
    "ingenious",
    "Her ____ smile showed honest surprise.",
    "The engineer found an ____ solution.",
    ["The child's ____ question made everyone laugh.", "wordOne"],
    ["Her ____ smile showed how genuinely surprised she was.", "wordOne"],
    ["She had an ____ way of saying exactly what she thought.", "wordOne"]
  ],
  ["censor", "censure", "The board tried to ____ the film.", "The board voted to ____ the mayor."],
  ["button", "bottom", "Fasten the top ____ on your coat.", "Write your name at the ____."],
  ["sparse", "sparingly", "Trees were ____ on the ridge.", "Use the strong spice ____."],
  ["peel", "peal", "Remove the orange ____ first.", "A loud ____ of bells filled the square."],
  ["deflect", "defect", "The shield can ____ the blow.", "A tiny ____ ruined the lens."],
  ["Google", "goggle", "I used ____ to find the address.", "Do not ____ at strangers."],
  {
    words: ["jagged", "rugged", "ragged"],
    questions: [
      { sentence: "The hikers crossed ____ ground, struggling over boulders and steep slopes where no smooth trail existed.", answer: "rugged" },
      { sentence: "His coat looked torn and ____.", answer: "ragged" },
      { sentence: "The phone has a ____ case for outdoor work.", answer: "rugged" },
      { sentence: "His ____ face showed years of mountain weather.", answer: "rugged" },
      { sentence: "The glass had a ____ edge.", answer: "jagged" },
      { sentence: "The ____ mountains rose against the sky, their sharp, uneven peaks resembling the teeth of a saw.", answer: "jagged" },
      { sentence: "The flag was old and ____.", answer: "ragged" }
    ]
  },
  ["bubonic", "bucolic", "The doctor studied ____ plague.", "The poem praised a ____ village."],
  ["orc", "orca", "The fantasy game features an ____.", "The boat followed an ____ in the bay."],
  ["flub", "flob", "Do not ____ your opening line.", "In British informal English, to ____ is to spit."],
  ["flout", "flaunt", "The driver chose to ____ the rules.", "He liked to ____ his new watch."],
  [
    "conjure",
    "conjecture",
    "The magician seemed to ____ a coin.",
    "Without data, that claim is only ____.",
    ["The smell of rain can ____ memories of childhood.", "wordOne"],
    ["The poet could ____ a whole city in a single line.", "wordOne"]
  ],
  ["fragrant", "flagrant", "The garden was ____ after rain.", "The referee saw a ____ foul."],
  ["indigenous", "indigent", "The plant is ____ to the island.", "The clinic served ____ families."],
  ["omen", "Oman", "The black cloud felt like a bad ____.", "The ship docked in ____."],
  [
    "demur",
    "demure",
    "She did not ____ when asked to help.",
    "The actor gave a ____ smile.",
    ["They may ____ if asked to serve as treasurer.", "wordOne"]
  ],
  ["indolence", "insolence", "His ____ kept the work unfinished.", "The clerk was fired for ____."],
  ["dissemble", "disassemble", "He tried to ____ his anger.", "Please ____ the chair before moving it."],
  ["antagonist", "protagonist", "The villain is the main ____.", "The hero is the story's ____."],
  ["moan", "mourn", "The patient began to ____ softly.", "The town gathered to ____ the mayor."],
  ["forebear", "forbear", "Her ____ crossed the ocean in 1890.", "Please ____ from interrupting."],
  ["acerbic", "ascetic", "His ____ reply stung the room.", "The monk lived an ____ life."],
  ["denture", "indenture", "Grandpa cleaned his ____ each night.", "The apprentice signed an ____."],
  ["rackety", "rickety", "The ____ cart rattled downhill.", "The old ladder looked ____."],
  ["arduous", "ardent", "The climb was long and ____.", "She was an ____ supporter of the cause."],
  ["secret", "secrete", "Keep the plan ____ until Friday.", "The glands ____ hormones."],
  ["gauge", "gouge", "Use the meter to ____ the pressure.", "The nail left a ____ in the wood."],
  ["complaisant", "complacent", "The ____ host agreed to every request.", "The team grew ____ after one win."],
  ["celerity", "celebrity", "The courier moved with surprising ____.", "The ____ signed autographs."],
  ["morning", "mourning", "We leave early tomorrow ____.", "The family wore black in ____."],
  ["legion", "lesion", "The empire sent a Roman ____.", "The scan showed a small ____."],
  ["resurrection", "insurrection", "The sermon described the ____.", "The guards stopped the ____."],
  ["palette", "palate", "The painter cleaned her ____.", "The chef has a refined ____."],
  ["complement", "compliment", "The sauce will ____ the fish.", "She gave him a kind ____."],
  ["preposterous", "preponderance", "That excuse sounds ____.", "The case rests on a ____ of evidence."],
  ["corpulent", "opulent", "The old portrait shows a ____ merchant.", "They stayed in an ____ hotel."],
  ["subservient", "subversion", "He refused to be ____ to power.", "The plot aimed at political ____."],
  [
    "subversive",
    "subservient",
    "The group's ____ activities aimed to undermine the government and replace the existing political system.",
    "The ____ assistant agreed with every demand from his boss, never daring to express an opinion of his own."
  ],
  ["exceptional", "exceptionable", "Her results were ____.", "His rude comment was ____."],
  ["portable", "potable", "Bring a ____ charger.", "The hikers need ____ water."],
  [
    "esurient",
    "prurient",
    "After two days without food, the ____ travelers devoured every scrap of bread they could find.",
    "The tabloid catered to readers' ____ curiosity by publishing intimate details of the actor's sex life."
  ],
  [
    "obnoxious",
    "noxious",
    "The ____ guest kept interrupting everyone and insulting the host until he was asked to leave.",
    "Workers wore respirators to protect their lungs from the ____ fumes released by the chemicals."
  ],
  [
    "quantile",
    "quartile",
    "The analyst calculated the 0.90 ____ of the response times, the cutoff corresponding to the 90th percentile rather than a division into quarters.",
    "The first ____, Q1, is the 25th percentile, the first of the three cut points used to divide ordered data into four groups."
  ],
  {
    words: ["fathomless", "unfathomable"],
    questions: [
      {
        sentence: "Her decision to reject the offer was ____ to her friends; despite her explanation, they could not understand her reasons.",
        answer: "unfathomable"
      }
    ]
  },
  {
    words: ["abyssal", "abysmal"],
    questions: [
      {
        sentence: "The restaurant's service was ____: our food arrived cold after a two-hour wait, and the staff ignored every complaint.",
        answer: "abysmal"
      }
    ]
  },
  [
    "emboss",
    "engrave",
    "The stationer will ____ the initials on the invitation, raising the letters above the paper so you can feel them with your fingertips.",
    "The jeweler will ____ the date inside the silver ring, cutting fine grooves into the metal with a sharp tool."
  ],
  [
    "emboss",
    "deboss",
    "The printer will ____ the wedding invitations so that the lettering rises above the surface of the paper.",
    "The manufacturer will ____ the logo into the leather cover, pressing it below the surface to create a recessed design."
  ],
  [
    "attenuate",
    "extenuate",
    "The thick walls help ____ the noise from the street, reducing its volume to a faint hum inside the room.",
    "His youth and lack of experience may ____ his misconduct, making it seem more forgivable without excusing it entirely."
  ],
  [
    "rhapsody",
    "prosody",
    "The pianist performed a passionate ____, a musical composition that moved freely between contrasting moods rather than following a strict form.",
    "In their study of ____, the students marked the poem's stressed syllables and analyzed its meter, rhythm, and rhyme.",
    ["The mayor launched into a long ____ about plans for the city.", "wordOne"],
    ["The breathtaking view left her in a ____ of delight, so overwhelmed with joy that she forgot the cold.", "wordOne"]
  ],
  [
    "factious",
    "factitious",
    "The movement became ____, breaking into hostile camps that backed rival leaders and refused to cooperate.",
    "The product's ____ popularity was manufactured through fake reviews and paid endorsements rather than genuine customer enthusiasm."
  ],
  [
    "fractious",
    "factitious",
    "The tired toddler grew ____, whining at every suggestion and refusing to cooperate with his parents.",
    "The campaign's ____ popularity came from paid supporters and staged crowds rather than genuine public enthusiasm.",
    ["The ____ horse tossed its head and repeatedly refused to follow the rider's commands.", "wordOne"],
    ["The company created a ____ shortage by withholding stock from stores, making an abundant product appear scarce.", "wordTwo"]
  ],
  [
    "factitious",
    "facetious",
    "The rally's ____ enthusiasm came from paid actors instructed to cheer, rather than from genuine public support.",
    "His ____ suggestion that they solve the budget crisis by printing money was an ill-timed joke during a serious meeting.",
    ["It seems probable that several of the mounds are ____, built by people rather than formed naturally.", "wordOne"],
    ["The merchants created a ____ demand by spreading rumors of a shortage.", "wordOne"],
    ["True ____ patients are those who consciously feign physical or psychological symptoms to assume the role of a patient because they desire attention, sympathy, and caring.", "wordOne"],
    ['She was being ____ when she said, "Oh, great! Another three-hour meeting. Just what I needed."', "wordTwo"],
    ["Don't be ____. I'm asking you a serious question.", "wordTwo"]
  ],
  [
    "libertarian",
    "liberal",
    "The ____ candidate wanted a much smaller government and fewer regulations.",
    "The ____ senator supported social programs and civil rights protections.",
    ["The ____ group opposed new taxes and defended individual choice.", "wordOne"],
    ["The ____ mayor pushed for public health care and environmental rules.", "wordTwo"]
  ],
  ["hallow", "hollow", "The ritual will ____ the ground.", "The log was ____ inside."],
  [
    "adjure",
    "abjure",
    "I ____ you to tell the truth.",
    "The convert chose to ____ old beliefs.",
    ["The judge will ____ the witness to answer plainly.", "wordOne"]
  ],
  [
    "lithe",
    "blithe",
    "The dancer moved with a ____ grace.",
    "He gave a ____ reply to the warning.",
    ["She sang a ____ tune while packing for the holiday.", "wordTwo"],
    ["His ____ laughter made the picnic feel easy and bright.", "wordTwo"],
    ["The manager showed a ____ disregard for the safety rules.", "wordTwo"]
  ],
  ["momentous", "momentary", "The treaty was a ____ event.", "A ____ pause followed the joke."],
  ["agog", "aghast", "The children were ____ with excitement before the curtain rose.", "The crowd stood ____ at the damage."],
  ["trope", "troupe", "The critic disliked that old ____.", "The theater ____ toured Spain."],
  [
    "reckless",
    "feckless",
    "The ____ driver ignored the light.",
    "The ____ manager missed every deadline.",
    ["His ____ promise sounded impressive but contained no real commitment.", "wordTwo"],
    ["The proposal was a ____ plan with no budget, timeline, or owner.", "wordTwo"]
  ],
  [
    "deference",
    "difference",
    "She spoke with ____ to the judge.",
    "There is a clear ____ in price.",
    ["Out of ____ to his parents, he did not sell the home.", "wordOne"]
  ],
  ["diffidence", "indifference", "His ____ made public speaking hard.", "Her ____ hurt his feelings."],
  ["contour", "couture", "Trace the ____ of the hill.", "The dress came from a ____ house."],
  ["inveterate", "invertebrate", "He is an ____ liar.", "A worm is an ____."],
  [
    "grate",
    "prate",
    "The rusty hinges began to ____.",
    "He tends to ____ about politics.",
    ["Her constant complaints began to ____ on everyone in the room.", "wordOne"]
  ],
  ["ratify", "rectify", "The senate must ____ the treaty.", "We must ____ the error today."],
  ["perish", "parish", "The plants will ____ without water.", "The village ____ restored its church."],
  ["apprise", "appraise", "Please ____ me of any change.", "The expert will ____ the painting."],
  ["ardent", "arduous", "He made an ____ defense of the plan.", "The rescue was an ____ task."],
  [
    "gentile",
    "genteel",
    "The text refers to a ____ convert.",
    "Her ____ manners were polite, refined, and carefully proper.",
    ["He spoke in a ____ tone, soft and well-bred.", "wordTwo"],
    ["The tea room had a ____ atmosphere of quiet elegance.", "wordTwo"]
  ],
  ["venial", "venal", "The priest called it a ____ sin.", "The ____ official took bribes."],
  [
    "averse",
    "avert",
    "She is ____ to needless risk.",
    "Quick action can ____ disaster.",
    ["When the camera points at him, he will ____ his face.", "wordTwo"]
  ],
  ["averse", "aver", "He is ____ to loud parties.", "The witness will ____ that it happened."],
  [
    "avert",
    "aver",
    "The driver swerved to ____ a collision, narrowly avoiding the truck in front of her.",
    "The witness continued to ____ that he had seen the suspect, firmly insisting that his account was true.",
    ["She had to ____ her eyes from the dazzling headlights, turning her gaze toward the roadside.", "wordOne"]
  ],
  [
    "founder",
    "flounder",
    "The startup began to ____ and soon collapsed after costs rose.",
    "The speaker began to ____ under pressure.",
    ["Without funding, the project will ____ and be abandoned before launch.", "wordOne"],
    ["The rescue plan began to ____ when the partners withdrew, and the whole effort collapsed.", "wordOne"]
  ],
  ["vocation", "avocation", "Teaching became her ____.", "Painting remained his weekend ____."],
  ["lance", "lancet", "The knight raised his ____.", "The nurse used a ____ for the sample."],
  ["hurtle", "hurdle", "Rocks began to ____ down the slope.", "She cleared the final ____."],
  ["quash", "squash", "The judge moved to ____ the order.", "Please ____ the box flat."],
  ["steep", "steeple", "The trail was too ____ for bikes.", "The church ____ rose above town."],
  ["pumpkin", "bumpkin", "We carved a ____ for Halloween.", "The joke mocked him as a country ____."],
  [
    "pathos",
    "ethos",
    "The speech used ____ to stir pity.",
    "The school's ____ values service.",
    ["The film's final scene had real ____ because it showed the family's quiet grief.", "wordOne"],
    ["The charity ad relied on ____ by showing children waiting for clean water.", "wordOne"],
    ["The company's ____ emphasizes honesty, restraint, and public responsibility.", "wordTwo"],
    ["Her campaign tried to build an ____ of fairness, competence, and trust.", "wordTwo"]
  ],
  [
    "saddle",
    "bridle",
    "Before mounting, she checked the ____ on the horse's back.",
    "The rider adjusted the ____ around the horse's head and reins.",
    ["He tends to ____ at any criticism of his work.", "wordTwo"]
  ],
  ["saddle", "straddle", "He lifted the ____ onto the horse.", "Do not ____ the painted line."],
  ["incommensurable", "incommensurate", "The two values are ____ in kind.", "The reward was ____ with the risk."],
  ["naturalist", "naturist", "The ____ cataloged local birds.", "The resort welcomed every ____."],
  ["acolyte", "neophyte", "The priest trained a young ____.", "The club helped each ____ learn the rules."],
  ["haven", "heaven", "The harbor became a safe ____.", "The hymn speaks of ____."],
  ["coterie", "artery", "A small ____ controlled the club.", "The surgeon repaired the ____."],
  ["quandary", "quarry", "The offer left her in a ____.", "Workers cut stone from the ____."],
  ["progeny", "progenitor", "The mare's ____ won the race.", "The old device was the ____ of the modern phone."],
  ["displace", "replace", "The flood may ____ many families.", "Please ____ the broken tile."],
  ["ferment", "foment", "The juice will ____ in the barrel.", "The rumor helped ____ unrest."],
  [
    "instigate",
    "agitate",
    "The speech could ____ a protest.",
    "Do not ____ the patient with noise.",
    ["Gently ____ the bottle so the powder mixes with the liquid.", "wordTwo"]
  ],
  [
    "scrimp",
    "skimp",
    "They had to ____ to pay rent.",
    "Do not ____ on safety checks.",
    ["They had to ____ for years, saving every spare coin and giving up small luxuries to buy a home.", "wordOne"],
    ["Do not ____ on insulation; using too little will leave the house cold and increase heating bills.", "wordTwo"]
  ],
  ["impassioned", "impassive", "She gave an ____ plea.", "His face stayed ____ during the verdict."],
  ["stoical", "stolid", "He remained ____ despite pain.", "The ____ guard barely reacted."],
  ["execrable", "inexorable", "The food was ____.", "The tide made ____ progress."],
  [
    "expletive",
    "invective",
    "When he hit his thumb with the hammer, he shouted an ____ that made the children cover their ears.",
    "The editorial abandoned reasoned criticism and descended into ____, attacking the mayor with vicious personal insults.",
    ["The broadcaster replaced the actor's ____ with a loud beep so viewers would not hear the swear word.", "wordOne"],
    ["Her speech was a torrent of ____ against her former colleagues, filled with abusive accusations and contemptuous name-calling.", "wordTwo"]
  ],
  ["intelligent", "intelligible", "The dog seemed unusually ____.", "Her explanation was finally ____."],
  [
    "illegible",
    "intelligible",
    "The address on the envelope was ____, its smudged letters impossible to read.",
    "Once the speaker slowed down and explained the unfamiliar terms, her message became ____ to everyone in the room."
  ],
  ["compliant", "complaisant", "The form is ____ with the law.", "The ____ clerk happily changed the booking."],
  ["onerous", "ornery", "The contract placed ____ duties on us.", "The ____ mule refused to move."],
  [
    "precipitous",
    "precipitate",
    "The cliff had a ____ drop.",
    "Do not make a ____ decision.",
    ["The scandal could ____ a sudden crisis in the government.", "wordTwo"]
  ],
  ["precipitous", "precipice", "The road climbed a ____ slope.", "He stood near the ____."],
  ["reconcile", "conciliate", "They tried to ____ the accounts.", "The manager tried to ____ the angry customer with a sincere apology."],
  ["torpor", "stupor", "The heat left him in ____.", "The drug left him in a ____."],
  ["grub", "grubby", "The bird carried a ____ to its nest.", "His hands were ____ after digging."],
  ["grub", "scrub", "The campers ate simple ____.", "Use a brush to ____ the pan."],
  [
    "perspicacious",
    "perspicuous",
    "Her ____ analysis found the flaw.",
    "The manual was brief and ____.",
    ["The ____ judge saw the trick.", "wordOne"],
    ["Her summary was ____ and direct.", "wordTwo"]
  ],
  ["querulous", "garrulous", "The ____ customer complained again.", "The ____ guest talked for hours."],
  [
    "querulous",
    "quarrelsome",
    "In a ____ voice, the passenger kept whining that the seat was too hard, the air too cold, and the journey too long.",
    "The ____ neighbor picked fights over every minor disagreement, turning even a friendly conversation into a heated argument."
  ],
  ["sinuous", "arduous", "A ____ path followed the river.", "The exam was ____."],
  ["renege", "negate", "Do not ____ on your promise.", "One error can ____ the result."],
  ["renege", "denigrate", "He may ____ on the deal.", "The ad tried to ____ its rival."],
  ["apologue", "apothegm", "The fable was an ____ about greed.", "The proverb was a sharp ____."],
  ["oblivious", "obvious", "He was ____ to the danger.", "The answer was ____ to everyone."],
  ["diligent", "indigent", "The ____ student revised every draft.", "The shelter helped ____ residents."],
  ["indigent", "indignant", "The clinic treats ____ patients.", "She sounded ____ at the accusation."],
  ["abstruse", "obstruct", "The theory was too ____ for beginners.", "Do not ____ the doorway."],
  ["decry", "descry", "The critic will ____ the policy.", "From the hill, we could ____ a sail."],
  ["ebullient", "emollient", "Her ____ mood lifted the room.", "The cream had an ____ effect."],
  ["expound", "propound", "The lecturer will ____ the theory.", "The scholar will ____ a new theory."],
  ["contrive", "connive", "They tried to ____ a clever excuse.", "The officials seemed to ____ in the fraud."],
  ["minatory", "nugatory", "The letter had a ____ tone.", "The change was ____ in practice."],
  ["baleful", "doleful", "He gave a ____ glare.", "The singer used a ____ tone."],
  [
    "vindicate",
    "vindictive",
    "The evidence will ____ her claim.",
    "His reply sounded petty and ____.",
    ["The records will ____ the whistleblower.", "wordOne"],
    ["The note felt ____ rather than fair.", "wordTwo"]
  ],
  ["desease", "decease", "The old text spelled disease as ____.", "The policy ends upon the holder's ____."],
  ["frumpy", "grumpy", "The coat looked ____ and old.", "The sleepy child was ____."],
  ["fusty", "fustian", "The attic smelled ____.", "The speech was full of ____."],
  ["vicarious", "precarious", "He felt ____ pride in her victory.", "The ladder looked ____."],
  ["preclude", "prelude", "Rain may ____ the picnic.", "The song served as a ____."],
  ["efficacy", "efface", "The trial measured the drug's ____.", "Time can ____ old inscriptions."],
  ["peremptory", "preemptive", "The judge gave a ____ order.", "The army launched a ____ strike."],
  ["errant", "arrant", "An ____ ball broke the window.", "That is ____ nonsense."],
  ["regal", "regale", "The queen had a ____ bearing.", "He would ____ guests with stories."],
  ["quixotic", "inquisitive", "His ____ plan ignored reality.", "The ____ child asked why."],
  ["inquisitive", "quizzical", "The ____ reporter asked more questions.", "He gave a ____ look."],
  ["apposite", "opposite", "Her example was perfectly ____.", "The bank is on the ____ side."],
  ["bilk", "milk", "The scammer tried to ____ investors.", "Buy a carton of ____."],
  [
    "bemuse",
    "amuse",
    "The contradictory instructions would ____ even an experienced technician, leaving her unsure which step to follow.",
    "The clown tried to ____ the children with silly voices and balloon animals, making them laugh."
  ],
  [
    "bile",
    "bale",
    "The liver produces ____, a bitter liquid that helps the body digest fats.",
    "The farmer loaded a ____ of hay onto the truck, its tightly packed stalks held together with twine.",
    ["His reply was full of ____, expressing bitter anger through a stream of insults.", "wordOne"],
    ["The workers will ____ the dried hay, compressing it into bundles and tying them for storage.", "wordTwo"]
  ],
  ["canny", "uncanny", "The ____ investor waited for proof.", "The resemblance was ____."],
  ["fray", "flay", "The rope began to ____.", "The chef will ____ the fish."],
  ["salacious", "sagacious", "The article had ____ gossip.", "The elder gave ____ advice."],
  ["aspersion", "asperity", "Do not cast an ____ on her character.", "He answered with unusual ____."],
  ["carousal", "carousel", "The feast became a loud ____.", "The child rode the ____."],
  ["aspersion", "aversion", "The remark cast an ____ on him.", "She has an ____ to risk."],
  ["trench", "trenchant", "The soldiers dug a ____.", "Her review was brief and ____."],
  ["baleful", "baneful", "The cat gave a ____ stare.", "The policy had a ____ effect."],
  ["miscreant", "recreant", "The ____ fled the scene.", "The ____ knight abandoned his duty."],
  ["tepid", "trepid", "The soup was only ____.", "The ____ intern entered the room."],
  ["anathema", "antithesis", "Dishonesty is ____ to her.", "Chaos is the ____ of order."],
  ["headlong", "headstrong", "He rushed ____ into the plan.", "The ____ child refused advice."],
  ["inveigh", "inveigle", "The speaker began to ____ against taxes.", "He tried to ____ an invitation."],
  [
    "canon",
    "cannon",
    "The novel entered the literary ____.",
    "The fort fired a ____.",
    ["Shakespeare's plays are part of the English literary ____, the body of works widely regarded as classics.", "wordOne"]
  ],
  [
    "stalwart",
    "bulwark",
    "She was a ____ defender of rights.",
    "The law became a ____ against abuse.",
    ["The soldiers sheltered behind a stone ____, a thick defensive wall built to protect the fort.", "wordTwo"]
  ],
  [
    "wanton",
    "wonton",
    "The report condemned ____ waste.",
    "She ordered a bowl of ____ soup.",
    ["The soldiers committed an act of ____ cruelty, hurting defenseless villagers for their own amusement.", "wordOne"],
    ["He drove through the crowded street with ____ disregard for human life, ignoring every warning to slow down.", "wordOne"],
    ["The abandoned garden was filled with ____ growth, its vines spreading freely over every wall and path.", "wordOne"],
    ["The old novel described her as ____ for openly pursuing sexual pleasure, reflecting the moral judgments of its time.", "wordOne"]
  ],
  [
    "exult",
    "exalt",
    "The fans will ____ after the win.",
    "The poem will ____ humble work, celebrating the dignity of everyday labor and praising those who perform it.",
    ["The ceremony will ____ the rescuers as heroes, praising their courage and honoring their sacrifice.", "wordTwo"]
  ],
  ["exultation", "exaltation", "The room erupted in ____.", "The hymn expressed ____ of the divine."],
  ["rectitude", "turpitude", "The judge was known for ____.", "The crime showed moral ____."],
  [
    "doughty",
    "dowdy",
    "The ____ fighter would not yield.",
    "The dress looked ____.",
    ["The ____ guard stood firm against the attackers, bravely defending the gate despite his injuries.", "wordOne"],
    ["The curtains looked ____, their drab pattern and heavy frills making the room seem unfashionable.", "wordTwo"]
  ],
  [
    "common",
    "commonplace",
    "Rain is ____ in April.",
    "The idea was too ____ to impress.",
    ["The speech was full of ____ remarks about working hard, offering nothing fresh or memorable.", "wordTwo"],
    ["The novel's plot was disappointingly ____, repeating familiar twists without a single original idea.", "wordTwo"]
  ],
  ["intrepid", "insipid", "The ____ explorer crossed the dangerous ice alone, undaunted by the risk of falling through.", "The soup tasted ____, with so little seasoning that it seemed like warm water."],
  ["rowdy", "dowdy", "The ____ crowd shouted, shoved one another, and ignored repeated requests to quiet down.", "The room looked ____, furnished with shapeless chairs and drab, outdated curtains."],
  ["cortex", "vortex", "The brain's ____ is its outer layer of tissue, involved in perception and thought.", "Leaves spun in a ____, circling rapidly around the center of a swirling column of air."],
  [
    "defuse",
    "diffuse",
    "The negotiator helped ____ the crisis by calming both sides and persuading them to withdraw their threats.",
    "The frosted shade will ____ the light, spreading it softly throughout the room.",
    ["The bomb disposal team worked to ____ the unexploded bomb, making it safe so it could no longer explode.", "wordOne"],
    ["The scent of fresh coffee began to ____ through the house until it reached every room.", "wordTwo"]
  ],
  ["elicit", "illicit", "The interviewer asked gentle, open-ended questions to ____ honest answers from the nervous witness.", "The police seized ____ goods that had been smuggled across the border in violation of the law."],
  ["hyperbole", "hyperbola", "Saying that a five-minute delay ruined your entire life is ____, an obvious exaggeration.", "The graph of x squared minus y squared equals one is a ____, with two separate curved branches."],
  ["hyperbola", "parabola", "The graph of y equals one divided by x is a ____, with two separate branches approaching the axes.", "Ignoring air resistance, a thrown ball traces a ____, a single curved arc rising and then falling."],
  {
    words: ["ellipsis", "ellipse", "eclipse"],
    questions: [
      { sentence: "Use an ____ of three dots to show that words have been omitted from a quotation.", answer: "ellipsis" },
      { sentence: "The planet's orbit forms an ____, an oval curve rather than a perfect circle.", answer: "ellipse" },
      { sentence: "During the solar ____, the Moon passed between Earth and the Sun, blocking the Sun from view.", answer: "eclipse" },
      { sentence: "Her success as a novelist began to ____ her earlier achievements as a journalist, making them seem less remarkable.", answer: "eclipse" }
    ]
  },
  ["levee", "levity", "The river broke through the ____, the raised earth embankment built to keep floodwater out of town.", "A little ____ eased the tension when her gentle joke made everyone smile during the difficult meeting."],
  ["concave", "convex", "The inside of the spoon's bowl is ____, curving inward like a small hollow.", "The outside of a magnifying lens is ____, bulging outward rather than curving inward."],
  ["dilatory", "desultory", "The lawyer used ____ tactics, repeatedly requesting extensions to delay the trial.", "They had a ____ conversation, jumping from gardening to politics without following any topic for long."],
  [
    "dilettante",
    "debutante",
    "The critic dismissed him as a ____, dabbling in painting without seriously studying its techniques.",
    "The young ____ wore a formal gown to the ball where she was being introduced to high society.",
    ["As a ____, she practiced her curtsy before being formally presented at the society ball for the first time.", "wordTwo"]
  ],
  ["trot", "strut", "The horse began to ____, moving faster than a walk as diagonal pairs of legs stepped together.", "He began to ____ across the stage, chest out and chin raised as if everyone should admire him."],
  ["rowdy", "bawdy", "The ____ fans filled the street, shouting, jostling passersby, and banging on parked cars.", "The comic told a ____ joke full of sexual innuendo that made the adults blush."],
  [
    "extort",
    "exhort",
    "The gang tried to ____ money from the shopkeeper by threatening to burn down his store.",
    "The coach will ____ the exhausted team to keep trying, urging them on with an impassioned speech.",
    ["In her speech, she will ____ citizens to vote, urging them to make their voices heard rather than stay home.", "wordTwo"]
  ],
  ["indigent", "indigenous", "The charity serves ____ clients who cannot afford food, rent, or basic clothing.", "The tree is ____ to this forest, having grown here naturally long before imported species arrived."],
  ["mirth", "smirch", "The joke filled the room with ____, and even the solemn host joined in the laughter.", "The false accusation could ____ his name, staining a reputation built on years of honest service."],
  ["effusive", "diffuse", "She gave an ____ welcome, hugging every guest and pouring out enthusiastic expressions of delight.", "The report was too ____ to follow, wandering through irrelevant details instead of making a clear point."],
  ["effusive", "effulgent", "His praise was ____, overflowing with enthusiastic compliments and repeated declarations of admiration.", "The sunrise was ____, bathing the hills in brilliant golden light."],
  ["wary", "weary", "Be ____ of hidden fees: read the contract carefully before agreeing to pay.", "The long walk made us ____, and we sank into our chairs with aching legs."],
  ["apprehension", "reprehension", "She felt ____ before the exam, worrying that she might forget everything she had studied.", "The coach expressed his ____ of the cheating, sternly condemning the players' dishonest conduct."],
  ["galvanize", "tantalize", "The threat of losing their library may ____ residents into action, prompting them to organize a campaign.", "The smell of fresh bread will ____ the hungry guests, who can see the loaves but must wait to eat."],
  ["paltry", "poultry", "They offered a ____ sum for a month's work, barely enough to buy a day's groceries.", "The farm raises ____, including chickens, ducks, and turkeys for eggs and meat."],
  ["deprecation", "depredation", "His self-____ made the crowd laugh as he jokingly dismissed his own achievements as beginner's luck.", "The coastal village suffered pirate ____, with raiders looting homes and stealing supplies."],
  ["degradation", "depredation", "Years of pollution caused soil ____, reducing its fertility until crops could barely grow.", "The invading army's ____ ruined the farms as soldiers looted barns and stole livestock."],
  ["denigration", "abnegation", "The essay was full of ____ of her rival, belittling his achievements and calling him incompetent.", "The monk's vow required self-____: he renounced personal comforts and possessions to serve others."],
  [
    "inimitable",
    "inimical",
    "Her comic style is ____; countless performers have tried to copy it, but none can reproduce its charm.",
    "The policy is ____ to small businesses, burdening them with costs that threaten their survival.",
    ["He met the ambassador with an ____ stare, making his hostility plain before a word was spoken.", "wordTwo"],
    ["A climate of fear is ____ to free inquiry, discouraging people from questioning accepted ideas.", "wordTwo"]
  ],
  [
    "solipsism",
    "solecism",
    "The philosopher criticized ____, the view that only one's own mind is certain to exist.",
    "The sentence contains a ____: its singular subject is incorrectly paired with a plural verb.",
    ["The architect considered the plastic window frame a ____ in the medieval stone facade, a jarring departure from its traditional design.", "wordTwo"],
    ["Leaving the formal dinner without thanking the host was a social ____, a breach of accepted etiquette.", "wordTwo"]
  ],
  ["offshoot", "upshot", "The company launched an ____ of its research division, a separate business developing the division's inventions.", "The negotiations achieved nothing; the ____ was a costly delay rather than an agreement."],
  ["amity", "enmity", "The treaty restored ____ between the neighbors, allowing them to trade and cooperate as friends again.", "The bitter feud created lasting ____, and the families treated each other as enemies for decades."],
  ["disprove", "disapprove", "The new data may ____ the theory by showing that its central prediction is false.", "Her parents ____ of the plan because they believe leaving school would be a serious mistake."],
  [
    "rebuff",
    "rebut",
    "The senator gave the request a cool ____, refusing a meeting and sending the visitor away.",
    "The lawyer tried to ____ the claim by presenting records that directly contradicted it.",
    ["The manager chose to ____ their offer of help, brushing it aside with a curt wave of his hand.", "wordOne"]
  ],
  [
    "captious",
    "caption",
    "The ____ critic ignored the book's strengths and kept raising petty objections to tiny flaws.",
    "Write a photo ____ that identifies the people pictured and explains what they are doing.",
    ["Even a small typo triggered his ____ complaints.", "wordOne"]
  ],
  ["presumptuous", "sumptuous", "It was ____ to accept the invitation on her behalf without asking whether she wanted to attend.", "They served a ____ meal of elaborate dishes on silver platters, sparing no expense."],
  ["breach", "broach", "The stolen password caused a security ____, allowing an outsider to access confidential files.", "She will ____ the sensitive topic tomorrow, raising it gently to begin a discussion."],
  ["tamper", "hamper", "Do not ____ with the evidence by altering or removing anything before investigators arrive.", "Heavy snow may ____ travel by blocking roads and forcing trains to run slowly."],
  [
    "damper",
    "hamper",
    "Rain put a ____ on the picnic, spoiling everyone's cheerful mood.",
    "The shortage of supplies could ____ progress, slowing construction for weeks.",
    ["The technician adjusted the ____ in the furnace flue, turning the metal plate to regulate the draft.", "wordOne"],
    ["The news of the canceled concert put a ____ on the celebration, dampening everyone's excitement.", "wordOne"],
    ["She tossed her dirty clothes into the laundry ____, a large basket beside the washing machine.", "wordTwo"]
  ],
  ["epilogue", "epigraph", "The novel ends with an ____ describing the characters' lives ten years after the main story.", "The chapter opens with an ____, a short quotation from another writer that introduces its theme."],
  ["epilogue", "prologue", "After the final scene, an actor delivers an ____ reflecting on how the story ended.", "Before the first scene, a narrator delivers a ____ explaining the events that led to the story."],
  [
    "monograph",
    "monogram",
    "The scholar published a ____ devoted entirely to the history of one medieval monastery.",
    "The towel had a stitched ____ combining the owner's initials into a decorative design.",
    ["The mathematician published a ____ on spectral graph theory, a detailed scholarly book exploring the eigenvalues of graphs.", "wordOne"]
  ],
  ["frisk", "brisk", "The guard had to ____ each visitor, patting down their clothing to check for hidden weapons.", "We took a ____ walk, moving at a quick, energetic pace that left us pleasantly warm."],
  ["neoplasm", "pleonasm", "The scan revealed a ____, an abnormal growth of tissue that required further examination.", "The phrase 'free gift' was criticized as a ____ because 'free' repeats an idea already implied by 'gift'."],
  [
    "cognate",
    "magnate",
    "Spanish and Italian are ____ languages, both having developed from Latin.",
    "The steel ____, a wealthy industrialist who owned several mills, bought the football team.",
    ["The conference brought together researchers from psychology and ____ disciplines, including neuroscience and education.", "wordOne"]
  ],
  [
    "dower",
    "dowry",
    "In the historical estate record, the widow claimed her ____, a share of her late husband's property for her support.",
    "The historical account describes a bride bringing money and household goods to her marriage as a ____.",
    ["Ohio still recognizes ____, and its law applies to either spouse.", "wordOne"]
  ],
  [
    "scrooge",
    "scrounge",
    "Do not be a ____ about tips; refusing to leave a penny after excellent service is miserly.",
    "With no money for new equipment, we had to ____ for spare parts in discarded machines.",
    ["Everyone called him a ____ because he refused to turn on the heating even when his guests were shivering.", "wordOne"],
    ["Having forgotten his wallet, he tried to ____ a few coins from his friends to pay for the bus.", "wordTwo"]
  ],
  ["edema", "enema", "The injury caused ankle ____, with fluid building up in the tissues and making the joint swell.", "The nurse administered an ____, introducing fluid into the rectum to help empty the bowel."],
  [
    "wry",
    "awry",
    "She gave a ____ smile at the irony of missing her own lecture on punctuality.",
    "The plan went ____ when the bus broke down, leaving the group stranded instead of at the museum.",
    ["After the roof began leaking during his housewarming party, he made the ____ remark, 'At least the indoor pool is free,' finding dry humor in his misfortune.", "wordOne"]
  ],
  [
    "dudgeon",
    "dungeon",
    "He left in high ____ after the insult, visibly outraged and declaring that he deserved respect.",
    "The prisoner sat in a ____, a dark underground cell beneath the castle.",
    ["She took the accusation of cheating in high ____, angrily insisting that her honesty had never before been questioned.", "wordOne"]
  ],
  ["detract", "detractor", "The single typo did not ____ from the essay's quality; its argument was still clear and convincing.", "Even a popular leader has a ____, someone who publicly criticizes and belittles their achievements."],
  ["adjoin", "adjourn", "The new kitchen will ____ the hall, sharing a wall and connecting through a doorway.", "The judge will ____ court until Monday, suspending the proceedings for the weekend."],
  [
    "obeisance",
    "abeyance",
    "The courtier made an ____, bowing deeply before the queen as a sign of respect.",
    "The rule was held in ____ while the appeal was considered, so enforcement was temporarily suspended.",
    ["The minister paid ____ to the party leader, praising his every decision and never daring to disagree.", "wordOne"],
    ["Plans for the new library remained in ____ until funding could be secured, with all construction temporarily on hold.", "wordTwo"]
  ],
  ["bawdy", "dowdy", "The play included a ____ song filled with sexual jokes that made the audience blush.", "The suit looked ____, with a shapeless cut and a drab pattern decades out of fashion."],
  ["doughty", "doughy", "The ____ captain held the line despite overwhelming odds, refusing to retreat even after being wounded.", "The bread was still ____ inside, soft, sticky, and clearly underbaked."],
  ["mélange", "menagerie", "The stew was a ____ of flavors, mixing smoky spices, sweet vegetables, and tangy lemon.", "The estate kept a private ____, a collection of exotic animals including monkeys and peacocks."],
  [
    "infraction",
    "fractious",
    "Parking beside the no-parking sign is a minor ____, a violation punishable by a fine.",
    "The ____ committee argued all night, its members snapping at one another and refusing to cooperate.",
    ["The ____ crowd kept interrupting the speaker.", "wordTwo"],
    ["The toddler was ____ after missing his nap.", "wordTwo"]
  ],
  ["sedulous", "acidulous", "The ____ assistant checked every detail for hours, patiently verifying each figure until the report was accurate.", "The sauce tasted ____, with a slightly sour tang from the lemon juice."],
  ["console", "condole", "She tried to ____ her friend after his rejection, offering comforting words to ease his distress.", "Neighbors came to ____ with the family after the funeral, expressing sympathy for their loss."],
  ["condole", "condone", "We went to ____ with the bereaved parents, expressing our sorrow at their loss.", "The school will not ____ cheating: it treats dishonesty as unacceptable and punishes every proven case."],
  ["wreak", "wreck", "The storm may ____ havoc, causing widespread damage and disruption across the region.", "The jagged reef could ____ the ship, tearing its hull apart and leaving it beyond repair."],
  ["intolerable", "intolerant", "The noise became ____, so unbearable that residents could neither sleep nor hold a conversation.", "He was ____ of dissent, refusing to let anyone express an opinion different from his own."],
  ["apothegm", "apothem", "The elder offered a concise ____, 'Look before you leap,' to warn against acting without thought.", "The regular polygon's ____ runs from its center perpendicular to the midpoint of a side."],
  [
    "scrooge",
    "stooge",
    "He acted like a ____ with money, refusing even a small donation despite his enormous wealth.",
    "The villain used him as a ____, tricking him into carrying out the scheme and taking the blame.",
    ["The gangster sent a ____ to intimidate a witness, using the obedient underling to do his dirty work.", "wordTwo"],
    ["He's just a ____ for the oil industry, repeating the companies' talking points while pretending to offer an independent opinion.", "wordTwo"],
    ["The journalist called the spokesman a government ____, accusing him of blindly defending every official decision instead of thinking for himself.", "wordTwo"]
  ],
  ["snob", "snub", "The ____ refused to speak to anyone without an expensive car or a prestigious job.", "Do not ____ the new student by deliberately ignoring her greeting and excluding her from the group."],
  ["dork", "dock", "He called himself a lovable ____, laughing at his own social awkwardness and clumsy attempts to flirt.", "The boat tied up at the ____, where passengers stepped ashore onto the wooden platform."],
  ["democrat", "Democrat", "A committed ____ supports government chosen by the people, regardless of political party.", "The ____ won the Senate race as the candidate of the U.S. Democratic Party."],
  ["statue", "statute", "The bronze ____ depicted the town's founder standing on a pedestal in the park.", "The legislature passed a new ____ making it illegal to dump waste in the river."],
  [
    "blight",
    "plight",
    "The fungus caused potato ____, a plant disease that blackened the leaves and destroyed the crop.",
    "The refugees described their ____, trapped without shelter, clean water, or a safe route home.",
    ["Corruption was a ____ on the city's reputation, destroying public trust and driving away investors.", "wordOne"]
  ],
  ["epigraph", "epitaph", "The essay begins with an ____, a short quotation from a poet that introduces its central idea.", "The tombstone bore a short ____ honoring the person buried beneath it."]
];

const confusingWordPairNotes: Record<string, ConfusingWordNote> = {
  "quantile-quartile": {
    paragraphs: [
      "Both quantiles and quartiles are values that divide sorted data into proportions.",
      "For example, consider the sorted scores:",
      "[60, 71, 79, 82, 85, 87, 90, 100]"
    ],
    bullets: [
      "The 0.9 quantile (90th percentile) is a value below which approximately 90% of the data fall, with approximately 10% above it.",
      "The first quartile (Q1, or 0.25 quantile) is a value below which approximately 25% of the data fall, with approximately 75% above it."
    ]
  },
  "obnoxious-noxious": "Both words can mean offensive or unpleasant, but obnoxious is more common and idiomatic for annoying behavior. Use noxious for something harmful or poisonous—for example, an obnoxious guest but noxious fumes.",
  "emboss-engrave": "Embossing raises a design above the surface. Engraving cuts a design into the surface. For example, embossed paper has raised lettering; an engraved metal plate has cut grooves.",
  "expletive-invective": {
    table: {
      columns: ["", "Expletive", "Invective"],
      rows: [
        ["Meaning", "A swear word or curse", "Harsh, insulting, or abusive language"],
        ["Emphasis", "Profanity", "Verbal attack"],
        ["Typical form", "A single word", "A string of insults or angry remarks"]
      ]
    },
    heading: "Key distinction",
    examples: [
      'Expletive: "Damn!" or "Fuck!"',
      'Invective: "You\'re an incompetent, dishonest fool who has ruined everything!"'
    ],
    conclusion: "An invective can contain expletives, but it doesn't have to."
  },
  "factious-factitious": "Faction → Factious → Fighting between factions.",
  "statue-statute":
    "A bill is a proposed law; a statute is an enacted law. Example: A river-protection bill becomes a statute when enacted.",
  "doughty-dowdy": "In doughty, the t is pronounced /t/, not /d/. Say DOW-tee, not DOW-dee.",
  "doughty-doughy": "In doughty, the t is pronounced /t/, not /d/. Say DOW-tee, not DOW-dee.",
  "progeny-progenitor": "The progenitor produces progeny.",
  "vocation-avocation":
    "A vocation is your main calling, profession, or life work. An avocation is a hobby or side interest. One memory hook: the initial a- can suggest a negation of vocation, so the main job becomes a pastime."
};

const confusingWordPairNoteImages: Record<string, ConfusingWordPair["noteImage"]> = {
  "quantile-quartile": {
    src: "/images/quantile-quartile-bars.svg",
    alt: "A bar divided into 90% and 10%, with an arrow marking the 0.9 quantile at the boundary. Below it, a bar divided into four 25% sections, with an arrow marking the first quartile after the first section.",
    width: 480,
    height: 320,
    wide: true
  },
  "apothegm-apothem": {
    src: "/images/apothem.png",
    alt: "A regular hexagon with its apothem marked in red from the center perpendicular to a side.",
    width: 574,
    height: 488
  }
};

const confusingWordPairNoteGalleries: Record<string, ConfusingWordPair["noteImages"]> = {
  "emboss-engrave": [
    {
      src: "/images/embossed-floral-design.png",
      alt: "An embossed floral design raised above the surface of cream-colored paper.",
      width: 422,
      height: 436,
      caption: "Embossed — raised above the surface"
    },
    {
      src: "/images/engraved-floral-metal.png",
      alt: "AI-generated close-up demonstrating a floral pattern engraved as recessed grooves in silver-colored metal.",
      width: 1254,
      height: 1254,
      caption: "Engraved — cut into the surface"
    }
  ],
  "emboss-deboss": [
    {
      src: "/images/embossed-floral-design.png",
      alt: "An embossed floral design raised above the surface of cream-colored paper.",
      width: 422,
      height: 436,
      caption: "Embossed — raised above the surface"
    },
    {
      src: "/images/debossed-lettering.png",
      alt: "Debossed lettering pressed below the surface of white stationery.",
      width: 444,
      height: 456,
      caption: "Debossed — pressed below the surface"
    }
  ]
};

/**
 * Converts display text into a stable URL-safe slug segment.
 *
 * Example: `slugifyWord("New Word")` returns `"new-word"`.
 * Accents are removed so `slugifyWord("mélange")` preserves the existing `"melange"` slug.
 */
function slugifyWord(word: string): string {
  return word.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/**
 * Builds unique practice cards from compact pairs or explicit word groups.
 *
 * Example: the three-word group becomes `jagged-rugged-ragged`,
 * while `confusingWordPairNotes["coma-comma"] = "Use coma for unconsciousness."` adds a card note.
 * Every word has its own IPA line, e.g. `coma / ˈkoʊmə /` and `comma / ˈkɑmə /`.
 * The `apothegm-apothem` card includes an image-only note showing an apothem.
 * The `emboss-deboss` note shows labeled photographs in left-to-right comparison order.
 */
function buildConfusingWordPairs(rows: (ConfusingWordPairRow | ConfusingWordGroupRow)[]): ConfusingWordPair[] {
  const slugCounts = new Map<string, number>();

  return rows.map((row) => {
    let words: [string, string, ...string[]];
    let questions: ConfusingWordQuestions;
    if ("words" in row) {
      words = [row.words[0].trim(), row.words[1].trim(), ...row.words.slice(2).map((word) => word.trim())];
      questions = row.questions;
    } else {
      // Preserve existing compact pair rows and their slugs while allowing explicit groups.
      const [wordOne, wordTwo, sentenceOne, sentenceTwo, ...extraQuestions] = row;
      words = [wordOne.trim(), wordTwo.trim()];
      questions = [
        { sentence: sentenceOne, answer: words[0] },
        { sentence: sentenceTwo, answer: words[1] },
        ...extraQuestions.map(([sentence, answerKey]) => ({
          sentence,
          answer: answerKey === "wordOne" ? words[0] : words[1]
        }))
      ];
    }
    const baseSlug = words.map(slugifyWord).join("-");
    const slugCount = slugCounts.get(baseSlug) ?? 0;
    const slug = slugCount === 0 ? baseSlug : `${baseSlug}-${slugCount + 1}`;
    slugCounts.set(baseSlug, slugCount + 1);

    return {
      slug,
      words,
      // Exact spelling preserves stress distinctions such as August versus august.
      pronunciations: words.map((word) => wordPronunciations[word]),
      note: confusingWordPairNotes[slug],
      noteImage: confusingWordPairNoteImages[slug],
      noteImages: confusingWordPairNoteGalleries[slug],
      questions
    };
  });
}

// Sort by the first word (e.g. abstruse before acerbic), then the second word for matching first words.
// Case and accents do not affect alphabetical order; existing slugs stay stable for saved selections.
export const confusingWordPairs: ConfusingWordPair[] = buildConfusingWordPairs(confusingWordPairRows).sort(
  (left, right) =>
    left.words[0].localeCompare(right.words[0], "en", { sensitivity: "base" }) ||
    left.words[1].localeCompare(right.words[1], "en", { sensitivity: "base" })
);

/**
 * Finds a confusing word pair by its stable URL slug.
 *
 * Example: `getConfusingWordPair("coma-comma")` returns the coma/comma practice pair.
 */
export function getConfusingWordPair(slug: string): ConfusingWordPair | undefined {
  return confusingWordPairs.find((pair) => pair.slug === slug);
}
