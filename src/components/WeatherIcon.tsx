import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/cn'

type Props = {}

export default function WeatherIcon(
  props: React.HTMLProps<HTMLDivElement> & { iconName: string }
) {
  const { iconName, ...divProps } = props;
  return (
    <div {...divProps} className={cn(
      'relative h-20 w-20'
    )}>
      <Image 
        src={`https://www.openweathermap.org/img/wn/${props.iconName}@4x.png`}
        alt='weather icon'
        className='absolute h-full w-full'
        width={100}
        height={100}
      />
    </div>
  )
}