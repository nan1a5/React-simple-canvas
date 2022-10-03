import React, {useRef, useEffect} from 'react'
import './components.scss'

export default function CanvasBox({ color, shape, isFill, tool, thickness }) {

  const myCanvas = useRef()


  useEffect(() => {
    myCanvas.current.width = myCanvas.current.offsetWidth
    myCanvas.current.height = myCanvas.current.offsetHeight
  }, []);


  //canvas相关方法
  // updateCanvas = (graphPoints, circlePoints) => {

  // }
  const drawing = function(e) {
    const cvs = myCanvas.current
    const ctx = cvs.getContext('2d')
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctx.stroke()
    // console.log(e.nativeEvent.offsetX);
    
  }


  return (
    <canvas 
      ref={myCanvas}
      onMouseMove={(e) => drawing(e)}
    >
      ur browser does not support the canvas.
    </canvas>
  )
}
