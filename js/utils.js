function random(min,max){
    return Math.floor(Math.random() * (max - min) + min)
}


function remove(array,element){
    function different(el){
        return el != element
    }
    array = array.filter(different)
    return array
}
export  {random,remove}