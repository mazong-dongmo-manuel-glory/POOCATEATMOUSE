import Grid from "./grid.js" 
import { random,remove } from "./utils.js"
class Agent{
    static identifiers = new Map()
    static population  = new Map()
    static agents      = []
    static init(){
        Agent.identifiers.set("cat","C")
        Agent.identifiers.set("mouse","S")
        Agent.identifiers.set("corn","M")
        Agent.population.set("cat",0)
        Agent.population.set("corn",0)
        Agent.population.set("mouse",0)
    }

    static genAgent(breed,number){
        for(let i = 0;i<number;i++){
            if (breed == "cat")   new Cat()
            if (breed == "mouse") new Mouse()
            if (breed == "corn")  new Corn()
        }
    }

    constructor(){
        this.breed =  null
        this.coordinate = {i:0,j:0}
        this.life = 100
        while(true){
            let i = random(1,Grid.n-1)
            let j = random(1,Grid.n-1)
            if(Grid.isEmptyTile(i,j)){
                this.coordinate.i =  i
                this.coordinate.j =  j 
                Agent.agents.push(this)
                break
            }
        }

    }
    getAgentAtcoord(i,j){
        for(let x = 0;x<Agent.agents.length;x++){
            if(Agent.agents[x].coordinate.i == i && Agent.agents[x].coordinate.j == j){
                return Agent.agents[x]
            }
        }
        return null
    }
    dead(){
        Grid.removePixel(this.coordinate.i,this.coordinate.j)
        Agent.agents = remove(Agent.agents,this)
        Agent.population.set(this.breed,Agent.population.get(this.breed)-1)
    }
}
class Animal extends Agent {
    static sexes = ["masculin","feminin"]
    constructor(){
        super()
        this.sex  =  null
    }
    move(){
        let i =  this.coordinate.i+random(-1,1)
        let j =  this.coordinate.j+random(-1,1)
        let actualAgent = this.getAgentAtcoord(i,j)
        if (j>Grid.n-2 || j<2 || i>Grid.n-2 || i<2){
            this.dead()
            return
        }
        if(actualAgent){
            if(this.breed =="cat" && actualAgent.breed == "mouse"){
                this.eat(actualAgent)
                return
            }else if(this.breed == "mouse" && actualAgent.breed == "cat"){
                actualAgent.eat(this)
                return
            }else if(this.breed == "mouse" && actualAgent.breed == "corn"){
                this.eat(actualAgent)
                return
            }else if(this.breed == "corn" && actualAgent.breed == "mouse"){
                actualAgent.eat(this)
                return
            }else if (this.breed == actualAgent.breed && this.sex != actualAgent.sex) {
                this.reproduce()
                actualAgent.move()
                this.move()
                return
            }
        }else{
            Grid.removePixel(this.coordinate.i,this.coordinate.j)
            this.coordinate.i = i 
            this.coordinate.j = j 
            Grid.addPixel(Agent.identifiers.get(this.breed),i,j)
        }
    }
    eat(agent){
        let i = agent.coordinate.i 
        let j = agent.coordinate.j 
        Grid.removePixel(this.coordinate.i,this.coordinate.j)
        Grid.removePixel(i,j)
        Grid.addPixel(Agent.identifiers.get(this.breed),i,j)
        agent.dead()
    }
    reproduce(){
        if(this.breed == "cat")   new Cat()
        if(this.breed == "mouse") new Mouse()
    }
}

class Corn extends Agent {
    constructor(){
        super()
        this.breed = "corn"
        Agent.population.set(this.breed,Agent.population.get(this.breed)+1)
        Grid.addPixel(Agent.identifiers.get(this.breed),this.coordinate.i,this.coordinate.j)
    }
}

class Mouse extends Animal {
    constructor(sex=Animal.sexes[random(0,1)]){
        super()
        this.breed = "mouse"
        this.sex = sex 
        Agent.population.set(this.breed,Agent.population.get(this.breed)+1)
        Grid.addPixel(Agent.identifiers.get(this.breed),this.coordinate.i,this.coordinate.j)
    }
}
class Cat extends Animal {
    constructor(sex=Animal.sexes[random(0,1)]){
        super()
        this.breed = "cat"
        this.sex = sex 
        Agent.population.set(this.breed,Agent.population.get(this.breed)+1)
        Grid.addPixel(Agent.identifiers.get(this.breed),this.coordinate.i,this.coordinate.j)
    }
}

export {
    Agent,
    Corn,
    Mouse,
    Cat
}