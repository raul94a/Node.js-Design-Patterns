

class ChartProducts {
    constructor(prods) {
        this.prods = prods;
    }



    async *[Symbol.asyncIterator]() {
        const asyncGenerator = [];
        for (const prod of this.prods) {
            asyncGenerator.push(this.promisify(prod));
        }

       // const prodsIterator = asyncGenerator[Symbol.iterator]();
        for(const pr of asyncGenerator){
            yield await pr;
        }

    }

    promisify(thing) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(thing);
            }, 500)
        })
    }
}

const chart = new ChartProducts(['milk', 'meat', 'eggs', 'fish', 'potatoes', 'tomatoes', 'bread', 'oils'])
//console.log(chart);

async function fn() {
    for await (const prod of chart) {
        console.log(prod);
    }
}

fn();