import style from './styles/Control.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHospital,faHouse,faBuilding, faChurch,faBuildingColumns,faCity,faFlagCheckered, faCircleDot} from '@fortawesome/free-solid-svg-icons';
function leftChild(x){
    return 2*x+1;
}
function rightChild(x){
    return 2*x+2;
}
function Parent(x){
    if(x%2===0){
        return Math.floor(x/2)-1;
    }
    else return Math.floor(x/2);
}
class PriorityQueue{
    constructor(){
        this.values=[];
        this.indexMap=new Map();
    }
    push(vertex,dist){
        var obj={
            id:vertex,
            distance:dist,
            prev:null
        }
        this.values.push(obj);
        this.indexMap.set(vertex,this.values.length-1);
        this.bubbleUp(obj.id);
    }
    bubbleUp(key){
        var i=this.indexMap.get(key);
        while(i>0){
            if(this.values[i].distance<this.values[Parent(i)].distance){
                var temp=this.values[i];
                this.values[i]=this.values[Parent(i)];
                this.values[Parent(i)]=temp;
                this.indexMap.set(this.values[i].id,i);
                this.indexMap.set(this.values[Parent(i)].id,Parent(i));
                i=Parent(i);
            }
            else break;
        }
    }
    DecreaseKey(key,val){
        const idx=this.indexMap.get(key);
        this.values[idx].distance=val;
        this.bubbleUp(key);
    }
    empty(){
        if(this.values.length===0)
            return true;
        else return false;
    }
    pop(){
        var i=0;
        const root=this.values[i];
        var temp=this.values[0];
        this.values[0]=this.values[this.values.length-1];
        this.values[this.values.length-1]=temp;
        this.values.pop();
        this.indexMap.delete(root.id);
        if(this.values.length!==0){
            this.indexMap.set(this.values[0].id,0);
        }
        var x=true;
        while(x===true){
            var l=leftChild(i);
            var r=rightChild(i);
            var sm=this.values[i];
            var k=i;
            if(l<this.values.length){
                if(sm.distance>this.values[l].distance){
                    sm=this.values[l];
                    k=l;
                }
            }
            if(r<this.values.length){
                if(sm.distance>this.values[r].distance){
                    sm=this.values[r];
                    k=r;
                }
            }
            if(k===i){
                break;
            }
            else{
                var j=this.indexMap.get(sm.id);
                var t=this.values[i];
                this.values[i]=this.values[j];
                this.values[j]=t;
                this.indexMap.set(sm.id,i);
                this.indexMap.set(this.values[j].id,j);
                i=k;
            }
        }
        return temp;
    }
};
function Dijkstra(graph,i,j,N){ 
    var mark=new Array();
    for(var k=0;k<N;++k){
        mark.push(false);
    }
    var dMap=new Map();
    var pMap=new Map();
    var pQ=new PriorityQueue()
    pQ.push(i,0);
    for(var k=0;k<N;k++){
        if(k!==i){
            pQ.push(k,Infinity);
        }
    }
    while(pQ.empty()===false){
        var obj=pQ.pop();
        dMap.set(obj.id,obj.distance);
        pMap.set(obj.id,obj.prev);
        console.log(obj);
        for(var k=0;k<graph[obj.id].length;++k){
            if(mark[graph[obj.id][k]]===false){    
                if(obj.distance+1<pQ.values[pQ.indexMap.get(graph[obj.id][k])].distance){
                    pQ.DecreaseKey(graph[obj.id][k],obj.distance+1);
                    pQ.values[pQ.indexMap.get(graph[obj.id][k])].prev=obj.id;
                }
            }
        }
        mark[obj.id]=true;
    }
    return [dMap.get(j),pMap];
}
function PathFinder(grid,setGrid,setOption){
    var N=grid.length;
    var M=grid[0].length;
    var src=-1;
    var des=-1;
    var graph=[];
    console.log(grid);
    for(var i=0;i<N*M;++i){
        graph.push([]);
    }
    for(var i=0;i<N;++i){
        for(var j=0;j<M;++j){
            if(grid[i][j]===0 || grid[i][j]===9 || grid[i][j]===8){
                if(i>0){
                   if(grid[i-1][j]===0 || grid[i-1][j]===9 ||grid[i-1][j]===8){
                      graph[i*M+j].push((i-1)*M+j);
                   }
                }
                if(i<N-1){
                    if(grid[i+1][j]===0 || grid[i+1][j]===9 || grid[i+1][j]===8){
                      graph[i*M+j].push((i+1)*M+j);
                    }
                }
                if(j>0){
                    if(grid[i][j-1]===0 || grid[i][j-1]===9 || grid[i][j-1]===8){
                      graph[i*M+j].push(i*M+j-1);
                    }
                }
                if(j<M-1){
                    if(grid[i][j+1]===0 || grid[i][j+1]===9 || grid[i][j+1]===8){
                      graph[i*M+j].push(i*M+j+1);
                    }
                }
            }
            if(grid[i][j]===9){
                src=i*M+j;
            }
            if(grid[i][j]===8){
                des=i*M+j;
            }
        }
    }
    console.log(graph);
    if(src===-1){
        alert("Source not specified.Please specify source");
    }
    else if(des===-1){
        alert("Destination not specified.Please specify destination");
    }
    else{
        alert('Are you sure?')
        console.log(N*M);
        var [d,map]=Dijkstra(graph,src,des,N*M);
        console.log(map);
        console.log(d);
        if(d===Infinity){
            alert("Destination is unreachable");
        }
        else{
            var copy=grid;
            var pt=des;
            while(pt!=null){
                console.log(`${pt}: row:-${Math.floor(pt/M)} col:-${pt%M}`);
                if(pt!==src && pt!==des){
                    copy[Math.floor(pt/M)][pt%M]=-1;
                }
                pt=map.get(pt);
            }
            console.log(copy);
            setOption(0);
            setGrid(copy);
        }
    }
}
const Control=({setOption,city,setCity})=>{
    return(
        <div className={style.control}>
            <div className={style.obj}>
                <div className={style.row0}>
                    <div className={style.col0}>
                        <button onClick={()=>setOption(0)}>Road</button>
                    </div>
                    <div className={style.col1}>
                        <button onClick={()=>setOption(1)}>Water</button>
                    </div>
                    <div className={style.col2}>
                        <button onClick={()=>setOption(2)}><FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon></button>
                    </div>
                    <div className={style.col3}>
                        <button onClick={()=>setOption(3)}><FontAwesomeIcon icon={faChurch}></FontAwesomeIcon></button>
                    </div>
                    <div className={style.col4}>
                        <button onClick={()=>setOption(4)}><FontAwesomeIcon icon={faBuildingColumns}></FontAwesomeIcon></button>
                    </div>
                </div>
                <div className={style.row1}>    
                    <div className={style.col5}>    
                        <button onClick={()=>setOption(5)}><FontAwesomeIcon icon={faCity}></FontAwesomeIcon></button>
                    </div>
                    <div className={style.col6}>
                        <button onClick={()=>setOption(6)}><FontAwesomeIcon icon={faHospital}></FontAwesomeIcon></button>
                    </div>
                    <div className={style.col7}>
                        <button onClick={()=>setOption(7)}><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></button>
                    </div>
                    <div className={style.col8}>
                        <button onClick={()=>setOption(8)}><FontAwesomeIcon icon={faFlagCheckered}></FontAwesomeIcon></button>
                    </div>
                    <div className={style.col9}>
                        <button onClick={()=>setOption(9)}><FontAwesomeIcon icon={faCircleDot}></FontAwesomeIcon></button>
                    </div>
                </div>
            </div>
            <div className={style.findRoute}>
                <button onClick={()=>PathFinder(city,setCity,setOption)}>Find Route</button>
            </div>
        </div>
    );
}
export default Control;