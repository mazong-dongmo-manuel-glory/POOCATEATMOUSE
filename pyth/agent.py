from grid import Grid
from random import randint
from utils import genToken
class Agent:
    identifiers = dict()
    population  = dict() 
    agents =  []
    identifiers["cat"]   =  "C"
    identifiers["mouse"] =  "S"
    identifiers["corn"]  =  "M"
    population["cat"]    =   0
    population["mouse"]  =   0
    population["corn"]   =   0
    def __init__(self):
        self.breed = None
        self.life = 500
        self.coordinate =  dict()
        while True:
            i = randint(1, Grid.n-1)
            j = randint(1, Grid.n-1) 
            if Grid.isEmptyTile(i, j):
                self.coordinate["i"] =  i 
                self.coordinate["j"] =  j 
                self.id = genToken()
                Agent.agents.append(self)
                break

    @classmethod
    def genAgent(cls,breed,number):
        for i in range(number):
            if breed == "cat"  :Cat()
            if breed == "mouse":Mouse()
            if breed == "corn" : Corn()
    def getAgentAtcoord(self,i,j):
        for v in Agent.agents:
            if v.coordinate["i"] == i and v.coordinate["j"] == j:
                return v 
        return None
    
    def dead(self):
        Grid.removePixel(self.coordinate["i"], self.coordinate["j"])
        Agent.agents.remove(self)
        Agent.population[self.breed] -= 1



class Animal(Agent):
    sexs = ["masculin","feminin"]
    def __init__(self):
        Agent.__init__(self)
        self.sex = None
    
    def move(self):
        i = self.coordinate["i"]+randint(-1, 1)
        j = self.coordinate["j"]+randint(-1, 1)
        actualAgent = self.getAgentAtcoord(i, j)
        if j>Grid.n-2 or j<2 or i >Grid.n-2 or i<2:
            self.dead() 
            return
        if actualAgent:
            if self.breed == "cat" and actualAgent.breed == "mouse":
                self.eat(actualAgent) 
                return 
            elif self.breed == "mouse" and actualAgent.breed == "cat":
                actualAgent.eat(self)
                return
            elif self.breed == "mouse" and actualAgent.breed == "corn":
                self.eat(actualAgent)
                return
            elif self.breed == "corn" and actualAgent.breed == "mouse":
                actualAgent.eat(self)
                return 
            elif self.breed == actualAgent.breed and self.sex != actualAgent.sex:
                self.reproduce()
                actualAgent.move()
                self.move()
                return 
        else:
            Grid.removePixel(self.coordinate["i"], self.coordinate["j"])
            self.coordinate["i"] = i 
            self.coordinate["j"] = j 
            Grid.addPixel(self.identifiers[self.breed], i, j)
    
    def eat(self,agent):
        i =  agent.coordinate["i"]
        j =  agent.coordinate["j"]
        Grid.removePixel(self.coordinate["i"], self.coordinate["j"])
        Grid.removePixel(i, j)
        Grid.addPixel(self.identifiers[self.breed], i, j) 
        agent.dead()
    
    def reproduce(self):
        if self.breed == "cat":
            Cat()
            return 
        elif self.breed == "mouse":
            Mouse()
        
class Corn(Agent):
    def __init__(self):
        Agent.__init__(self)
        self.breed = "corn"
        Agent.population[self.breed] += 1
        Grid.addPixel(Agent.identifiers[self.breed], self.coordinate["i"], self.coordinate["j"])


class Mouse(Animal):

    def __init__(self,sex=Animal.sexs[randint(0,1)]):
        Animal.__init__(self)
        self.breed = "mouse"
        self.sex   = sex 
        Agent.population["mouse"] += 1
        Grid.addPixel(Agent.identifiers[self.breed], self.coordinate["i"], self.coordinate["j"])


class Cat(Animal):

    def __init__(self,sex=Animal.sexs[randint(0,1)]):
        Animal.__init__(self)
        self.breed =  "cat"
        self.sex   = sex
        Agent.population["cat"] += 1
        Grid.addPixel(Agent.identifiers[self.breed], self.coordinate["i"], self.coordinate["j"])
