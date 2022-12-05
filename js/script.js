"use strict";

/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

// Level01
// Winged Creatures
let textObjects = [];
let numTextObjects = 10;
let textObject;
// Written Text
let currentPhrase = 0;
let phrases = [
  "It angers me",
  "To remain quiet"
];
let lyrics = [
  "Yeah, I'm gonna take my horse",
  "to the old town road",
  "I'm gonna ride",
  "'til I can't no more"
];
// Declaring Gravity
let gravityForce = 0.001;

// Button Text
let buttonText = "I have something to say";

//Mic Input
let mic;

function preload() {

}


/**
Description of setup
*/
function setup() {
  // General Scene Set Up
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textAlign(CENTER, CENTER);

  // Mic Input
  mic = new p5.AudioIn();
  mic.start();

  // Audio
  userStartAudio();
}



/**
Description of draw()
*/
function draw() {

  background(250);
  spawnWord();

  manageButton();

}

function spawnWord(){
  // Manage Text Objects
  // Mic Input Lifts Creatures
  let level = mic.getLevel();
  let liftAmount = map(level, 0, 1, 0, 1);
  let fontGrowth = map(level, 0, 1, random(0, 1), random(30, 40));
  let opacityAmount = map(level, 0, 1, 0, 10);

  // Winged Creatures
  for(let i = 0; i < textObjects.length; i ++){
    let textObject = textObjects[i];
      textObject.update(gravityForce, liftAmount, fontGrowth, opacityAmount);
    }
}

function createTextObject(){
  // Text Objects
  let x = random(width/4, 3*width/4);
  let y = random(-200, -50);
  let constrainX = random(height/3, height - 50);
  let content = phrases[currentPhrase];
  // let content = lyrics[currentPhrase];
  let fontSize = random(30, 100);
  textObject = new TextObject(x, y, constrainX, content, fontSize);
  textObjects.push(textObject);
}

function manageButton(){
  // Display Button
  push();
  rectMode(CENTER, CENTER);
  stroke(150, 255);
  strokeWeight(2);
  fill(200, 255);
  rect(width/2, height/4, 250, 30, 8);
  noStroke();
  textSize(15);
  textStyle(BOLD);
  fill(80, 255);
  text(buttonText, width/2, height/4 + 2);
  //textStyle(BOLD);
  text("S P A C E B A R", width/2, height/4 + 35,);
  pop();
}

function keyPressed(){
  if(keyCode === 32){
    createTextObject();

    buttonText = "I have  m o r e  to say";

    // Go to next Sentence
    currentPhrase++;
    // Reset Array
    if(currentPhrase >= phrases.length){
    //if(currentPhrase >= lyrics.length){
      currentPhrase = 0;
    }
  }
}
