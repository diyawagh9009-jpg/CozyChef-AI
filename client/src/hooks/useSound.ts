import { useEffect, useRef } from 'react'

export const useSound = () => {
  const audioContext = useRef<AudioContext | null>(null)
  const muted = useRef(false)

  useEffect(() => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext()
    }
  }, [])

  const playTone = (frequency: number, duration = 0.12, type: OscillatorType = 'sine') => {
    if (muted.current || !audioContext.current) return
    const ctx = audioContext.current
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = type
    oscillator.frequency.value = frequency
    oscillator.connect(gain)
    gain.connect(ctx.destination)
    gain.gain.setValueAtTime(0.001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.01)
    oscillator.start()
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    oscillator.stop(ctx.currentTime + duration)
  }

  const softPop = () => playTone(720, 0.1)
  const bubble = () => playTone(560, 0.14, 'triangle')
  const sparkle = () => playTone(960, 0.12, 'sine')
  const bell = () => playTone(520, 0.18, 'triangle')
  const bubbleLoop = () => {
    if (muted.current || !audioContext.current) return
    const interval = window.setInterval(() => playTone(340, 0.08, 'sine'), 280)
    return () => window.clearInterval(interval)
  }

  return {
    mute: () => { muted.current = true },
    unmute: () => { muted.current = false },
    softPop,
    bubble,
    sparkle,
    bell,
    bubbleLoop
  }
}
