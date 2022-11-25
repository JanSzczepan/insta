import { useQuery, useMutation } from '@tanstack/react-query'
import { getUserData, updateUserInfo } from '../api'
import { USERS_KEY } from '../constants/queryKeys'

const useCreator = (id) => {
   const { data, isLoading, isError, error } = useQuery([USERS_KEY, id], () => getUserData(id))

   const creator = data ? data.data : null

   const mutation = useMutation({
      mutationFn: updateUserInfo,
   })

   const updateUser = async (id, first_name, last_name, image_url, onSuccess) => {
      mutation.mutate({ id, first_name, last_name, image_url }, { onSuccess })
   }

   return { creator, updateUser, isLoading, isError, error }
}

export default useCreator
