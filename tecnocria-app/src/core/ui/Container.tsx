import { colors } from '@/config'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'

interface Props {
  children: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[]
}

export default function Container({ children }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.background
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10
  }
})
