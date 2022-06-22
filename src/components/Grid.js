import Box from "./Box";
import style from './styles/Grid.module.css';

const Grid=({opt,grid,setGrid})=>{
    return(
        <div className={style.grid}>
            {grid.map((v,i)=>{
                return(
                    <div className={style.row}>
                        {v.map((val,j)=>{
                            return(
                                <div className={style.col}>
                                    <Box opt={opt} r={i} c={j} grid={grid} setGrid={setGrid}/>
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
