from grid import Grid 
from agent import Mouse,Agent,Cat,Corn
import os,sys,time
from random import randint
Grid.initGrid()
Grid.initMainGrid()
Grid.initSecondGrid()
cpt = 0 
Agent.genAgent("cat", 5)
Agent.genAgent("mouse", 15)
Agent.genAgent("corn",10)
while True:
    os.system("cls")
    Grid.writeInSecondCard("legende", 1)
    Grid.writeInSecondCard(f" Cat  [C]:{Agent.population['cat']} ",3)
    Grid.writeInSecondCard(f" Mouse[S]:{Agent.population['mouse']} ",4)
    Grid.writeInSecondCard(f" Corn [M]:{Agent.population['corn']} ",5)
    Grid.writeInSecondCard(f"Durée ={cpt} périodes", 6)
    Grid.showGrid()
    if Agent.population["cat"] == 0 and Agent.population["mouse"] == 0:
        break
    if cpt % 10 == 0 and Agent.population["mouse"]>5:
        Corn()
    for agent in Agent.agents:
        if agent.life < 1:
            agent.dead()
        elif agent.breed != "corn":
            agent.move() 
        agent.life -= 1

 
    cpt += 1
    time.sleep(0.1)
