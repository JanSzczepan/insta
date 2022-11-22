import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.SPACING.medium,
      paddingHorizontal: theme.SPACING.medium,
   },
   miniImageContainer: {
      marginRight: theme.SPACING.small,
   },
   imageContainer: {
      flexDirection: 'row',
   },
   contentWrapper: {
      paddingVertical: theme.SPACING.medium,
      paddingHorizontal: theme.SPACING.medium,
   },
   iconsContainer: {
      flexDirection: 'row',
      marginBottom: theme.SPACING.small,
   },
   likesContainer: {
      marginBottom: theme.SPACING.small,
   },
   commentContainer: {
      flexDirection: 'row',
      alignContent: 'center',
      marginBottom: theme.SPACING.small,
   },
   commentNameContainer: {
      flexDirection: 'row',
      alignContent: 'center',
      marginRight: theme.SPACING.small,
   },
   icon: {
      marginRight: theme.SPACING.large,
   },
})

export default styles
