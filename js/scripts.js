console.log("Hello, mom");

//establish beginning game conditions
//deck array
var deck = [];

//Dealer's hand
var dealerHand = [];

//Player's hand
var playerHand = [];

//display initial funds
$('#bank').text("Funds: $1000");

//define bet variable
var bet = 0;

//display bet variable on screen
//insert bet in id betmessage
$betMessage = $('#betmessage');
$betMessage.append('Your bet: $' + bet);


//++++++Construct beginning deck array++++++++++++++++

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
								$('#bank').text("Funds: " + this.balance);
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

//++++++++set click listeners++++++++++++

//bet round function

var betRound = function () {
	
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
}

//set onclick for deal
$('#deal').click(function () {
	console.log("Deal!");
	deal();
})

//set onclick for hit
$('#hit').click(function () {
	hit();
})
//set onclick for stand
$('#stand').click(function () {
	stand();
})

//+++++++++++++end of onclicks++++++++++++++++

// make function to deal first turn
var deal = function () {

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
	} else {
		//if dealer hand value exceeds 21, call bust function
		if (dealerHandValue > 21) {
			console.log("Dealer Bust!");
		} 
	}

	// Put it in the player's had. Twice
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
	} else {
		//if player hand value exceeds 21, call bust function
		if (playerHandValue > 21) {
			console.log("Player Bust!");
		} 
	}
}

//+++++++++++Hit button function++++++++++++++

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
		console.log("Player hits 21!")
		// function stand
	}

	//Test for bust
	if (playerHandValue > 21) {
		console.log("Player busts!");
		//function lose
	}
}

//++++++++++++++++Stand button function+++++++++++++++

var stand = function () {

	//loop over dealers hand values
	var dealerHandValue = 0;
	for (var i = 0; i < dealerHand.length; i++) {
		dealerHandValue += dealerHand[i].value;
	}

	//Report dealer hand value
	console.log("Dealer has: " + dealerHandValue);

	//Dealer pops one card off deck
	var currentCard = deck.pop();
	//Dealer adds card to hand
	dealerHand.push(currentCard)


}









