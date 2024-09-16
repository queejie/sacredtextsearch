import {Get, JsonController, OnUndefined, Param} from 'routing-controllers';
import {getConnection, Repository} from 'typeorm';
import {Verse} from '../entities/Verse';
import {violenceWordList} from '../components/_violence-words';
import {mythWordList} from '../components/_myth-words';
import {submissionWordList} from '../components/_submission-words';
import {VerseCharacterization} from '../entities/VerseCharacterization';

// @ts-ignore
const lda = require('lda');
// @ts-ignore
const natural = require('natural');
const wordnet = new natural.WordNet();

// @ts-ignore
const TopicDetection = require('topic-detection');
const detector = new TopicDetection();


@JsonController('/analyze')
export class AnalyzeController {
    private verseRepo: Repository<Verse>;

    constructor() {
        this.verseRepo = getConnection().getRepository(Verse);
    }

    @Get('/go/:typeId')
    @OnUndefined(404)
    go(@Param('typeId') typeId: string) {
        console.log('analyze: ', typeId);
        natural.PorterStemmer.attach();
        let wordList: Array<string> | null = null;
        switch (typeId) {
            case 'V':
                wordList = violenceWordList;
                break;
            case 'M':
                wordList = mythWordList;
                break;
            case 'S':
                wordList = submissionWordList;
                break;
        }
        if (wordList) {
            const tmp = wordList.join(' ');
            const vStemmedWordsText: any = tmp;
            const vStemmedWords = vStemmedWordsText.tokenizeAndStem();

            return this.verseRepo.find().then((verses: Array<Verse>) => {
                let hits = [];
                try {
                    for (let i = 0; i < verses.length; i++) {
                        const hit = this.characterize(vStemmedWords, verses[i].body);
                        if (hit) {
                            hits.push(hit);
                            let rec = new VerseCharacterization();
                            rec.verse_id = verses[i].id;
                            rec.characterization_id = typeId;
                            rec.score = hit.score;
                            rec.percent = parseFloat((hit.score / hit.nWords * 100).toFixed(1));
                            rec.save();
                        }
                    }
                }
                catch (exception) {
                    console.warn(exception);
                }
                return hits;
            });
        }
        return 'invalid';
    }

    private characterize(stemmedWords: Array<string>, text: any) {
        const textWords = text.tokenizeAndStem();
        let cnt = 0;
        for (let i = 0; i < textWords.length; i++) {
            if (stemmedWords.indexOf(textWords[i]) >= 0) {
                cnt++;
            }
        }
        return cnt > 0 ? {score: cnt, text: text, nWords: textWords.length} : null;
    }
}