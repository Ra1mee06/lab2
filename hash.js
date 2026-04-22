import fs from 'fs/promises'
import crypto from 'crypto'
import path from 'path';

export async function calculateHash(pathToFile) {
    
    try {
        const curPath = path.resolve(process.cwd(),pathToFile);
        const data = await fs.readFile(curPath);
        
        const hash = crypto.createHash('sha-256')
        .update(data)
        .digest('hex');

        console.log(hash.toString());
    } catch(error) {
        console.error("Operation Failed")
    }

};
