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
