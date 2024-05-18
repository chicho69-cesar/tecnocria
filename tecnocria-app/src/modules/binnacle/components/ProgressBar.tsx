import { colors } from '@/config'
import { StyleSheet, View } from 'react-native'

interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary
  }
})
