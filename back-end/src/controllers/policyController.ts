import { RequestHandler } from 'express';
import { readPolicies, savePolicies } from '../utils/fileManager';
import { readVotes, saveVotes } from '../utils/votesManager';
import { Policy } from '../models/policyModel';

export const getPolicies: RequestHandler<unknown, unknown, unknown, { year?: string }> = (req, res) => {
    const policies = readPolicies();
    const year = req.query.year;

    let filteredPolicies = policies;

    // Filter by year if provided
    console.log(year)
    if (year) {
        filteredPolicies = policies.filter(policy => {
            const policyYear = new Date(policy.date).getFullYear();
            return policyYear === parseInt(year, 10);
        });
    }
    filteredPolicies.sort((a, b) => b.votes - a.votes);
    console.log(filteredPolicies)
    res.json({ success: true, filteredPolicies });

    
    // if (year) {
    //     const filteredPolicies = policies.filter(policy => {
    //         const policyYear = new Date(policy.date).getFullYear();
    //         return policyYear === Number(year);
    //     });
    //     filteredPolicies.sort((a, b) => b.votes - a.votes);
    //     res.json({ success: true, filteredPolicies });
    //     return
    // }
    // policies.sort((a, b) => b.votes - a.votes);
    // res.json({ success: true, policies });
};

export const addPolicy: RequestHandler = (req, res) => {
    const policies = readPolicies();
    const newPolicy: Policy = {
        id: Date.now().toString(),
        ...req.body,
        votes: 0,
    };
    policies.push(newPolicy);
    savePolicies(policies);
    res.json({ success: true, policy: newPolicy });
};

export const upVotePolicy: RequestHandler<{ id: string }> = (req, res) => {
    const policies = readPolicies();
    const votes = readVotes();
    const policy = policies.find((p) => p.id === req.params.id)!;

    if (!policy) {
        res.status(404).json({ error: 'Policy not found' });
    }

    const userEmail = (req as any).user?.email;
    if (!userEmail) {
        res.status(403).json({ error: 'Unauthorized' });
    }

    const existingVote = votes.find((v) => v.policyId === req.params.id && v.userId === userEmail);

    // if (existingVote && existingVote.type === 'upvote') {
    //     console.log("You have already upvoted this policy");
    //     res.status(400).json({ error: 'You have already upvoted this policy' });
    // }

    console.log(`existingVote : ${existingVote}`)
    if (existingVote) {
        if (existingVote.type === 'upvote') {
            res.status(400).json({ error: 'You have already upvoted this policy' });
        }
        if (existingVote.type === 'downvote') {
            // Switch downvote to upvote
            existingVote.type = 'upvote';
            policy.votes += 1;
        }

    } else {
        // Add a new upvote
        votes.push({ policyId: req.params.id, userId: userEmail, type: 'upvote' });
        policy.votes += 1;
    }

    savePolicies(policies);
    saveVotes(votes);
    res.json({ success: true, policy });
};

export const downVotePolicy: RequestHandler<{ id: string }> = (req, res) => {
    const policies = readPolicies();
    const votes = readVotes();
    const policy = policies.find((p) => p.id === req.params.id)!;

    if (!policy) {
        res.status(404).json({ error: 'Policy not found' });
    } 

    const userEmail = (req as any).user?.email;
    if (!userEmail) {
        res.status(403).json({ error: 'Unauthorized' });
    } 

    const existingVote = votes.find((v) => v.policyId === req.params.id && v.userId === userEmail);

    if (existingVote) {
        if (existingVote.type === 'downvote') {
            res.status(400).json({ error: 'You have already downvoted this policy' });
        }
        if (existingVote.type === 'upvote') {
            existingVote.type = 'downvote';
            policy.votes -= 1; // Reverse the upvote (+1) and apply the downvote (-1)
        }
    } else {
        res.status(400).json({ error: 'You can not downvote without no upvoting' });

        // Add a new downvote
        // votes.push({ policyId: req.params.id, userId: userEmail, type: 'downvote' });
        // policy.votes -= 1;
    }

    savePolicies(policies);
    saveVotes(votes);
    res.json({ success: true, policy });
};
