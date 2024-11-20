import Grid from "./grid.js"
import  {Agent} from "./agent.js"
Agent.init()
Grid.initGrid()
Grid.initMainGrid()
Grid.initSecondGrid()
Grid.showGrid()
Agent.genAgent("cat",5)
Agent.genAgent("mouse",15)
Agent.genAgent("corn",10)

let cpt = 0
let runner = setInterval(()=>{
    console.clear()
    Grid.writeInSecond("legende",1)
    Grid.writeInSecond(` Cat  [C]:${Agent.population.get("cat")}`,3)
    Grid.writeInSecond(` Mouse[S]:${Agent.population.get("mouse")} `,4)
    Grid.writeInSecond(` Corn [M]:${Agent.population.get("corn")} `,5)
    Grid.showGrid()
    if(Agent.population.get("cat") == 0 && Agent.population.get("mouse") == 0) {
        clearInterval(runner)
    }
    Agent.agents.forEach((agent)=>{
        if(agent.life < 1 )            agent.dead()
        else if(agent.breed != "corn") agent.move()
        agent.life -= 1
    })

    cpt += 1

},500)