import { useQuery } from '@tanstack/react-query'
import { getUserData } from '../api'
import { POSTS, USER_KEY } from '../constants/queryKeys'

const useCreator = (id) => {
   const { data, isLoading, isError, error } = useQuery({ queryKey: [USER_KEY], queryFn: () => getUserData(id) })

   const creator = data ? data.data : null

   return { creator, isLoading, isError, error }
}

export default useCreator
