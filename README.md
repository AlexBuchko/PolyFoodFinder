# Links to Project Boards
Since we changed ownership of the repo to try to set up CI/CD, the links to the project boards don't work

https://github.com/users/AlexBuchko/projects/1

https://github.com/users/AlexBuchko/projects/3

https://github.com/users/AlexBuchko/projects/4

# PolyBites

PolyBites is a student-created web application to help students navigate through Cal Poly's dining options. Whether students are restricted by their dietary needs, location, or budget, PolyBites is able to help them filter down the available options and find what suits their needs best. They are also able to view the nutritional information of foods and leave reviews and ratings for future guests, as well as a food poisoning warning. Cal Poly students help each other- learn by EATING.

## UI  Prototype

FIGMA LINK: https://www.figma.com/file/sJcBUOTPh9FAqJsr1K5XTy/PolyBites-Home-Page?node-id=2%3A2

Last Updated: 10/21/22

## Development Environment Set Up
### Installing Jest with MongoDB
1) npm install --save-dev @shelf/jest-mongodb
2) Specify the preset in your Jest configuration:
   {
      "preset": "@shelf/jest-mongodb"
   }

## Style Checker/Linter

### How to set up VSCode plugin for Prettier:
1) in the extensions tab, search for "prettier"
2) download "Prettier = Code formatter" by Prettier

### How to download Prettier locally:
npm install --save-dev --save-exact prettier

## Diagrams
<img width="742" alt="Screen Shot 2022-11-30 at 3 52 29 PM" src="https://user-images.githubusercontent.com/63268343/204932842-4930c78b-77e3-4a48-beb8-fd148133ad01.png">

## Code Coverage Report
<img width="599" alt="Screen Shot 2022-11-30 at 3 58 01 PM" src="https://user-images.githubusercontent.com/63268343/204933458-4fb894f6-7e81-48c6-9e80-dc36d981fa35.png">
! lines 15 and 13 are db connection lines

## Sequence Diagram
![image](https://user-images.githubusercontent.com/114194038/205140939-059c79f3-c303-4edb-a9c3-f7dc2b1e0fc1.png)

Just a heads up, we didn't get the CD working
