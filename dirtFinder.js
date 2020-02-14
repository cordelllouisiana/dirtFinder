const express = require('express');
var fs = require('fs');
//var app = express()
//var port = 3000
const path = require('path');
//const router = express.Router();
var x =5
var y = 5;
var txt;


//creates the empty room
var currroom = [];
var dirtlocations = []

//create server
//app.listen(port, () => console.log(`Robotic Hoover is Starting on port ${port}!`))

//listen for input file and extract
var lines = new Array();
var dirt = new Array();
var direcs = new Array();
var dimx, dimy, currx, curry; 
fs.readFile('input.text', 'utf8', function (err, data) {
    if (err) throw err;
    txt = data;

    turnOnVaccum();
        
});

function turnOnVaccum() {
    lines = txt.split("\n");     
    //console.log(lines);
    //console.log(lines[0]);
    //console.log(lines[0].charAt(0));
    dimx = parseInt(lines[0].charAt(0));
    dimy = parseInt(lines[0].charAt(2));
    currx = parseInt(lines[1].charAt(0));
    curry = parseInt(lines[1].charAt(2));

    //create dirty spots
    for (var i = 2; i < 5; i++) {
        dirt.push(lines[i]);
    }

    createRoom(dimx, dimy);
    currroom = new setCurrLocation(currx, curry);

    for (var i = 0; i < dirt.length; i++) {
        dirtlocations.push(new createDirtLocation(parseInt(dirt[i].charAt(0)), parseInt(dirt[i].charAt(2))));

    }


    direcs = lines[5].split("");

    var k;
    //searchForDirt
    var count = 0;
    var comp = "";

    for (var i = 0; i < direcs.length; i++) {
        k = move(direcs[i], currroom.x, currroom.y);
        comp = comp.concat(k[0], " ", k[1]);
        dirt.forEach(element => {
            if (element == comp) {count++}
        });
        comp = "";
    }
    console.log(k[0] + " " + k[1]); //expected output line 1
    console.log(count); //expected output line 2

}


//create every spot in the room

var arr = new Array();

function createRoom(xval,yval) {

    for (var x = 0; x < xval; x++) {
        for (var y = 0; y < yval; y++) {
            arr.push(new coordinate(x, y));
            //arr.push("clean"); 
        }
    }

}


function coordinate(x, y) {
    this.x = x;
    this.y = y;
}


function setCurrLocation(x, y) {
    this.x = x;
    this.y = y;

}

function createDirtLocation(x, y) {
    this.x = x;
    this.y = y;
}

//for East direction

function goEastX(x) {
    return this.x = x + 1;
}

//for North direction

function goNorthY(y) {
    return this.y = y + 1;
}

//for West direction 
function goWestX(x) {
    return this.x = x - 1;
}
//for South direction

function goSouthY(y) {
    return this.y = y - 1;
}


function move(direct,currx,curry) {
    //based on direction call the specific function
    //return new coordinate
    if (direct == "N"){
        curry = goNorthY(curry);
    }
    if (direct == "S") {
        curry = goSouthY(curry);
    }
    if (direct == "W") {
        currx = goWestX(currx);
    }
    if (direct == "E") {
        currx = goEastX(currx);
    }
    var currs = new Array();
    currs.push(currx);
    currs.push(curry);
    //console.log(direct + " direction  " + currx + " " + curry);
    return currs;
}
