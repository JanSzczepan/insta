import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   fullWidth: {
      resizeMode: 'cover',
      flex: 1,
      aspectRatio: 1.5,
      marginVertical: 0,
   },
   user: {
      maxWidth: 350,
      maxHeight: 350,
      resizeMode: 'contain',
      flex: 1,
      aspectRatio: 1,
      borderRadius: 350 / 2,
   },
   user: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
      aspectRatio: 1,
      borderRadius: 40 / 2,
      marginBottom: theme.SPACING.small,
   },
   miniuser: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
      aspectRatio: 1,
      borderRadius: 40 / 2,
   },
   miniPost: {
      resizeMode: 'cover',
      width: '100%',
      aspectRatio: 1,
   },
})

export default styles
