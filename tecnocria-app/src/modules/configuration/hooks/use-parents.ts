/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/modules/auth'
import { useEffect, useState } from 'react'
import {
  getParents,
  postParent,
  putParent,
  deleteParent as removeParent,
  uploadParentImage
} from '../services'
import { useParentsStore } from '../store'

export function useParents() {
  const { token } = useAuth()
  const parents = useParentsStore(state => state.parents)
  const setParents = useParentsStore(state => state.setParents)
  const addParentState = useParentsStore(state => state.addParent)
  const updateParentState = useParentsStore(state => state.updateParent)
  const deleteParentState = useParentsStore(state => state.deleteParent)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchParents(token!)
  }, [token])

  async function fetchParents(token: string) {
    setLoading(true)

    try {
      const data = await getParents(token)
      setParents(data)
    } catch (error) {
      console.log(`Error en el hook use parents: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const addParent = async (
    name: string,
    lastName: string,
    relationship: string,
    age: number,
    image: string | undefined
  ) => {
    setLoading(true)

    try {
      const data = await postParent(name, lastName, relationship, age, token!)
      addParentState(data)

      if (image) {
        await uploadParentImage(data.id, image, token!)
        await fetchParents(token!)
      }
    } catch (error) {
      console.log(`Error en el hook use parents: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const updateParent = async (
    id: string,
    name: string,
    lastName: string,
    relationship: string,
    age: number,
    image: string | undefined
  ) => {
    setLoading(true)

    try {
      const data = await putParent(
        id,
        name,
        lastName,
        relationship,
        age,
        token!
      )
      updateParentState(id, data)

      if (image) {
        await uploadParentImage(id, image, token!)
        await fetchParents(token!)
      }
    } catch (error) {
      console.log(`Error en el hook use parents: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const deleteParent = async (id: string) => {
    setLoading(true)

    try {
      await removeParent(id, token!)
      deleteParentState(id)
    } catch (error) {
      console.log(`Error en el hook use parents: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return {
    parents,
    loading,
    fetchParents,
    addParent,
    updateParent,
    deleteParent
  }
}
