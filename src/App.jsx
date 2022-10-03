import circle from './icons/circle.svg'
import rectangle from './icons/rectangle.svg'
import triangle from './icons/triangle.svg'
import brush from './icons/brush.svg'
import eraser from './icons/eraser.svg'

import React,{ useState, useMemo } from 'react'
import './App.scss';


function App() {
  //定义渲染成菜单的数据数组
  const brushs = [{
    name: 'Circle',
    icon: circle
  },{
    name: 'Rectangle',
    icon: rectangle
  },{
    name: 'Triangle',
    icon: triangle
  }]
  const tools = [{
    name: 'Brush',
    icon: brush
  },{
    name: 'Eraser',
    icon: eraser
  }]
  const colors = ['white', 'rgb(250, 38, 38)', '#2382f6', 'rgb(39, 204, 39)', 'black']


  //定义各种state
  //定义颜色state
  const [color, setColor] = useState('rgb(39, 204, 39)')
  const memoColor = useMemo(() => color, [color])//...
  // 定义画笔state
  const [shape, setShape] = useState('Circle')
  //定义画笔是否填充state
  const [isFill, setIsFill] = useState(true)
  //定义工具state
  const [tool, setTool] = useState('Brush')
  //定义画笔粗细state
  const [thickness, setThickness] = useState(50)


  //定义事件处理方法
  const handleColorClick = color => {//处理更改颜色事件方法
    setColor(color)
  } 
  const handleShapeClick = shape => {//处理更改画笔形状事件方法
    setShape(shape)
  }
  const handleIsFillChange = () => {//处理画笔更改填充状态事件方法
    setIsFill(!isFill)
  }
  const handleToolClick = tool => {//处理工具切换事件方法
    setTool(tool)
  }
  const handleThickness = thickness => {//处理切换画笔粗细事件方法
    setTimeout(() => {
      setThickness(thickness)
    }, 50);
  }



  return (
    <div className="app">
      <div className="container">
        <div className='tools-board'>
          <div className='tools_brush'>
            <label className='title'>shapes</label>
            <ul className='options'>
            {
              brushs.map(item => 
                <li key={item.name} onClick={() => handleShapeClick(item.name)} className={item.name === shape?'actived option':'option'}>
                  <img src={item.icon} alt={item.name} />
                  <span> {item.name}</span>
                </li>
              )
            }
              <li className={isFill?'actived option':'option'}>
                <input onChange={() => handleIsFillChange()} type="checkbox" name="fill-color" id="fill-color" checked={isFill}/>
                <label htmlFor="fill-color"> Fill Color</label>
              </li>
            </ul>
          </div>

          <div className='tools_tool'>
            <label className='title'>tools</label>
            <ul className='options'>
            {
              tools.map(item => 
                <li key={item.name} onClick={() => handleToolClick(item.name)} className={item.name === tool?'actived option':'option'}>
                  <img src={item.icon} alt={item.name} />
                  <span>{ item.name}</span>
                </li>
              )
            }
              <li className='option thickness'>
                <span>thickness: </span>
                <input type="range" onChange={e => handleThickness(e.target.value)} value={thickness}/>
              </li>
            </ul>
          </div>

          <div className='tools_color'>
            <label className='title'>colors</label>
            <ul className='options'>
            {
              colors.map(item => 
                <li key={item} onClick={() => handleColorClick(item)} className={memoColor === item?`option color_actived `:'option'} style={{background: item}}></li>
              )
            }
            </ul>
          </div>

          <div className="tools_btns">
            <button>Clear All</button>
            <button>Save As IMG</button>
          </div>
        </div>
        <div className='painting-board'></div>
        </div>
    </div>
  );
}

export default App;
