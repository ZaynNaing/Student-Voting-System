import fs from 'fs';
import path from 'path';

const votesFilePath = path.join(__dirname, '../data/votes.json');

export const readVotes = () => {
    if (!fs.existsSync(votesFilePath)) {
        fs.writeFileSync(votesFilePath, '[]');
    }
    return JSON.parse(fs.readFileSync(votesFilePath, 'utf-8'));
};

export const saveVotes = (votes: { policyId: string; userId: string; type: 'upvote' | 'downvote' }[]) => {
    fs.writeFileSync(votesFilePath, JSON.stringify(votes, null, 2));
};
