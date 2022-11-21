import { supabase } from '../supabase/supabaseClient'

export const getPosts = async () => {
   const response = await supabase.from('posts').select('*').is('archived_at', null)
   console.log('Posts fetched', response)
   return response
}

export const getPost = async (id) => {
   const response = supabase.from('posts').select('id, creator_uuid, created_at, description, image_url, comments ( body, creator_uuid, id )').eq('id', id).is('archived_at', null).single()
   console.log(`Post ${id} fetched`, response)
   return response
}

export const postPost = async ({ title, description, image_url }) => {
   const response = await supabase.from('posts').insert({ description, image_url }).limit(1).single()
   console.log('Posts posted', response)
   return response
}

export const deletePost = async (id) => {
   const response = await supabase.from('posts').update({ archived_at: new Date().toISOString() }).eq('id', id)
   console.log(`Post with id ${id} deleted`, response)
   return response
}

export const getUserData = async (id) => {
   const response = await supabase.from('users').select().eq('uuid', id).single()
   console.log(`User with id ${id} fetched`, response)
   return response
}

export const updateUserInfo = async ({ id, first_name, last_name, img_url }) => {
   const response = await supabase.from('users').update({ first_name, last_name }).eq('uuid', id)
   console.log(`User with id ${id} updated`, response)
   return response
}
