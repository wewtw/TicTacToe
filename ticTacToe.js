//checking a winner step 1-winner.
function checkWinner(state){
  //winning comb array
  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 5, 6],
  ];
  //loop throw the array and take in the state to determen the winner by checking. Step 2-winner.
  for(let i = 0; i<win.length; i++){
    const [a,b,c] = win[i];
    if(state[a] == state[b] && state[a] == state[c] && state[a])
      return state[a];
    }
  return null;
}


//so we make the squares and each of them keeps track of its own color.
const Square = ({id , player, newState}) =>{// this component will be the squares that will go on the rows. the id will show which square is which. newState is added here Part 4 of State.
  //if we pass in the nextPlayer throw the properties of square it will not work because each square will have a diffrent property and they will not be update in the right way.
  //here now to keep track of status of the player is it an X or an O write a new const called status
  const [status, setStatus] = React.useState(null);// now we get a zero or a one from the next player so we must now make the 0 =x and 1 = o
  const xio = ["O", "X"]; //this will be the array we will use to track if its an x or an o that went into the status.
  //to keep track of the color state of square crate 
  const [color, setColor] = React.useState('gray');//when a user first time presses this this color will be called and it will turn every square green unless changed but once it goes off the first time it will go diffrent from there.
  //whenever the color changes you know that the state was called and you can keep track of it too.
  //make a palet of color that can be used for squares
  const palet = ['red', 'blue', 'green'];
  //now write the function for the randomization.
  const getRandomColor=()=>{
    return palet[Math.floor(Math.random()*3)]; //by def math.random gets a number from zero to one but if you multiply by 3 it gets from 3/ 
    //math.floor will get an integer of 0,1,2 and it will take it from the palet array made eariler
  };
  //here I use useEffect to show which objects are being rendered like mounted and unmounted lifecicyle of componets tracker.
  React.useEffect(()=>{
    console.log(`Render ${id}`);
    return ()=> console.log(`unmounting Square ${id}`);
  });
  return(//keeps track of the state of square
    <button onClick={(e)=>{// e is the event that is being passed throw when a user clicks the square than the color changes to red
      //now to keep track of the state we use setColor to store the colors that are being passed.
      setColor(getRandomColor());// note that this updates the react state if it was like this e.target.style.background = getRandomColor(); this would be a direct DOM intervention and the components and shadow dom wont be updated.
      //Part 5 of State final part. in this onClick the newSate is called also and it passes in the value of the square.
      let nextPlayer = newState(id);//this needs to be an object with id and color parts of the square. So when this gets called we take this object and put it in the state array made in Step 1. //Step-10 of winner newState need to just write back the id instead of {id: id, color: color}
      //now to catch the next player we make a change in new state by making it equal to nextPLayer by adding let nextPlayer = newState ({id: id, color: color}); the original that does not track the player just looks like this newState ({id: id, color: color});
      //now this will let us find out if its an x or an o for that will need to write a new var
      e.target.style.background = color;//color change on click// after making the palet array with colors this can be set to the new random funcion instead of just 'red' by using getRandomCOlor or just by using the new color component.
      //at his part we set the status to next player this will update the xo and pass it into the h1.
      setStatus(nextPlayer);
      //this is a very important part becuse when the child square is clicked on it gets the player from the parent and at the same time it sends its state like id and color and than it also sets the next player.  
    }}>
      
      <h1>{xio[status]}</h1>
       
    </button>//keep track of the squares with id h1<h1>{id}</h1>//now intead of id it will keeps tack of xo with status

  );

};


const Board = () => {//step 1//make board//
   
  const [player, setPlayer] = React.useState(1);//player number
  const [state, setState] = React.useState(Array(9).fill(null)); //this is set to an empty array [] that will take in the clicks and the square id and color,
  //it is now chaged to an array of 9 filled with nulls to allow checking for winnner. Step 4-winner.
  const [mounted, setMounted] = React.useState(true); // this will be the mountiong and ounmounting child componnets 
  const [random, setRandom] = React.useState(0);//this will now remount the squares onto the board. and this needs to be a random function.
  //to keep track of the each squares and its color we need a to make a new state. Part 1 of State
  
  let status = `Player ${player}`;//shows which player is playing right now 1 or 2
  //now to finally check the winner 
  
  let winner = checkWinner(state);
  if(winner != null) status = `Player ${winner} wins the round`;
  
  
  //this will be the logic for the toggling the hide button
  const toggle =()=> setMounted(!mounted);
  //this is function that will rerender the squares using the render
  const reRender= ()=>setRandom(Math.random());
  //here we will define a new function that will be used by state//updated this so it also figures out the next player
  const newState = idOfSquare=>{//this was (object) but now it will be replaced by the idOfSquare to determine the winner Step 3-winner.
    let currentPlayer = player;//changing the player to return the current player Step 7-winner
    
    
    
    //change the state of a square to see who clicked on it (player). Step 5-winner
    state[idOfSquare] = player//setting it to a present player. so now this updates the state 
    setState(state); // now this is changed from [...state, object] to just state to set the state. Step 6-winner
    
    //make a new var called nextplayer
    let nextPlayer = (player +1)%2;//so this will now track const player
    //set the value of player by using setPlayer equals newPlayer
    
    setPlayer(nextPlayer); 
    //console.log(`adding to state ${JSON.stringify(state)}`); //now an extra thing that can be passed here is STATE PART 6 of State to see that what state looks like pass in the state instead of object. So as more objects are passed into the state the bigger the array will grow.
    //now this will keep track of the object in state Part 2 of State object tracking.
    //now status is added to track the player
    //status = `Player ${nextPlayer}`;
    return currentPlayer;//now this is set to the present player. change from nextPlayer Step 8-winner
    // this now makes it psble to catch the nextPlayer in the onClick button funtion
  }

  function renderSquare(i){// this is a function that generates the squares.
    return <Square id={i} player={player} newState={newState}></Square>//now since this is where squares are called we need to pass in the newState function here. Part 3 of State.
    //here the square is giving an id of i and and player is set to player?
  }
  return (//the board is a parent component and it has child components as squeres
    <div
      className="game-board">
    
      {/*onClick={(e) => {
        setPlayer(player + 1);
        status = `Player ${player}`;
      }}} this here is made to count the number of player clicks no longer needed I guess*/} 
       <div className="grid-row">
        {mounted && renderSquare(0)}
        {mounted && renderSquare(1)}
        {mounted && renderSquare(2)}
        
       
        {/* this calls the funtion and puts one square from the funtion here. if we need more we need to render more. The zero paramiter gives it the id of zero */}
        </div> {/*this makes the grid row where the squares will go */}
        <div className="grid-row">
        {mounted && renderSquare(3)}
        {mounted && renderSquare(4)}
        {mounted && renderSquare(5)}
        </div>
        <div className="grid-row">
        {mounted && renderSquare(6)}
        {mounted && renderSquare(7)}
        {mounted && renderSquare(8)}
        </div>
      <div id="info">
        <button onClick={toggle}>Hide row</button>
        <button onClick={reRender}>Re-Render</button>
         <h1>{status}</h1> {/* where it says takes the status of the player 1 or two.*/}
      </div>
    </div>
  );
};


// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
