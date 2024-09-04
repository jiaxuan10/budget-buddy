import { fail, redirect, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'


export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
    const searchParams = new URLSearchParams(url.search);
    const transactionId = searchParams.get('Id');
    const { data: transactions, error } = await supabase
        .from('transactions')
        .select('id,transaction_datetime,transaction_is_income,transaction_category,transaction_amount,transaction_description')
        .eq('id', transactionId)

    if (error) {
        throw redirect(303, '/transactions')
    }
    return { transactions }
}

export const actions: Actions = {
    transactionEdit: async ({ request, locals: { supabase, safeGetSession } }) => {
        const { session } = await safeGetSession()
        const formData = await request.formData()
        const transactionId = formData.get('transactionId')
        const transactionDateTime = formData.get('transactionDateTime')
        const transactionIsIncome = (formData.get('transactionType')?.toString().toLowerCase() === "true") as boolean
        const transactionCategory = formData.get('transactionCategory') as string
        const transactionAmount = Number(formData.get('transactionAmount')).toFixed(2)
        const transactionDescription = formData.get('transactionDescription') as string
        const transactionUser = session?.user.id

        const { error } = await supabase.from('transactions').update({
            transaction_datetime: transactionDateTime,
            transaction_is_income: transactionIsIncome,
            transaction_category: transactionCategory,
            transaction_amount: transactionAmount,
            transaction_description: transactionDescription,
            transaction_user: transactionUser
        }).eq('id', transactionId)
        if (error) {
            return fail(400, error)
        }
        throw redirect(303, '/transactions')
    }

}