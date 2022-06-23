import Box from "./Box";
import style from './styles/Grid.module.css';

const Grid=({opt,city,setCity})=>{
    return(
        <div className={style.grid}>
            {city.map((v,i)=>{
                return(
                    <div className={style.row}>
                        {v.map((val,j)=>{
                            return(
                                <div className={style.col}>
                                    <Box opt={opt} r={i} c={j} city={city} setCity={setCity}/>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )
}
export default Grid;
