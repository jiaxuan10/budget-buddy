import { fail, redirect, type Actions } from '@sveltejs/kit'

export const actions: Actions = {
    transactionNew: async ({ request, locals: { supabase, safeGetSession } }) => {
        const { session } = await safeGetSession()
        const formData = await request.formData()
        const transactionDateTime = formData.get('transactionDateTime')
        const transactionIsIncome = (formData.get('transactionType')?.toString().toLowerCase() === "true") as boolean
        const transactionCategory = formData.get('transactionCategory') as string
        const transactionAmount = Number(formData.get('transactionAmount')).toFixed(2)
        const transactionDescription = formData.get('transactionDescription') as string
        const transactionUser = session?.user.id

        const { error } = await supabase.from('transactions').insert({
            transaction_datetime: transactionDateTime,
            transaction_is_income: transactionIsIncome,
            transaction_category: transactionCategory,
            transaction_amount: transactionAmount,
            transaction_description: transactionDescription,
            transaction_user: transactionUser
        })
        if (error) {
            return fail(400, error)
        }
        throw redirect(303, '/transactions')
    }

}