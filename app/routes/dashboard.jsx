import { Outlet, useLoaderData, redirect, json } from '@remix-run/react';
import { createSupabaseServerClient } from '../supabase.server';

export const loader = async ({ request }) => {
    const { supabaseClient: supabase, headers } = createSupabaseServerClient(request);
    const session = await supabase.auth.getSession();

    if (!session) {
        return redirect('/signin');
    }

    return json({ session }, { headers });
};

const Dashboard = () => {
    const { session } = useLoaderData();
    return (
        <div>
            <h1>Welcome to the dashboard</h1>
            <Outlet context={session} />
        </div>
    )
}
export default Dashboard;