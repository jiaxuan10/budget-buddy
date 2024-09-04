import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals: { safeGetSession }, url }) => {
    const { session } = await safeGetSession()

    if (!session) {
        throw redirect(303, '/login')
    }
    const searchParams = new URLSearchParams(url.search);
    const symbol = searchParams.get('symbol');
    const response = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=2CZ1RRNC1PRUGR1H'");
    let stonks = await response.json();
    return { symbol, stonks }
}

export const actions: Actions = {
    stonksBuy: async ({ request, locals: { supabase, safeGetSession } }) => {
        const { session } = await safeGetSession()
        const formData = await request.formData()
        const symbol = formData.get('symbol') as string
        const currentStonksPrice = Number(formData.get('currentStonksPrice')).toFixed(2)
        const buyAmount = Number(formData.get('buyAmount'))
        const { data, error } = await supabase
            .from("trading")
            .insert([{ transaction_symbol: symbol, transaction_is_buy: true, transaction_amount: buyAmount, transaction_price_per_stock: currentStonksPrice, transaction_user: session?.user.id }]);
        if (error) {
            console.log(error)
        }
        redirect(300, "/trade")
    },

    stonksSell: async ({ request, locals: { supabase, safeGetSession } }) => {
        const { session } = await safeGetSession()
        const formData = await request.formData()
        const symbol = formData.get('symbol') as string
        const currentStonksPrice = Number(formData.get('currentStonksPrice')).toFixed(2)
        const sellAmount = Number(formData.get('sellAmount'))
        const { data, error } = await supabase
            .from("trading")
            .insert([{ transaction_symbol: symbol, transaction_is_buy: false, transaction_amount: sellAmount, transaction_price_per_stock: currentStonksPrice, transaction_user: session?.user.id }]);
        if (error) {
            console.log(error)
        }
        redirect(300, "/trade")
    }
}