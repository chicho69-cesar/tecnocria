import { colors } from '@/config'
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'

interface Props {
  children: React.ReactNode | React.ReactNode[] 
}

export default function AuthContainer({ children }: Props) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 10
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    width: '100%'
  }
})
