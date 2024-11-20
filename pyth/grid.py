import sys
class Grid:
    columns = 60
    rows    = 26
    n       = 25
    container = []


    @classmethod 
    def initGrid(cls):
        for i in range(cls.rows):
            cls.container.append([])
            for _ in range(cls.columns):
                cls.container[i].append("   ")

    @classmethod
    def initMainGrid(cls):
        for i in range(cls.n):
            for j in range(cls.n):
                if i == 0 or i==cls.n-1:
                    cls.addPixel("x", i, j)
                elif j == 0 or j==cls.n-1:
                    cls.addPixel("x", i, j) 
    @classmethod
    def initSecondGrid(cls):
        for i in range(10):
            for j in range(cls.n+10,cls.columns):
                if i == 0 or i == 9:
                    cls.addPixel("x", i, j)
                elif j == cls.n+10 or j == cls.columns-1:
                    cls.addPixel("x", i, j)
    @classmethod
    def showGrid(cls):
        for i in range(cls.rows):
            for j in range(cls.columns):
                sys.stdout.write(cls.container[i][j])
            print("")
    @classmethod
    def addPixel(cls,pixel,i,j):
        cls.container[i][j] = f" {pixel} " 

    @classmethod 
    def getPixel(cls,i,j):
        return cls.container[i][j]

    @classmethod 
    def removePixel(cls,i,j):
        cls.container[i][j] = "   "
    
    @classmethod 
    def paintMainCard(cls):
        pass

    @classmethod
    def isEmptyTile(cls,i,j):
        return cls.container[i][j] == "   "
    
    @classmethod
    def writeInSecondCard(cls,text:str,i):
        cptl = cls.n+12
        for j in range(len(text)):
            Grid.container[i][cptl] = f" {text[j]} " 
            cptl += 1
