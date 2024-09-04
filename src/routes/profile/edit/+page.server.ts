import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
    const { session } = await safeGetSession()

    if (!session) {
        throw redirect(303, '/home')
    }

    return { session }
}

export const actions: Actions = {
    profileUpdate: async ({ request, locals: { supabase, safeGetSession } }) => {
        const formData = await request.formData()
        const username = formData.get('username') as string
        const phone_number = formData.get('phoneNumber') as string
        const avatarUrl = formData.get('avatarUrl') as string

        const { session } = await safeGetSession()

        const { error } = await supabase.from('profiles').update({
            username: username,
            phone_number: phone_number,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        }).eq('id', session?.user.id,)

        if (error) {
            return fail(500, {
                error
            })
        }

        throw redirect(300, "/profile")
    }
}
