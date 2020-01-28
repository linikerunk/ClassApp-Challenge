/* Desafio ClassApp */
const systemFile = require('fs'); // modulo nativo do node para ler arquivos..
const path = require('path');// caminho
const _ = require('lodash'); // biblioteca para usar o groupBy para o John


function readCSV() {

    const content = systemFile.readFileSync("input.csv", "utf-8", (err, content) => {
        if (err) throw err;
    });
    return splitLinesAndColumns(content);
}

function splitLinesAndColumns(content) {
    let arrayContent = content.split("\r\n"); // \n fez eu perde muito tempo kkk 
    let headers = arrayContent.shift().split(",").map(value => value.replace('"', '').replace('"', '').trim());
    arrayContent = arrayContent.map(value => value.split(',')).map((value) => value.map(value => value.replace('"', '').replace('"', '').trim())); // remove character from array javascript
    let resp = arrayContent.map(valueArray => {
        let response = {}
        // Value: [name, 1234, sala 1 / 2, sala 3, email, fone1, fone2, email2, email3, telefone, invisible, see all]
            valueArray.map((value, index) => {
                response[headers[index]] = value
                // _.groupBy(response, headers['eid'])
                // _.concat(response[headers[index]], value) # aqui eu tentei concatenar os valores do eid 1234
            })
        return response;
    })

    return ArrayToJson(resp);

}

function ArrayToJson(resp){
    outputJson = path.join(__dirname, 'output.json')
    systemFile.writeFile(outputJson, JSON.stringify(resp), 'utf-8', (erro) => {
        if (erro) {
            systemFile.writeFileSync(outputJson, 'utf-8', erro)
        }
    })
}

readCSV()

