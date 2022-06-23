import style from './styles/Box.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHospital,faHouse,faBuilding, faChurch, faBuildingColumns,faMapPin,faCity,faWater,faFlagCheckered,faCircleDot} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const Box=({opt,r,c,city,setCity})=>{
    const [fa,setfa]=useState(0);
    const changeDiv=()=>{
        const copy=[...city];
        copy[r][c]=opt;
        setCity(copy);
        setfa(opt);
    }
    if(city[r][c]===-1){
        return(
            <div className={style.box} style={{color:'#34495e',fontSize:'10px'}}>
                <FontAwesomeIcon icon={faMapPin}></FontAwesomeIcon>
            </div>    
        )
    }
    else{ 
        return (
            <div className={style.box} onClick={changeDiv}>
                {fa===0?'':fa===1?<FontAwesomeIcon icon={faWater}></FontAwesomeIcon>:fa===2?<FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>:fa===3?<FontAwesomeIcon icon={faChurch}></FontAwesomeIcon>:fa===4?<FontAwesomeIcon icon={faBuildingColumns}></FontAwesomeIcon>:fa===5?<FontAwesomeIcon icon={faCity}></FontAwesomeIcon>:fa===6?<FontAwesomeIcon icon={faHospital}></FontAwesomeIcon>:fa===7?<FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>:fa===8?<FontAwesomeIcon icon={faFlagCheckered} beat style={{color:'#3498db'}}></FontAwesomeIcon>:fa===9?<FontAwesomeIcon icon={faCircleDot} beat style={{color:'red'}}></FontAwesomeIcon>:''}
            </div>
        );
    }
}
export default Box;