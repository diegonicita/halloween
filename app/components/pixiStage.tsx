'use client'
import { Stage } from '@pixi/react'
import DraggableSprite from './draggableSprite'

const PixiStage = () => {
  return (
    <Stage options={{ background: 0xffffff }}>
      <DraggableSprite x={100} y={100} />
    </Stage>
  )
}

export default PixiStage
