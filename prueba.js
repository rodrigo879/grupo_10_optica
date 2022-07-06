// productsJSON = JSON.stringify(products);
// fs.writeFileSync('./database/products.json', productsJSON);
// for(let i = 0; i < 12; i++) {
//     let ramdomI = Math.floor(Math.random() * 48)
//     console.log(ramdomI);
// }

let result = [];
let i = 0;

do {
    let ramdomI = Math.floor(Math.random() * 49)
    if(result.find(element => element == ramdomI) == undefined) {
        result.push(ramdomI)
        i = i + 1;
    }
} while (i < 12);

console.log(result);

//let found = result.find(element => element == 0)
