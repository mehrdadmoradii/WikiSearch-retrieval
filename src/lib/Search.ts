import sw from 'stopword';
import WikiSearch from './WikiSearch';
import WikiIndex from './WikiIndex';
import RedisMaker from './RedisMaker';

/**
 * Searchs for the given sentence and returns the result.
 * @param searchSentence 
 * @returns 
 */
export const search = async (searchSentence: string) => {
    const splitted = splitWords(searchSentence);
    const splittedWithoutStopWords = removeStopWords(splitted);
    const result = await chainResults(splittedWithoutStopWords);
    return result;
}

/**
 * Combines the result of the given terms.
 * 
 * @param terms 
 * @returns 
 */
const chainResults = async (terms: string[]) => {
    const connection = await RedisMaker.getConnection();
    const wikiIndex = new WikiIndex(connection);
    let wikiSearch: WikiSearch = await WikiSearch.search(terms[0], wikiIndex);
    
    if (terms.length === 1)
        return wikiSearch.sort();

    for (let i=1; i<terms.length; i++) {
        const newTerm = await WikiSearch.search(terms[i], wikiIndex);
        wikiSearch = wikiSearch.or(newTerm);
    }

    return wikiSearch.sort();
};

/**
 * Breaks the sentence into words and returns the array of words.
 * 
 * @param text 
 * @returns 
 */
const splitWords = (text: string): string[] => {
    const splitted = text.split(' ');
    return splitted.filter(s => s !== '').map(s => s.toLowerCase());
}

/**
 * Removes the stop words from array of words.
 * 
 * @param texts 
 * @returns 
 */
const removeStopWords = (texts: string[]): string[] => {
    return sw.removeStopwords(texts, sw.en);
};