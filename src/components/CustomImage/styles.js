import { StyleSheet } from 'react-native'

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
   miniuser: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
      aspectRatio: 1,
      borderRadius: 40 / 2,
   },
})

export default styles
