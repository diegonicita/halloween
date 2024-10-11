import React, { useCallback, useState, useRef } from 'react'
import { Sprite, useApp, useTick } from '@pixi/react'
import * as PIXI from 'pixi.js'

const DraggableSprite = ({ x, y }: { x: number; y: number }) => {
  const app = useApp()
  const [position, setPosition] = useState({ x, y })
  const [dragging, setDragging] = useState(false)
  const [alpha, setAlpha] = useState(1)
  const spriteRef = useRef<null | PIXI.Sprite>(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })

  const onDragStart = useCallback(
    (event: { data: { global: { x: number; y: number } } }) => {
      if (spriteRef.current) {
        setDragging(true)
        setAlpha(0.5)
        const globalPosition = event.data.global
        dragOffsetRef.current = {
          x: spriteRef.current.x - globalPosition.x,
          y: spriteRef.current.y - globalPosition.y,
        }
      }
    },
    [],
  )

  const onDragEnd = useCallback(() => {
    setDragging(false)
    setAlpha(1)
  }, [])

  useTick(() => {
    if (dragging && app.renderer) {
      // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
      let globalMouse
      if (app.renderer.events?.pointer) {
        // Para PixiJS v7+
        globalMouse = app.renderer.events.pointer.global
      } else if (app.renderer.plugins?.interaction) {
        // Para versiones anteriores de PixiJS
        globalMouse = app.renderer.plugins.interaction.mouse.global
      } else {
        // Si no podemos obtener la posición del mouse, no hacemos nada
        return
      }

      setPosition({
        x: globalMouse.x + dragOffsetRef.current.x,
        y: globalMouse.y + dragOffsetRef.current.y,
      })
    }
  })

  return (
    <Sprite
      ref={spriteRef}
      texture={PIXI.Texture.from('https://pixijs.com/assets/bunny.png')}
      x={position.x}
      y={position.y}
      anchor={0.5}
      scale={3}
      alpha={alpha}
      interactive={true}
      pointerdown={onDragStart}
      pointerup={onDragEnd}
      pointerupoutside={onDragEnd}
      cursor="pointer"
    />
  )
}

export default DraggableSprite
