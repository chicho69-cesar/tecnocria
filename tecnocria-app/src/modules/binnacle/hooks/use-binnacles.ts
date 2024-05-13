/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/modules/auth'
import { useEffect, useState } from 'react'
import {
  getBinnacles,
  patchAssignParents,
  patchRemoveParents,
  postBinnacle,
  putBinnacle,
  deleteBinnacle as removeBinnacle
} from '../services'
import { useBinnaclesStore } from '../store'

export function useBinnacles() {
  const { token } = useAuth()
  const binnacles = useBinnaclesStore(state => state.binnacles)
  const setBinnacles = useBinnaclesStore(state => state.setBinnacles)
  const addBinnacleState = useBinnaclesStore(state => state.addBinnacle)
  const updateBinnacleState = useBinnaclesStore(state => state.updateBinnacle)
  const deleteBinnacleState = useBinnaclesStore(state => state.deleteBinnacle)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchBinnacles(token!)
  }, [token])

  async function fetchBinnacles(token: string) {
    setLoading(true)

    try {
      const data = await getBinnacles(token)
      setBinnacles(data)
    } catch (error) {
      console.log(`Error en el hook use binnacles: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const addBinnacle = async (
    name: string,
    description: string,
    progress: number,
    selectedParents: string[]
  ) => {
    setLoading(true)

    try {
      const data = await postBinnacle(name, description, progress, token!)
      const assignedData = await patchAssignParents(
        data.id,
        selectedParents,
        token!
      )

      addBinnacleState(assignedData)
    } catch (error) {
      console.log(`Error en el hook use binnacles: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const updateBinnacle = async (
    id: string,
    name: string,
    description: string,
    progress: number,
    selectedParents: string[]
  ) => {
    setLoading(true)

    try {
      const data = await putBinnacle(id, name, description, progress, token!)

      const parentsToRemove = data.parents.map(parent => parent.id)
      await patchRemoveParents(id, parentsToRemove, token!)

      const assignedData = await patchAssignParents(id, selectedParents, token!)

      updateBinnacleState(id, assignedData)
    } catch (error) {
      console.log(`Error en el hook use binnacles: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const deleteBinnacle = async (id: string) => {
    setLoading(true)

    try {
      await removeBinnacle(id, token!)
      deleteBinnacleState(id)
    } catch (error) {
      console.log(`Error en el hook use binnacles: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return {
    binnacles,
    loading,
    fetchBinnacles,
    addBinnacle,
    updateBinnacle,
    deleteBinnacle
  }
}
