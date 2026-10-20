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
The added `eclipse / ɪˈklɪps /` entry follows
[Cambridge's eclipse pronunciation](https://dictionary.cambridge.org/us/pronunciation/english/eclipse).
The entries `bile / baɪl /` and `bale / beɪl /` follow Cambridge's
[bile pronunciation](https://dictionary.cambridge.org/us/pronunciation/english/bile) and
[bale entry](https://dictionary.cambridge.org/us/dictionary/english/bale).

The entry `subversive / səbˈvɝ sɪv /` follows the American pronunciation in
[Cambridge's subversive entry](https://dictionary.cambridge.org/us/dictionary/english/subversive).

The entry `facetious / fəˈsi ʃəs /` follows
[Cambridge's facetious entry](https://dictionary.cambridge.org/us/dictionary/english/facetious).

The entry `factious / ˈfæk ʃəs /` follows
[Cambridge's factious entry](https://dictionary.cambridge.org/us/dictionary/english/factious).

The entry `illegible / ɪˈlɛdʒ ə bəl /` follows
[Cambridge's illegible entry](https://dictionary.cambridge.org/us/dictionary/english/illegible).

The entries `bemuse / bɪˈmjuz /` and `amuse / əˈmjuz /` follow Cambridge's
[bemuse entry](https://dictionary.cambridge.org/dictionary/english/bemuse) and
[amuse pronunciation](https://dictionary.cambridge.org/us/pronunciation/english/amuse),
with vowel-length marks omitted to match the site's General American style.

The entry `quarrelsome / ˈkwɔr əl səm /` follows the American pronunciation in
[Cambridge's quarrelsome pronunciation](https://dictionary.cambridge.org/us/pronunciation/english/quarrelsome).

The entries `rhapsody / ˈræp sə di /` and `prosody / ˈprɑ sə di /` follow
[Collins's rhapsody pronunciation](https://www.collinsdictionary.com/us/dictionary/english-pronunciations/rhapsody) and
[Cambridge's American prosody pronunciation](https://dictionary.cambridge.org/us/pronunciation/english/prosody).

The entries `attenuate / əˈtɛn ju eɪt /` and `extenuate / ɪkˈstɛn ju eɪt /` follow Cambridge's
[attenuate entry](https://dictionary.cambridge.org/us/dictionary/english/attenuate) and
[extenuate pronunciation](https://dictionary.cambridge.org/pronunciation/english/extenuate).

The entries `emboss / ɪmˈbɑs /` and `deboss / dɪˈbɔs /` follow
[Cambridge's American emboss pronunciation](https://dictionary.cambridge.org/us/pronunciation/english/emboss) and
[Dictionary.com's deboss entry](https://www.dictionary.com/browse/deboss).

The entry `engrave / ɪnˈɡreɪv /` follows
[Cambridge's engrave pronunciation](https://dictionary.cambridge.org/us/pronunciation/english/engrave).

The entries `quantile / ˈkwɑn taɪl /` and `quartile / ˈkwɔr taɪl /` follow the American pronunciations in
[Cambridge's quantile entry](https://dictionary.cambridge.org/us/dictionary/english/quantile) and
[quartile entry](https://dictionary.cambridge.org/us/dictionary/english/quartile).

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
