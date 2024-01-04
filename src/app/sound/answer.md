import { QuestionOptions } from '@/types/lessontopic'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { BsCheck } from 'react-icons/bs'
import styles from './flashCard.module.css'

interface FlashCardProps {
selected: string
setSelected: React.Dispatch<React.SetStateAction<string>>
option: QuestionOptions
noTitle?: any
}

const FlashCard = ({ selected, setSelected, option, noTitle }: FlashCardProps) => {
const audioRef = useRef<HTMLAudioElement | null>(null)

useEffect(() => {
// Preload audio when the component mounts
const audio = new Audio(option.media_url)
audio.preload = 'auto'

    // Store the audio object in the ref
    audioRef.current = audio

    return () => {
      // Clean up when the component unmounts
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }

}, [option.media_url])

console.log(audioRef.current)

const handleClick = () => {
setSelected(option.id)

    // Play the preloaded audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0 // Reset the audio to the beginning
      audioRef.current.play()
    }

}

return (
<>
<div
className={selected === option.id ? styles.flashCardActive : styles.flashCard}
onClick={handleClick} >
<div className={styles.imgWrap}>
<div
className={styles.triangleWrap}
style={{ display: selected === option.id ? 'block' : 'none' }} >
<div className={styles.triangleTopRight}>
<BsCheck color="white" />
</div>
</div>
<Image
src={option.image_url || ''}
width={150}
height={130}
className={styles.img}
alt={option.media_type}
/>
</div>

        <div className={selected === option.id ? styles.bottomTextActive : styles.bottomText}>
          {noTitle ? null : <p className="languageText">{option.title}</p>}
        </div>
      </div>
    </>

)
}

export default FlashCard
