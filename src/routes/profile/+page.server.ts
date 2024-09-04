import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
    const { session } = await safeGetSession()

    if (!session) {
        throw redirect(303, '/login')
    }
}

export const actions: Actions = {
    signout: async ({ locals: { supabase, safeGetSession } }) => {
        const { session } = await safeGetSession()
        if (session) {
            await supabase.auth.signOut()
            throw redirect(303, '/home')
        }
    },
}
