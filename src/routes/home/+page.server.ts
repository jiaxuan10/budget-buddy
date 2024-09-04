import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { PRIVATE_GOOGLE_API_KEY } from "$env/static/private";


export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {

    const { session } = await safeGetSession()

    if (!session) {
        throw redirect(303, '/login')
    }

    const { data: transactions, error } = await supabase
        .from('transactions')
        .select('id,transaction_datetime,transaction_is_income,transaction_category,transaction_amount,transaction_description')
        .eq('transaction_user', session?.user.id)
        .order('transaction_datetime', { ascending: true })

    if (error) {
        return fail(400, error)
    }

    if (transactions.length > 0) {
        const genAI = new GoogleGenerativeAI(PRIVATE_GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Given the transaction history : " + JSON.stringify(transactions) + " Rate from '1-10' & please give an advice on spending in one or two sentence");
        const response = await result.response;
        const advice = response.text();
        return { transactions, advice }
    }


    return { transactions }
}
