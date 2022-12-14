import { supabase } from '../supabase/supabaseClient'

export const getPosts = async (count, limit) => {
   const response = await supabase.from('posts').select('*').is('archived_at', null).order('created_at', { ascending: false }).range(count, limit)
   // console.log('Posts fetched', response)
   return response
}

export const getPost = async (id) => {
   const response = await supabase.from('posts').select('id, creator_uuid, created_at, description, image_url, comments ( body, creator_uuid, id )').eq('id', id).is('archived_at', null).single()
   // console.log(`Post ${id} fetched`, response)
   return response
}

export const getUserPosts = async (id) => {
   const response = await supabase.from('posts').select('*').eq('creator_uuid', id).is('archived_at', null).order('created_at', { ascending: false }).limit(3)
   // console.log(`Posts for user with id ${id} fetched`, response)
   return response
}

export const postPost = async ({ description, image_url }) => {
   const response = await supabase.from('posts').insert({ description, image_url }).limit(1).single()
   // console.log('Posts posted', response)
   return response
}

export const deletePost = async (id) => {
   const response = await supabase.from('posts').update({ archived_at: new Date().toISOString() }).eq('id', id)
   // console.log(`Post with id ${id} deleted`, response)
   return response
}

export const getUserData = async (id) => {
   const response = await supabase.from('users').select().eq('uuid', id).single()
   // console.log(`User with id ${id} fetched`, response)
   return response
}

export const updateUserInfo = async ({ id, first_name, last_name, image_url }) => {
   const response = await supabase.from('users').update({ first_name, last_name, image_url }).eq('uuid', id)
   // console.log(`User with id ${id} updated`, response)
   return response
}

export const getLikes = async (id) => {
   const response = supabase.from('likes').select('*', { count: 'exact' }).eq('post_id', id)
   // console.log(`Likes from post with id ${id} fetched`, response)
   return response
}

export const checkLike = async ({ postId, creatorId }) => {
   const response = await supabase.from('likes').select('*').eq('post_id', postId)
   // console.log(`Likes in post with id ${postId} checked`)
   return response
}

export const createLike = async (id) => {
   const response = await supabase.from('likes').insert({ post_id: id }).limit(1).single()
   // console.log(`Like added to post with id ${id}`, response)
   return response
}

export const deleteLike = async (id) => {
   const response = await supabase.from('likes').delete().eq('id', id)
   // console.log(`Like with id ${id} deleted`, response)
   return response
}

export const getComments = async (id) => {
   const response = await supabase.from('comments').select('*').eq('post_id', id)
   // console.log(`Comment from post ${id} fetched`, response)
   return response
}

export const createComment = async ({ comment, postId }) => {
   const response = await supabase.from('comments').insert({ body: comment, post_id: postId }).limit(1).single()
   // console.log(`Comment ${comment} created`, response)
   return response
}

export const deleteComment = async (id) => {
   const response = await supabase.from('comments').delete().eq('id', id)
   // console.log(`Comment ${id} deleted`, response)
   return
}
