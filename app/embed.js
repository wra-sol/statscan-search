import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

async function generateEmbeddings({ products }) {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const client = new OpenAI({ apiKey: process.env.OPENAI_KEY })
    const updates = [];

    for (const product of products) {
        const { productId} = product;
        const docs = await fetch('https://www150.statcan.gc.ca/t1/wds/rest/getCubeMetadata', {
            method: 'POST',
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify([{ productId }])
        }).then(res => res.json());
        const document = docs[0].object;
        const input = document.cubeTitleEn.replace(/\n/g, ' ');
        const updatedProduct = {
            productId, cansimId: document.cansimId, cubeTitleEn: document.cubeTitleEn, cubeTitleFR: document.cubeTitleFR, cubeStartDate: document.cubeStartDate, cubeEndDate: document.cubeEndDate, releaseTime: document.releaseTime, archived: document.archiveStatusCode
        }
        try {
            const embeddingResponse = await client.embeddings.create({
                model: 'text-embedding-3-small',
                input,
            });
            const embedding = embeddingResponse.data[0].embedding;
            document.embedding = embedding;
            const { data, error: updateError } = await supabase
                .from('statscan')
                .upsert({ ...updatedProduct, embeddings: embedding })
                .select();

            if (updateError) {
                throw updateError;
            } else {
                updates.push(data);
            }
        } catch (error) {
            console.error('Error generating embedding:', error);
        }
    }
    return updates;
}

export default generateEmbeddings;