import { json, redirect } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";

export const action = async ({ request }) => {
    const {productId} = await request.json();
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const { error } = await supabase.rpc('increment_clicks', { id: productId })
    if (error) {console.log(error); return json(error)}
    return redirect(`https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=${productId}01`);
}