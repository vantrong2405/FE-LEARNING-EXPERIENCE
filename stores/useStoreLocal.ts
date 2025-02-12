'use client'

import { create } from 'zustand'

interface StoreState {
  isMusicOn: boolean
  currentTime: number
  toggleMusic: () => void
  setMusicOn: (isMusicOn: boolean) => void
  setCurrentTime: (time: number) => void
}

const useStoreLocal = create<StoreState>((set) => ({
  isMusicOn: false,
  currentTime: 0,
  toggleMusic: () =>
    set((state) => {
      const newState = !state.isMusicOn
      localStorage.setItem('isMusicOn', newState.toString())
      return { isMusicOn: newState }
    }),
  setMusicOn: (isMusicOn: boolean) => {
    localStorage.setItem('isMusicOn', isMusicOn.toString())
    set({ isMusicOn })
  },
  setCurrentTime: (time: number) => {
    localStorage.setItem('currentTime', time.toString())
    set({ currentTime: time })
  }
}))

export default useStoreLocal
