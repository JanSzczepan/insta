import { TextInput, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from './styles'
import theme from '../../constants/theme'

const SearchComponent = ({ value, filterPosts, disable }) => {
   return (
      <View style={styles.container}>
         <Feather
            name='search'
            size={theme.SIZES.large}
            color={theme.COLORS.black}
         />
         <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => filterPosts(text)}
            placeholder='Search'
            cursorColor={theme.COLORS.grey}
            editable={!disable}
            selectTextOnFocus={!disable}
         />
      </View>
   )
}

export default SearchComponent
