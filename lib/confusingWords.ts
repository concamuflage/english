export type ConfusingWordQuestion = {
  sentence: string;
  answer: string;
};

export type ConfusingWordQuestions = [ConfusingWordQuestion, ConfusingWordQuestion, ...ConfusingWordQuestion[]];

export type ConfusingWordPair = {
  slug: string;
  wordOne: string;
  wordTwo: string;
  questions: ConfusingWordQuestions;
  note?: string;
};

type ConfusingWordAnswerKey = "wordOne" | "wordTwo";

type ConfusingWordExtraQuestion = readonly [sentence: string, answerKey: ConfusingWordAnswerKey];

type ConfusingWordPairRow = readonly [string, string, string, string, ...ConfusingWordExtraQuestion[]];

const confusingWordPairRows: ConfusingWordPairRow[] = [
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
  [
    "rugged",
    "ragged",
    "The hikers crossed ____ ground.",
    "His coat looked torn and ____.",
    ["The phone has a ____ case for outdoor work.", "wordOne"],
    ["His ____ face showed years of mountain weather.", "wordOne"]
  ],
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
  ["exceptional", "exceptionable", "Her results were ____.", "His rude comment was ____."],
  ["portable", "potable", "Bring a ____ charger.", "The hikers need ____ water."],
  [
    "orotund",
    "rotund",
    "The professor's ____ voice sounded grand, formal, and resonant.",
    "The ____ jar sat on the shelf.",
    ["The baby had a ____ belly and round cheeks.", "wordTwo"],
    ["The singer's ____ voice was full, round, and warm.", "wordTwo"]
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
  ["jagged", "ragged", "The glass had a ____ edge.", "The flag was old and ____."],
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
  ["scrimp", "skimp", "They had to ____ to pay rent.", "Do not ____ on safety checks."],
  ["impassioned", "impassive", "She gave an ____ plea.", "His face stayed ____ during the verdict."],
  ["stoical", "stolid", "He remained ____ despite pain.", "The ____ guard barely reacted."],
  ["execrable", "inexorable", "The food was ____.", "The tide made ____ progress."],
  [
    "fractious",
    "factitious",
    "The ____ toddler refused to nap.",
    "The scandal was based on ____ claims.",
    ["The ____ committee argued over every small detail.", "wordOne"],
    ["The lab created a ____ mineral that looked natural but was artificial.", "wordTwo"]
  ],
  ["intelligent", "intelligible", "The dog seemed unusually ____.", "Her explanation was finally ____."],
  [
    "pliable",
    "pliant",
    "Warm wax is ____ enough to bend and shape by hand.",
    "The ____ assistant obeyed every order without question.",
    ["The leather became ____ after oiling, so it folded without cracking.", "wordOne"],
    ["The dictator preferred ____ advisers who yielded to every demand.", "wordTwo"]
  ],
  ["pliant", "compliant", "The wire stayed ____ after heating.", "The company became ____ with the rule."],
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
  ["perspicacious", "perspicuous", "Her ____ analysis found the flaw.", "The manual was brief and ____."],
  ["querulous", "garrulous", "The ____ customer complained again.", "The ____ guest talked for hours."],
  ["sinuous", "arduous", "A ____ path followed the river.", "The exam was ____."],
  ["renege", "negate", "Do not ____ on your promise.", "One error can ____ the result."],
  ["renege", "denigrate", "He may ____ on the deal.", "The ad tried to ____ its rival."],
  ["apologue", "apothegm", "The fable was an ____ about greed.", "The proverb was a sharp ____."],
  ["oblivious", "obvious", "He was ____ to the danger.", "The answer was ____ to everyone."],
  ["diligent", "indigent", "The ____ student revised every draft.", "The shelter helped ____ residents."],
  ["indigent", "indignant", "The clinic treats ____ patients.", "She sounded ____ at the accusation."],
  ["abstruse", "obstruct", "The theory was too ____ for beginners.", "Do not ____ the doorway."],
  ["decry", "descry", "The critic will ____ the policy.", "From the hill, we could ____ a sail."],
  ["esurient", "prurient", "The ____ child asked for more food.", "The tabloid fed ____ curiosity."],
  ["ebullient", "emollient", "Her ____ mood lifted the room.", "The cream had an ____ effect."],
  ["expound", "propound", "The lecturer will ____ the theory.", "The scholar will ____ a new theory."],
  ["contrive", "connive", "They tried to ____ a clever excuse.", "The officials seemed to ____ in the fraud."],
  ["minatory", "nugatory", "The letter had a ____ tone.", "The change was ____ in practice."],
  ["baleful", "doleful", "He gave a ____ glare.", "The singer used a ____ tone."],
  ["vindicate", "vindictive", "The evidence will ____ her claim.", "His reply sounded petty and ____."],
  ["desease", "decease", "The old text spelled disease as ____.", "The policy ends upon the holder's ____."],
  ["frumpy", "grumpy", "The coat looked ____ and old.", "The sleepy child was ____."],
  ["fusty", "fustian", "The attic smelled ____.", "The speech was full of ____."],
  ["perspicacious", "perspicuous", "The ____ judge saw the trick.", "Her summary was ____ and direct."],
  ["vicarious", "precarious", "He felt ____ pride in her victory.", "The ladder looked ____."],
  ["preclude", "prelude", "Rain may ____ the picnic.", "The song served as a ____."],
  ["efficacy", "efface", "The trial measured the drug's ____.", "Time can ____ old inscriptions."],
  ["peremptory", "preemptive", "The judge gave a ____ order.", "The army launched a ____ strike."],
  ["errant", "arrant", "An ____ ball broke the window.", "That is ____ nonsense."],
  ["regal", "regale", "The queen had a ____ bearing.", "He would ____ guests with stories."],
  ["deferent", "deferential", "The ____ manner showed respect.", "She was ____ toward her mentor."],
  ["quixotic", "inquisitive", "His ____ plan ignored reality.", "The ____ child asked why."],
  ["inquisitive", "quizzical", "The ____ reporter asked more questions.", "He gave a ____ look."],
  ["apposite", "opposite", "Her example was perfectly ____.", "The bank is on the ____ side."],
  ["bilk", "milk", "The scammer tried to ____ investors.", "Buy a carton of ____."],
  ["expletive", "invective", "The angry driver shouted an ____.", "The column was filled with ____."],
  ["canny", "uncanny", "The ____ investor waited for proof.", "The resemblance was ____."],
  ["fray", "flay", "The rope began to ____.", "The chef will ____ the fish."],
  ["salacious", "sagacious", "The article had ____ gossip.", "The elder gave ____ advice."],
  ["aspersion", "asperity", "Do not cast an ____ on her character.", "He answered with unusual ____."],
  ["carousal", "carousel", "The feast became a loud ____.", "The child rode the ____."],
  ["aspersion", "aversion", "The remark cast an ____ on him.", "She has an ____ to risk."],
  ["trench", "trenchant", "The soldiers dug a ____.", "Her review was brief and ____."],
  ["baleful", "baneful", "The cat gave a ____ stare.", "The policy had a ____ effect."],
  ["miscreant", "recreant", "The ____ fled the scene.", "The ____ knight abandoned his duty."],
  ["vindicate", "vindictive", "The records will ____ the whistleblower.", "The note felt ____ rather than fair."],
  ["tepid", "trepid", "The soup was only ____.", "The ____ intern entered the room."],
  ["anathema", "antithesis", "Dishonesty is ____ to her.", "Chaos is the ____ of order."],
  ["headlong", "headstrong", "He rushed ____ into the plan.", "The ____ child refused advice."],
  ["inveigh", "inveigle", "The speaker began to ____ against taxes.", "He tried to ____ an invitation."],
  ["canon", "cannon", "The novel entered the literary ____.", "The fort fired a ____."],
  ["stalwart", "bulwark", "She was a ____ defender of rights.", "The law became a ____ against abuse."],
  ["wanton", "wonton", "The report condemned ____ waste.", "She ordered a bowl of ____ soup."],
  ["abyssal", "abysmal", "The fish lives in the ____ zone.", "The team's record was ____."],
  ["exult", "exalt", "The fans will ____ after the win.", "The poem will ____ humble work."],
  ["exultation", "exaltation", "The room erupted in ____.", "The hymn expressed ____ of the divine."],
  ["rectitude", "turpitude", "The judge was known for ____.", "The crime showed moral ____."],
  ["doughty", "dowdy", "The ____ fighter would not yield.", "The dress looked ____."],
  ["common", "commonplace", "Rain is ____ in April.", "The idea was too ____ to impress."],
  ["obnoxious", "noxious", "The ____ guest insulted everyone.", "The factory released ____ fumes."],
  ["intrepid", "insipid", "The ____ explorer crossed the ice.", "The soup tasted ____."],
  ["rowdy", "dowdy", "The ____ crowd shouted all night.", "The room looked ____ and dull."],
  ["cortex", "vortex", "The brain's ____ processes signals.", "Leaves spun in the ____."],
  ["defuse", "diffuse", "The negotiator helped ____ the crisis.", "The lamp will ____ the light."],
  ["elicit", "illicit", "The survey will ____ honest answers.", "The police found ____ goods."],
  ["hyperbole", "hyperbola", "Calling it a disaster is ____.", "The graph shows a ____."],
  ["hyperbola", "parabola", "The equation draws a ____.", "The ball followed a ____."],
  ["ellipse", "ellipsis", "The orbit forms an ____.", "Use an ____ to show omitted words."],
  ["levee", "levity", "The river broke through the ____.", "A little ____ eased the tension."],
  ["concave", "convex", "The spoon's bowl is ____.", "The lens has a ____ surface."],
  ["dilatory", "desultory", "The lawyer used ____ tactics.", "They had a ____ conversation."],
  ["dilettante", "debutante", "The critic dismissed him as a ____.", "The ____ entered society that season."],
  ["trot", "strut", "The horse began to ____.", "The model began to ____."],
  ["rowdy", "bawdy", "The ____ fans filled the street.", "The comic told a ____ joke."],
  ["extort", "exhort", "The gang tried to ____ money.", "The coach will ____ the team to fight."],
  ["indigent", "indigenous", "The charity serves ____ clients.", "The tree is ____ to this forest."],
  ["fathomless", "unfathomable", "The well seemed ____.", "Her silence was ____."],
  ["mirth", "smirch", "The joke filled the room with ____.", "The scandal could ____ his name."],
  ["effusive", "diffuse", "She gave an ____ welcome.", "The report was too ____ to follow."],
  ["effusive", "effulgent", "His praise was ____.", "The sunrise was ____."],
  ["wary", "weary", "Be ____ of hidden fees.", "The long walk made us ____."],
  ["apprehension", "reprehension", "She felt ____ before the exam.", "The coach's ____ was stern."],
  ["galvanize", "tantalize", "The crisis may ____ voters.", "The smell will ____ hungry guests."],
  ["paltry", "poultry", "They offered a ____ sum.", "The farm raises ____."],
  ["deprecation", "depredation", "His self-____ made the crowd laugh.", "The village suffered pirate ____."],
  ["degradation", "depredation", "Pollution caused soil ____.", "The army's ____ ruined the farms."],
  ["denigration", "abnegation", "The essay was full of ____.", "The vow required self-____."],
  ["inimitable", "inimical", "Her style is ____.", "The policy is ____ to growth."],
  ["solipsism", "solecism", "The philosopher criticized ____.", "The sentence contains a ____."],
  ["offshoot", "upshot", "The company launched an ____.", "The ____ was a costly delay."],
  ["amity", "enmity", "The treaty restored ____.", "The feud created lasting ____."],
  ["disprove", "disapprove", "The data may ____ the theory.", "Her parents ____ of the plan."],
  ["rebuff", "spurn", "He met every request with a ____.", "She chose to ____ the offer."],
  ["rebuff", "rebut", "The senator gave a cool ____.", "The lawyer tried to ____ the claim."],
  ["captious", "caption", "The ____ critic found tiny faults.", "Write a clear photo ____."],
  ["scrimp", "skimp", "They had to ____ for years.", "Do not ____ on insulation."],
  ["presumptuous", "sumptuous", "It was ____ to speak for her.", "They served a ____ meal."],
  ["breach", "broach", "The leak caused a security ____.", "She will ____ the topic tomorrow."],
  ["tamper", "hamper", "Do not ____ with the evidence.", "Snow may ____ travel."],
  ["damper", "hamper", "Rain put a ____ on the picnic.", "The delay could ____ progress."],
  ["epilogue", "epigraph", "The novel ends with an ____.", "The chapter opens with an ____."],
  ["epilogue", "prologue", "The play closes with an ____.", "The play begins with a ____."],
  ["monograph", "monogram", "The scholar published a ____.", "The towel had a stitched ____."],
  ["frisk", "brisk", "The guard had to ____ each visitor.", "We took a ____ walk."],
  ["neoplasm", "pleonasm", "The scan revealed a ____.", "The phrase was criticized as a ____."],
  ["cognate", "magnate", "Spanish and Italian have many ____ words.", "The steel ____ bought the team."],
  ["dower", "dowry", "The widow claimed her ____.", "The family prepared a ____."],
  ["scrooge", "scrounge", "Do not be a ____ about tips.", "We had to ____ for spare parts."],
  ["edema", "enema", "The injury caused ankle ____.", "The doctor ordered an ____."],
  ["brash", "brazen", "The ____ intern interrupted the meeting.", "The thief made a ____ escape."],
  ["wry", "awry", "She gave a ____ smile.", "The plan went ____."],
  ["dudgeon", "dungeon", "He left in high ____.", "The prisoner sat in a ____."],
  ["detract", "detractor", "The typo did not ____ from the essay.", "Every leader has a ____."],
  ["dismal", "abysmal", "The weather was ____.", "The service was ____."],
  ["adjoin", "adjourn", "The kitchen will ____ the hall.", "The judge will ____ court."],
  ["obeisance", "abeyance", "The courtier made an ____.", "The rule was held in ____."],
  ["bawdy", "dowdy", "The play included a ____ song.", "The suit looked ____."],
  ["doughty", "doughy", "The ____ captain held the line.", "The bread was still ____ inside."],
  ["melange", "menagerie", "The stew was a ____ of flavors.", "The estate kept a private ____."],
  ["infraction", "fractious", "Parking there is a minor ____.", "The ____ meeting lasted all night."],
  ["sedulous", "acidulous", "The ____ assistant checked every detail.", "The sauce tasted ____."],
  ["console", "condole", "She tried to ____ her friend.", "Neighbors came to ____ with the family."],
  ["condole", "condone", "We went to ____ after the loss.", "The school will not ____ cheating."],
  ["wreak", "wreck", "The storm may ____ havoc.", "The reef could ____ the ship."],
  ["intolerable", "intolerant", "The noise became ____.", "He was ____ of dissent."],
  ["sensibility", "sensitivity", "The novel reflects modern ____.", "The test measures skin ____."],
  ["apothegm", "apothem", "The wise saying was an ____.", "The polygon's ____ was measured."],
  ["doughty", "dowdy", "The ____ guard stood firm.", "The curtains looked ____."],
  ["scrooge", "stooge", "He acted like a ____ with money.", "The villain used him as a ____."],
  ["snob", "snub", "The ____ ignored cheap brands.", "Do not ____ the new student."],
  ["dork", "dock", "He called himself a lovable ____.", "The boat tied up at the ____."],
  ["democrat", "Democrat", "A true ____ supports popular rule.", "The ____ won the Senate race."],
  ["statue", "statute", "The bronze ____ stood in the park.", "The new ____ changed the penalty."],
  ["blight", "plight", "The fungus caused potato ____.", "The refugees described their ____."],
  ["epigraph", "epitaph", "The essay begins with an ____.", "The tombstone bore a short ____."]
];

const confusingWordPairNotes: Record<string, string> = {
  "pliable-pliant":
    "Pliable and pliant can often be used interchangeably. For materials, they mean easy to bend or shape. For people, they mean easily influenced, easily led, or too willing to yield. In all sentences on this card, both words can be correct.",
  "progeny-progenitor": "The progenitor produces progeny.",
  "vocation-avocation":
    "A vocation is your main calling, profession, or life work. An avocation is a hobby or side interest. One memory hook: the initial a- can suggest a negation of vocation, so the main job becomes a pastime."
};

/**
 * Converts display text into a stable URL-safe slug segment.
 *
 * Example: `slugifyWord("New Word")` returns `"new-word"`.
 */
function slugifyWord(word: string): string {
  return word.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/**
 * Builds unique practice cards from compact word-pair rows.
 *
 * Example: duplicate `doughty / dowdy` rows become `doughty-dowdy` and `doughty-dowdy-2`,
 * while `confusingWordPairNotes["coma-comma"] = "Use coma for unconsciousness."` adds a card note.
 */
function buildConfusingWordPairs(rows: ConfusingWordPairRow[]): ConfusingWordPair[] {
  const slugCounts = new Map<string, number>();

  return rows.map(([wordOne, wordTwo, sentenceOne, sentenceTwo, ...extraQuestions]) => {
    const trimmedWordOne = wordOne.trim();
    const trimmedWordTwo = wordTwo.trim();
    const baseSlug = `${slugifyWord(wordOne)}-${slugifyWord(wordTwo)}`;
    const slugCount = slugCounts.get(baseSlug) ?? 0;
    const slug = slugCount === 0 ? baseSlug : `${baseSlug}-${slugCount + 1}`;
    slugCounts.set(baseSlug, slugCount + 1);
    const questions: ConfusingWordQuestions = [
      {
        sentence: sentenceOne,
        answer: trimmedWordOne
      },
      {
        sentence: sentenceTwo,
        answer: trimmedWordTwo
      },
      ...extraQuestions.map(([sentence, answerKey]) => ({
        sentence,
        answer: answerKey === "wordOne" ? trimmedWordOne : trimmedWordTwo
      }))
    ];

    return {
      slug,
      wordOne: trimmedWordOne,
      wordTwo: trimmedWordTwo,
      note: confusingWordPairNotes[slug],
      questions
    };
  });
}

export const confusingWordPairs: ConfusingWordPair[] = buildConfusingWordPairs(confusingWordPairRows);

/**
 * Finds a confusing word pair by its stable URL slug.
 *
 * Example: `getConfusingWordPair("coma-comma")` returns the coma/comma practice pair.
 */
export function getConfusingWordPair(slug: string): ConfusingWordPair | undefined {
  return confusingWordPairs.find((pair) => pair.slug === slug);
}
