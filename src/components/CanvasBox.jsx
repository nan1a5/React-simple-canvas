import React, {useRef, useEffect, useImperativeHandle, forwardRef} from 'react'
import './components.scss'

const CanvasBox=forwardRef(({ color, shape, isFill, tool, thickness }, _ref) => {

  const myCanvas = useRef()


  useEffect(() => {
    myCanvas.current.width = myCanvas.current.offsetWidth
    myCanvas.current.height = myCanvas.current.offsetHeight
    console.log(`useEffect执行一次`);
  }, []);


  //canvas相关方法
  let isDraw = false, prevMouseX, prevMouseY, snapshot
  const startDraw = (e) => {
    const cvs = myCanvas.current
    const ctx = cvs.getContext('2d')
    prevMouseX = e.offsetX
    prevMouseY = e.offsetY
    !isDraw&&(isDraw=true)
    ctx.beginPath()
    ctx.lineWidth = thickness/12
    snapshot = ctx.getImageData(0,0,cvs.width,cvs.height)
  }
  const endDraw = () => {
    isDraw&&(isDraw=false)
  }

  const drawing = e => {
    const cvs = myCanvas.current
    const ctx = cvs.getContext('2d')
    if(isDraw && tool === 'Brush') {//鼠标按下并且为画笔工具时
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.putImageData(snapshot,0,0)
      switch (shape) {
        case 'Normal':
          ctx.lineTo(e.offsetX, e.offsetY)
          ctx.stroke()
          break;
        
        case 'Circle':
          drawCircle(ctx, e)
          break;

        case 'Rectangle':
          drawRect(ctx, e)
          break;

        case 'Triangle':
          drawTriangle(ctx, e)
          break;

        default:
          break;
      }
    } else if(isDraw && tool === 'Eraser') {//橡皮工具
      ctx.lineWidth = thickness/5
      ctx.strokeStyle = 'ghostwhite'
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
    }
  }

  const drawCircle = (ctx, e) => {
    ctx.beginPath()
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2))
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
    isFill?ctx.fill():ctx.stroke()
  }
  const drawRect = (ctx, e) => {
    !isFill
      ?ctx.strokeRect(e.offsetX,e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY)
      :ctx.fillRect(e.offsetX,e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY)
    
    
  }
  const drawTriangle = (ctx,e) => {
    ctx.beginPath()
    ctx.moveTo(prevMouseX, prevMouseY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY)
    ctx.closePath()
    isFill?ctx.fill():ctx.stroke()
  }


  useImperativeHandle(_ref, () => ({
    clearAll: () => {
      const cvs = myCanvas.current
      const ctx = cvs.getContext('2d')
      ctx.clearRect(0, 0, cvs.width, cvs.height)
    }
  }))

  return (
    <canvas 
      ref={myCanvas}
      onMouseMove = {(e) => drawing(e.nativeEvent)}
      onMouseDown = {(e) => startDraw(e.nativeEvent)}
      onMouseUp = {() => endDraw()}
      onMouseLeave = {() => endDraw()}
    >
      ur browser does not support the canvas.
    </canvas>
  )
})

export default CanvasBox
