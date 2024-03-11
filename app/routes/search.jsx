import { json } from '@remix-run/node';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

export const loader = async ({ request }) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const url = new URL(request.url);
    const term = url.searchParams.get('term');
    const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });
    if (term) {
        const { data } = await client.embeddings.create({
            model: 'text-embedding-3-small',
            input: term,
        });
        const embedding = data[0].embedding;
        const { data: docs } = await supabase.rpc('match_documents', {
            query_embedding: embedding,
            match_threshold: 0.3,
            match_count: 10,
        })
        return json({ docs })
    }
    return (null)
}