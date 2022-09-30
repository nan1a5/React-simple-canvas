import circle from './icons/circle.svg'
import rectangle from './icons/rectangle.svg'
import triangle from './icons/triangle.svg'
import brush from './icons/brush.svg'
import eraser from './icons/eraser.svg'

import './App.scss';


function App() {

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
  const colors = ['']

  return (
    <div className="app">
      <div className="container">
        <div className='tools-board'>
          <div className='tools_brush'>
            <label className='title'>shapes</label>
            <ul className='options'>
            {
              brushs.map(item => 
                <li className={`option ${item.name}`}>
                  <img src={item.icon} alt={item.name} />
                  <span> {item.name}</span>
                </li>
              )
            }
              <li className='option'>
                <input type="checkbox" name="fill-color" id="fill-color" />
                <label htmlFor="fill-color"> Fill Color</label>
              </li>
            </ul>
          </div>

          <div className='tools_tool'>
            <label className='title'>tools</label>
            <ul className='options'>
            {
              tools.map(item => 
                <li className={`option ${item.name}`}>
                  <img src={item.icon} alt={item.name} />
                  <span>{ item.name}</span>
                </li>
              )
            }
              <li className='option'>
                <span>thickness: </span>
                <input type="range" name="" id="" />
              </li>
            </ul>
          </div>

          <div className='tools_color'>
            <label className='title'>colors</label>
            <ul className='options'>
            {
              colors.map(item => 
                <li className='option'>
                  
                </li>
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
