

class ChartProducts {
    constructor(prods){
        this.prods = prods;
    }



   [Symbol.asyncIterator](){
        const asyncGenerator = [];
        for(const prod of this.prods){
            asyncGenerator.push(this.promisify(prod));
        }

       const prodsIterator = asyncGenerator[Symbol.iterator]();


        return {
            async next(){

             
                let generator =  prodsIterator.next();
                if(generator.done){
                    return {done:true}
                }

                const thisprd = await generator.value;
              //  console.log(thisprd);
                return{
                    value:thisprd,done:false
                }
                



                }
            }
        }
    

    promisify(thing){
        return new Promise((res,rej)=>{
            setTimeout(()=>{
                res(thing);
            },500)
        })
    }
}

const chart = new ChartProducts(['milk', 'meat', 'eggs', 'fish', 'potatoes', 'tomatoes', 'bread', 'oils'])
//console.log(chart);

async function fn(){
    for await(const prod of chart){
        console.log(prod);
    }
}

fn();