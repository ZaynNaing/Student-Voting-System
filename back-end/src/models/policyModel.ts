export interface Policy {
    id: string;
    title: string;
    description: string;
    owner: string;
    date: string;
    category: string;
    votes: number;
}

export type PolicyData = Policy[];
