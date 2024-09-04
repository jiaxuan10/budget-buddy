import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession()

    if (!session) {
        throw redirect(303, '/login')
    }
    const { data: stonks, error } = await supabase
        .from("trading")
        .select("transaction_datetime,transaction_symbol,transaction_is_buy,transaction_amount,transaction_price_per_stock")
        .eq("transaction_user", session.user.id).order('transaction_datetime', { ascending: true })

    return { stonks }
}


export const actions: Actions = {
    lookup: async ({ request }) => {
        const formData = await request.formData()
        const symbol = formData.get('symbol') as string
        redirect(300, "/trade/lookup?symbol=" + symbol)
    },
    clear: async ({ locals: { supabase, safeGetSession } }) => {
        const { session } = await safeGetSession()
        const { data } = await supabase.from("trading").delete().eq('transaction_user', session?.user.id)
    }
}