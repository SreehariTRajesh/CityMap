import Control from "./components/Control";
import Grid from "./components/Grid";
import style from './App.module.css';
import {useState} from 'react';
function App() {
  const grid=[];
  for(var i=0;i<30;++i){
    var v=[];
    for(var j=0;j<50;++j){
      v.push(0);
    }
    grid.push(v);
  }
  const [opt,setOpt]=useState(0);
  const changeOption=(param)=>{
    setOpt(param);
    console.log(`Option changed to ${param}`);
  }
  const [city,setCity]=useState(grid);
  var copy=city;
  return (
    <div className="App">
      <div className={style.control}>    
        <Control setOption={changeOption} city={city} setCity={setCity}/>
      </div>
      <div className={style.grid}>
        <Grid opt={opt} city={city} setCity={setCity}/>
      </div>
    </div>
  );
}
export default App;