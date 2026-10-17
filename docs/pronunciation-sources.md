# Vocabulary pronunciations

Every practice-card heading displays one word and its IPA per line, enclosed in
spaced slashes. For example, `coma / ˈkoʊmə /` appears above
`comma / ˈkɑmə /`. Pair-selection buttons keep their compact word-only labels.

Pronunciations live in `lib/wordPronunciations.ts`, keyed by exact display spelling.
When adding a word to `lib/confusingWords.ts`, add its pronunciation there too.
Case matters: `August` (the month) and `august` (impressive or dignified) have
different stress patterns. Repeated words share an entry.

The base vocabulary uses the General American wordlist from
[open-dict-data/ipa-dict](https://github.com/open-dict-data/ipa-dict).
The subset normalizes dark `ɫ` to `l`, `ɹ` to `r`, and stressed schwa in the
CMU-derived data to `ʌ`, and generally selects the first listed reading.
Rare words and context-sensitive readings have curated transcriptions.
For example, `console` uses the verb pronunciation, and `precipitate` includes
both adjective and verb readings separated by a semicolon. The British word
`flob` retains British IPA. `Desease`, presented in the existing question as an
old spelling of `disease`, uses the modern word's pronunciation.

Dictionary references for pronunciation checks include
[Dictionary.com](https://www.dictionary.com/browse/solipsism),
[solecism](https://www.dictionary.com/browse/solecism),
[flob](https://www.dictionary.com/browse/flob),
[trepid](https://www.dictionary.com/browse/trepid),
[esurient](https://www.dictionary.com/browse/esurient),
[incommensurable](https://www.dictionary.com/browse/incommensurable),
[adjure](https://www.dictionary.com/browse/adjure),
[apologue](https://www.dictionary.com/browse/apologue),
[perspicuous](https://www.dictionary.com/browse/perspicuous), and
[Cambridge's doughty pronunciation](https://dictionary.cambridge.org/us/pronunciation/english/doughty).

## Upstream license

The MIT License (MIT)

Copyright (c) 2016 dohliam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
