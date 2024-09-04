import { redirect, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
    const { session } = await safeGetSession()

    // if the user is already logged in return them to the account page
    if (session) {
        throw redirect(303, '/profile')
    }

    return { url: url.origin }
}

export const actions: Actions = {
    login: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const userEmail = formData.get('userEmail') as string
        const userPassword = formData.get('userPassword') as string

        const { data, error } = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: userPassword
        })
    }

}