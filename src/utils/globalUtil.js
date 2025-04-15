import { distance } from 'fastest-levenshtein';

export const getMatchScore = (item, searchWords) => {
    const fullText = `${item.patient_name} ${item.mobile_number} ${item.email}`.toLowerCase();
    let score = 0;
    for (let word of searchWords) {
        if (fullText.includes(word)) {
            score += word.length;
        }
    }
    return score;
};

export const calculateSearchRelevance = (item, searchWords) => {
    const name = item.patient_name?.toLowerCase() || '';
    const mobile = item.mobile_number || '';
    const email = item.email?.toLowerCase() || '';
    const area = item.area?.toLowerCase() || '';
    const fullText = `${name} ${mobile} ${email} ${area}`;

    let score = 0;

    searchWords.forEach(word => {
        if (fullText.includes(word)) {
            score += word.length * 2; // strong match
        } else {
            const levDistance = distance(word, name);
            const fuzzyScore = Math.max(0, 10 - levDistance); // closer = better
            score += fuzzyScore;
        }
    });

    return score;
};
