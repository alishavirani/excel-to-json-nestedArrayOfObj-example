const excelToJson = require('convert-excel-to-json');
var fs = require('fs');
var util = require('util');
const _ = require('lodash');

const result = excelToJson({
    sourceFile: 'departmentData.xlsx',
    columnToKey: {
        A: 'Department',
        B: 'Tribe',
        C: 'Squads',
        D: 'PO',
        E: 'TO',
        F: 'TL000'
    }
});

// console.log("result???", result.Sheet1);
let data = result.Sheet1;
let resultArray = [];
for(let i = 1; i < data.length; i++) {
    if(resultArray.length) {
        for(let j = 0; j < resultArray.length; j++) {

            if(resultArray[j].name == data[i].Department) {

                for(let t = 0; t < resultArray[j].tribes.length; t++) {
                    
                    if(resultArray[j].tribes[t].name == data[i].Tribe) {
                        resultArray[j].tribes[t].squads.push({
                            name: data[i].Squads,
                            PO: data[i].PO,
                            TO: data[i].TO,
                            TL: data[i].TL
                        });
                        break;
                    }
                    if(t == resultArray[j].tribes.length - 1) {
                        addNewTribe();
                        break;
                    }
                }

                function addNewTribe() {
                    resultArray[j].tribes.push({
                        name: data[i].Tribe,
                        squads: [{
                            name: data[i].Squads,
                            PO: data[i].PO,
                            TO: data[i].TO,
                            TL: data[i].TL,
                        }]
                    })
                }

            } else {
                resultArray.push({
                    name: data[i].Department,
                    tribes: [{
                        name: data[i].Tribe,
                        squads: [{
                            name: data[i].Squads,
                            PO: data[i].PO,
                            TO: data[i].TO,
                            TL: data[i].TL,
                        }]
                    }]
                });
            }
            break;
        }
    } else {
        resultArray.push({
            name: data[i].Department,
            tribes: [{
                name: data[i].Tribe,
                squads: [{
                    name: data[i].Squads,
                    PO: data[i].PO,
                    TO: data[i].TO,
                    TL: data[i].TL,
                }]
            }]
        });
    }
}

console.log("resultArray??", resultArray);

fs.writeFileSync('./data.json', JSON.stringify(resultArray, null, 2) , 'utf-8');