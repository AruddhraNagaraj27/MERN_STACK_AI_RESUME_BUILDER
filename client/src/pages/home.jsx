import React from 'react'
import Banner from '../components/home/banner.jsx'
import Hero from '../components/home/Hero.jsx'
import Features from '../components/home/Features.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import CallToAction from '../components/home/CallToAction.jsx'
import Footer from '../components/home/Footer.jsx'


const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home
