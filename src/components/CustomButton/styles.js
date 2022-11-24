import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   welcome: {
      marginVertical: theme.SPACING.xlarge,
      paddingHorizontal: theme.SPACING.xxlarge,
      paddingVertical: theme.SPACING.medium,
      backgroundColor: theme.COLORS.blue,
      borderRadius: theme.RADIUS.standard,
   },
   auth: {
      width: '100%',
      alignSelf: 'center',
      paddingHorizontal: theme.SPACING.xxlarge,
      paddingVertical: theme.SPACING.medium,
      backgroundColor: theme.COLORS.blue,
      borderRadius: theme.RADIUS.standard,
   },
   wannaAuth: {
      backgroundColor: 'transparent',
      marginLeft: theme.SPACING.small,
   },
   post: {
      width: 100,
      paddingVertical: 10,
      backgroundColor: theme.COLORS.black,
   },
   icon: {
      marginRight: theme.SPACING.large,
   },
   addComment: {
      paddingVertical: theme.SPACING.medium,
      paddingHorizontal: theme.SPACING.medium,
   },
   logout: {
      alignSelf: 'flex-start',
      paddingVertical: theme.SPACING.small,
      paddingHorizontal: theme.SPACING.large,
      backgroundColor: theme.COLORS.lightgrey,
      color: theme.COLORS.black,
      borderRadius: theme.RADIUS.small,
   },
   filter: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   camera: {
      width: 80,
      height: 80,
      alignSelf: 'center',
      marginTop: theme.SPACING.medium,
      backgroundColor: theme.COLORS.white,
      borderWidth: 15,
      borderColor: theme.COLORS.grey,
      borderRadius: 80 / 2,
   },
   imageIcon: {
      padding: theme.SPACING.medium,
   },
   check: {
      paddingHorizontal: theme.SPACING.medium,
   },
   pickImage: {
      width: '100%',
      alignSelf: 'center',
      paddingHorizontal: theme.SPACING.xxlarge,
      paddingVertical: theme.SPACING.medium,
      backgroundColor: 'transparent',
      borderWidth: 3,
      borderColor: theme.COLORS.blue,
      borderRadius: theme.RADIUS.standard,
      marginTop: theme.SPACING.small,
   },
   deletePost: {},
})

export default styles
