console.log("Hello, mom");

//establish beginning deck array

var deck = [];

//build constructor to render beginning deck array

//++++++establish constructor+++++++++++

//set array of set of values
var valueArray = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

//set array of set of suits
var suitsArray = ["spades","hearts","diamonds","clubs"];

//set array of set of face
var faceArray = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]

//build loop for suit
for (var suit = 0; suit < suitsArray.length; suit++) {

	//build loop for face and value
	for (var face = 0; face < faceArray.length; face++) {
		
		//constructor
			function Card() {

				//set value
			  this.value = valueArray[face];

			  //set suit
			  this.suit = suitsArray[suit];
			  //set face
			  this.face = faceArray[face];
			}
		  //assign object to variable
		  var card = new Card;
		  //add variable on to deck array
		  deck.push(card); 
	 }
}

//++++++establish funds object+++++++++++++
//start funds at $1000
var funds = {balance: 1000,
							//reduce funds by amount of bet 
							betReduce: function(bet) {
								this.balance = this.balance - bet;
								return this.balance
							},
							//return amount of bet in the case of a win
							winBet: function(bet) {
								this.balance = this.balance + bet;
								return this.balance;
							},
							//return 1.5 times amount of bet if blackjack
							winBlackjack: function(bet) {
								this.balance = this.balance + (bet * 1.5);
								return this.balance;
							}
							};

//++++++shuffle deck++++++++++++++++++++++

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // Run loop until the current index reaches zero
  while (0 !== currentIndex) {

    // grab a random index in the array up to current index
    randomIndex = Math.floor(Math.random() * currentIndex);
    //decrement current index
    currentIndex -= 1;

    // temp value is the current index item
    temporaryValue = array[currentIndex];
    //set the randomly picked element at the current index
    array[currentIndex] = array[randomIndex];
    //swap the temporary value into the array where we pulled out the random item
    array[randomIndex] = temporaryValue;
  }
  //return the shuffled array
  return array;
}

//++++++++set bet amount++++++++++++++++
//define bet variable
var bet = 30;

//display bet variable on screen
//insert bet in id betmessage
$betMessage = $('#betmessage');
$betMessage.append('Your bet: ' + bet);

//reduce funds by bet








