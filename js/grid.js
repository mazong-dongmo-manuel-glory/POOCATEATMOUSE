export default class Grid {
    static columns = 60;
    static rows    = 26;
    static n       = 25;
    static container = [];
    

    static initGrid(){
        for(let i=0;i<Grid.rows;i++){
            Grid.container.push([])
            for(let j=0;j<Grid.columns;j++){
                Grid.container[i].push("   ")
            }
        }
    }

    static initMainGrid(){
        for(let i=0;i<Grid.n;i++){
            for(let j=0;j<Grid.n;j++){
                if(i == 0 || i == Grid.n-1){
                    Grid.addPixel("x",i,j)
                }else if(j == 0 || j == Grid.n-1){
                    Grid.addPixel("x",i,j)
                }
            }
        }
    }
    static initSecondGrid(){
        for(let i=0;i<10;i++){
            for(let j=Grid.n+10;j<Grid.columns;j++){
                if(i == 0 || i == 9 ){
                    Grid.addPixel("x",i,j)
                }else if(j ==  Grid.n+10 || j == Grid.columns-1){
                    Grid.addPixel("x",i,j)
                }
            }
        }
    }
    static showGrid(){
        for(let i=0;i<Grid.rows;i++){
            for(let j=0;j<Grid.columns;j++){
                process.stdout.write(Grid.container[i][j])

            }
            console.log("")
        }
    }
    static addPixel(pixel,i,j){
        Grid.container[i][j] = ` ${pixel} `
    }
    static getPixel(i,j){
        return Grid.container[i][j]
    }
    static removePixel(i,j){
        Grid.container[i][j] = "   "
    }
    static isEmptyTile(i,j){
        return Grid.container[i][j] == "   "
    }
    static writeInSecond(text,i){
        let cptl =  Grid.n+12 
        for(let j=0;j<text.length;j++){
            Grid.container[i][cptl] = ` ${text[j]} `
            cptl += 1
        }
    }
    
}
