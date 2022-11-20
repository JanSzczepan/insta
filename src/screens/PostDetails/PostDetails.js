import { Text, View } from 'react-native'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './styles'
import { deletePost, getPost } from '../../api'
import { CustomButton } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'

const PostDetails = ({ route }) => {
   const { id } = route.params
   const {
      userState: { user },
   } = useAuthContext()

   const { navigate } = useNavigation()
   const queryClient = useQueryClient()

   const { data } = useQuery({ queryKey: ['post'], queryFn: () => getPost(id) })

   const mutation = useMutation({
      mutationFn: deletePost,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['posts'] })
         navigate('Home')
      },
   })

   const handleDelete = useCallback(() => {
      mutation.mutate(id)
   }, [])

   return (
      <View style={styles.container}>
         <Text>{id}</Text>
         {data?.data?.creator_uuid === user?.id && (
            <CustomButton
               handleOnPress={handleDelete}
               buttonVariant='deletePost'
               textVariant={['textMedium', 'red']}
            >
               Delete
            </CustomButton>
         )}
      </View>
   )
}

export default PostDetails
