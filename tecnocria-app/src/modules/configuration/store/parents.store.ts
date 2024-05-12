import { Parent } from '@/core'
import { create } from 'zustand'

interface ParentsStore {
  parents: Parent[]
}

interface ParentsStoreActions {
  setParents: (parents: Parent[]) => void
  addParent: (parent: Parent) => void
  updateParent: (id: string, parent: Parent) => void
  deleteParent: (id: string) => void
}

type State = ParentsStore & ParentsStoreActions

export const useParentsStore = create<State>(set => ({
  parents: [],
  setParents: (parents: Parent[]) => set({ parents }),
  addParent: (parent: Parent) =>
    set(state => ({ parents: [...state.parents, parent] })),
  updateParent: (id: string, parent: Parent) =>
    set(state => ({
      parents: state.parents.map(p => {
        if (p.id === id) {
          return parent
        }

        return p
      })
    })),
  deleteParent: (id: string) =>
    set(state => ({ parents: state.parents.filter(p => p.id !== id) }))
}))
