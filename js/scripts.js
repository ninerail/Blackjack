//+++++++++++++++++++++++++++++++++++++++++
//   establish beginning game conditions
//+++++++++++++++++++++++++++++++++++++++++

var deck = [];

//Dealer's hand
var dealerHand = [];

//Player's hand
var playerHand = [];

//declare and set dealer hand value
var dealerHandValue = 0;

//display initial funds
$('#bank').text("Funds: $1000");

//define bet variable
var bet = 0;

//display bet variable on screen
//insert bet in id betmessage
$betMessage = $('#betmessage');
$betMessage.append('Your bet: $' + bet);


//++++++++++++++++++++++++++++++++++++
//   Construct beginning deck array
//++++++++++++++++++++++++++++++++++++

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

//++++++++++++++++++
//   Add unicodes
//++++++++++++++++++

var unicodes = ["1F0A1"];
var $dealerHandRack = $('#dealerhandrack')
// $dealerHandRack.text('&#x1F0A1');
$('#dealerhandrack').text(String.fromCharCode(1F0C6));


//++++++++++++++++++++++++++++
//   establish funds object
//++++++++++++++++++++++++++++

//start funds at $1000
var funds = {balance: 1000,
							//reduce funds by amount of bet 
							betReduce: function() {
								this.balance = this.balance - bet;
								$('#bank').text("Funds: " + this.balance);
							},
							//return amount of bet in the case of a win
							winBet: function() {
								console.log("Player wins!")
								this.balance = this.balance + (2 * bet);
								//report the new balance
								$('#bank').text("Funds: " + this.balance);
								bet = 0;
								//report the new bet
								$betMessage.text('Your bet: ' + bet)
							},
							//return 1.5 times amount of bet if blackjack
							winBlackjack: function() {
								console.log("Player gets a blackjack!!")
								this.balance = this.balance + (2.5 * bet);
								//report the new balance
								$('#bank').text("Funds: " + this.balance);
								bet = 0;
								//report the new bet
								$betMessage.text('Your bet: ' + bet)
							},
							loseBet: function() {
								console.log("Player loses");
								//bet is gone 		
								bet = 0;
								//report the new bet
								$betMessage.text('Your bet: ' + bet)
							},
							push: function() {
								console.log("It's a push!")
								this.balance = this.balance + bet
							}
							};

//+++++++++++++++++++++++++++
//   shuffle deck function
//+++++++++++++++++++++++++++

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

//+++++++++++++++++++++++++
//   set bet phase
//+++++++++++++++++++++++++


//set onclick for id "one"
$('#one').click(function () {
	//increase bet by one
	bet++;
	funds.betReduce(1);
	//display bet
	$betMessage.text('Your bet: $' + bet);
});

//set onclick for id "five"
$('#five').click(function () {
	//increase bet by five
	bet += 5;
	funds.betReduce(5);
	//display bet
	$betMessage.text('Your bet: ' + bet);
});

//set onclick for id "twentyfive"
$('#twentyfive').click(function () {
	//increase bet by 25
	bet += 25;
	funds.betReduce(25);
	//display bet
	$betMessage.text('Your bet: ' + bet);
});

//set onclick for id "onehundred"
$('#onehundred').click(function () {
	//increase bet by 100
	bet += 100;
	funds.betReduce(100);
	//display bet
	$betMessage.text('Your bet: ' + bet);
});

$('#fivehundred').click(function () {
	//increase bet by 500
	bet += 500;
	funds.betReduce(500);
		//display bet
		$betMessage.text('Your bet: ' + bet);
});


//set onclick for deal
$('#deal').click(function () {
	console.log("Deal!");
	deal();
})

//set onclick for hit
$('#hit').click(function () {
	hit();
})

// //set onclick for stand
// $('#stand').click(function () {
// 	stand(playerHandValue);
// })



//++++++++++++++++++
//   Shuffle Deck and call bet phase
//++++++++++++++++++

shuffle(deck);

//+++++++++++++++++++
//   deal function
//+++++++++++++++++++

var deal = function () {

	//clear hands
	dealerHand = [];
	playerHand = [];

	// Pop a card off the deck. Put in in the dealer's hand. Twice
	for (var i = 0; i < 2; i++) {
		var currentCard = deck.pop();
		dealerHand.push(currentCard);	
	}

	//evaluate hand
	var dealerHandValue = dealerHand[0].value + dealerHand[1].value;
	
	//show dealer's first card
	console.log("Dealer shows " + dealerHand[0].value)

	//if dealer hand equals 21, call blackjack function
	if (dealerHandValue === 21) {
		console.log("Dealer Blackjack!");
		dealerWins();
	} else {
		//if dealer hand value exceeds 21, call bust function
		if (dealerHandValue > 21) {
			console.log("Dealer Bust!");
			playerWins();
		} 
	}

	// Put it in the player's hand. Twice
	for (var i = 0; i < 2; i++) {
			var currentCard = deck.pop();
			playerHand.push(currentCard);	
	}

	//evaluate hand
	var playerHandValue = playerHand[0].value + playerHand[1].value;
	
	//show player hand value
	console.log("Player has " + playerHandValue);

	//if player hand equals 21, call blackjack function
	if (playerHandValue === 21) {
		console.log("Player Blackjack!");
		playerWinsBlackjack();
	} else {
		//if player hand value exceeds 21, call bust function
		if (playerHandValue > 21) {
			console.log("Player Bust!");
			dealerWins();
		} 
	}

	//set onclick for stand and pass player hand value as argument
	$('#stand').click(function () {
		stand(playerHandValue);
	})
}

//++++++++++++++++++
//   Hit function
//++++++++++++++++++

var hit = function () {
	//Pop a card off the deck, 
	var currentCard = deck.pop();
	//Put it in the player's hand
	playerHand.push(currentCard);
	//Sum up the value of the player's hand
	var playerHandValue = 0;
	for (var i = 0; i < playerHand.length; i++ ) {
		playerHandValue += playerHand[i].value;
	}
	console.log("Player has " + playerHandValue);

	//Test for 21
	if (playerHandValue === 21) {
		console.log("Player hits 21!");
		stand(21);
	}

	//Test for bust
	if (playerHandValue > 21) {
		console.log("Player busts!");
		dealerWins();
	}
	//set onclick for stand and pass player hand value as argument
	$('#stand').click(function () {
		stand(playerHandValue);
})
}

//+++++++++++++++++++
//   Stand function
//+++++++++++++++++++

var stand = function (playerHandValue) {

	//loop over dealers hand values
	//this gets called twice
	for (var i = 0; i < dealerHand.length; i++) {
		//add to dealer hand value
		dealerHandValue += dealerHand[i].value;
	}

	//Report dealer hand value
	console.log("Dealer has: " + dealerHandValue);

	//if less than 17, hit and repeat until 17 or more
	while (dealerHandValue < 17) {
		console.log("Dealer takes card");
		//pop a card off the stack
		var currentCard = deck.pop();
		//Put it in the player's hand
		dealerHand.push(currentCard);
		dealerHandValue += currentCard.value
		console.log("Dealer has " + dealerHandValue)
	}

	if (dealerHandValue > 21) {
		console.log("Dealer busts");
		//do I need this?
		dealerHandValue = 0;
		playerWins();
	} else {
		console.log("Dealer stands");
		//check to see who wins
		checkWhoWins(playerHandValue, dealerHandValue);
	}
}
//+++++++++++++++++++++++++++++
//   Check who wins function
//+++++++++++++++++++++++++++++

var checkWhoWins = function (playerHandValue, dealerHandValue) {
	console.log("check who wins");
	if (playerHandValue > dealerHandValue) {
		console.log("player wins function next");
		playerWins();
	} else {
		if (dealerHandValue > playerHandValue) {
			dealerWins();
		} else {
			push();
		}
	}
}

//++++++++++++++++++++++++++
//   Player wins function
//++++++++++++++++++++++++++

var playerWins = function () {
	funds.winBet(bet);
}

//++++++++++++++++++++++++++
//   Dealer wins function
//++++++++++++++++++++++++++

var dealerWins = function() {
	funds.loseBet(bet);
}

//+++++++++++++++++++++++
//   Push function
//+++++++++++++++++++++++

var push = function () {
	funds.push(bet);
}

// //+++++++++++++++++++++++++
// //   Play Again function
// //+++++++++++++++++++++++++

// var playAgain = function () {
// 	var yesOrNo = prompt("Would you like to quit?")
// 	if (yesOrNo = "yes") {
// 		//play game function
// 		console.log("Thanks for Playing!");
// 	} else {
// 		betPhase();
// 	}
// }

//++++++++++++++++++++++++++++++++++++
//   Player Wins Blackjack function
//++++++++++++++++++++++++++++++++++++

var playerWinsBlackjack = function () {
	funds.winBlackjack();
}


