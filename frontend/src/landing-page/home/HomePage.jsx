import React from 'react'
import Slider from './Slider'
import Hero from './Hero'
import DonorStory from './DonorStory';
import RecipientStory from './RecipientStory';
function HomePage() {
  return (
    <div>
      <Slider/>
      <DonorStory/>
      <RecipientStory/>
      <Hero/>
    </div>
  )
}

export default HomePage
