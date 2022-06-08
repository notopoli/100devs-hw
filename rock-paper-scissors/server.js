const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }

  else if (page == '/api') {
    if('student' in params){
      if(params['student']== 'rock'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        let gameRes = rps('rock')
        const objToJson = {
          computer: gameRes[0],
          result: gameRes[1],

        }
        res.end(JSON.stringify(objToJson));
      }      
      else if(params['student']== 'paper'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        let gameRes = rps('paper')
        const objToJson = {
          computer: gameRes[0],
          result: gameRes[1],

        }
        res.end(JSON.stringify(objToJson));
      }      
      else if(params['student']== 'scissors'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        let gameRes = rps('scissors')
        const objToJson = {
          computer: gameRes[0],
          result: gameRes[1],

        }
        res.end(JSON.stringify(objToJson));
      }
      
      else if(params['student'] != 'rock'|| params['student'] != 'paper'|| params['student'] != 'scissors'){
         res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          computer: "unknown",
          result: "Pick rock paper or scissors",

        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
    }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});


function rps(pick) {
  let random = Math.random()*3
  let choice
  let result
  if (random < 1){
    choice = 'rock'
  }else if (random > 2){
    choice = 'scissors'
  }else{
    choice = 'paper'
  }

  if (pick == choice){
    result = "You Tied"
  }else if ((pick == 'rock' && choice == 'scissors') || (pick == 'paper' && choice == 'rock') || (pick == 'scissors' && choice == 'rock')){
    result = "You Win"
  }else{
    result = "You Lose"
  }

  return [choice, result]
}

server.listen(8000);
