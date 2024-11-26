import fs from 'fs';
import path from 'path';
import { PolicyData } from '../models/policyModel';

const filePath = path.join(__dirname, '../data/policies.json');

export const readPolicies = (): PolicyData => {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

export const savePolicies = (policies: PolicyData): void => {
    fs.writeFileSync(filePath, JSON.stringify(policies, null, 2));
};
