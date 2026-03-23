import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import CodeBlock from './components/CodeBlock'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    const moveCursor = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 })
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 })
    }

    const hoverEl = () => {
      gsap.to(cursor, { scale: 2.5, background: '#ff3b30', duration: 0.2 })
      gsap.to(follower, { scale: 1.5, borderColor: '#ff3b30', duration: 0.2 })
    }

    const unhoverEl = () => {
      gsap.to(cursor, { scale: 1, background: '#f5e642', duration: 0.2 })
      gsap.to(follower, { scale: 1, borderColor: '#0a0a0a', duration: 0.2 })
    }

    window.addEventListener('mousemove', moveCursor)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', hoverEl)
      el.addEventListener('mouseleave', unhoverEl)
    })

    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
      <Navbar />
      <Hero />
      <Marquee />
      <HowItWorks />
      <Features />
      <CodeBlock />
      <Pricing />
      <CTA />
      <Footer />
    </>
  )
}
