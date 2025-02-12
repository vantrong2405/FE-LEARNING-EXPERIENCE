'use client'

import { useEffect, useRef } from 'react'
import useStoreLocal from '@/stores/useStoreLocal'

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { isMusicOn, setMusicOn, currentTime, setCurrentTime } = useStoreLocal()

  useEffect(() => {
    const enableAudio = () => {
      if (audioRef.current) {
        audioRef.current.muted = false
        document.removeEventListener('click', enableAudio)
      }
    }

    document.addEventListener('click', enableAudio, { once: true })
    return () => document.removeEventListener('click', enableAudio)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicOn) {
        audioRef.current.play().catch((error) => console.error('Autoplay blocked:', error))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isMusicOn])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime
    }
  }, [])

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    }

    audioRef.current?.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [setCurrentTime])

  return <audio ref={audioRef} src='/assets/audios/music.mp3' loop muted />
}
