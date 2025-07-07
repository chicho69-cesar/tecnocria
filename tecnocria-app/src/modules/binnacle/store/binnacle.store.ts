import { Binnacle } from '@/core/types'
import { create } from 'zustand'

interface BinnaclesStore {
  binnacles: Binnacle[]
}

interface BinnaclesStoreActions {
  setBinnacles: (binnacles: Binnacle[]) => void
  addBinnacle: (binnacle: Binnacle) => void
  updateBinnacle: (id: string, binnacle: Binnacle) => void
  deleteBinnacle: (id: string) => void
}

type State = BinnaclesStore & BinnaclesStoreActions

export const useBinnaclesStore = create<State>(set => ({
  binnacles: [],
  setBinnacles: (binnacles: Binnacle[]) => set({ binnacles }),
  addBinnacle: (binnacle: Binnacle) =>
    set(state => ({ binnacles: [...state.binnacles, binnacle] })),
  updateBinnacle: (id: string, binnacle: Binnacle) =>
    set(state => ({
      binnacles: state.binnacles.map(b => {
        if (b.id === id) {
          return binnacle
        }

        return b
      })
    })),
  deleteBinnacle: (id: string) =>
    set(state => ({ binnacles: state.binnacles.filter(b => b.id !== id) }))
}))
