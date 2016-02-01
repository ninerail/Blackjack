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
$('#bank').text("Funds: 1000");

//define bet variable
var bet = 0;

//display bet variable on screen
//insert bet in id betmessage
$betMessage = $('#betmessage');
$betMessage.append('Your bet: $' + bet);

//declare tag appended
var $tagAppended

//conditions to disable buttons
var betYet = false;
var dealYet = false;


//++++++++++++++++++++++++++++++++++++
//   Construct beginning deck array
//++++++++++++++++++++++++++++++++++++

var buildDeck = function () {
	//set array of set of values
	var valueArray = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

	//set array of set of suits
	var suitsArray = ["spades","hearts","diamonds","clubs"];

	//set array of set of face
	var faceArray = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]

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
				  //set id
				  this.id = suitsArray[suit] + faceArray[face];
				}
			  //assign object to variable
			  var card = new Card;
			  //add variable on to deck array
			  deck.push(card); 
		 }
	}
}

//++++++++++++++++++
//   Add unicodes
//++++++++++++++++++

//unsuccessful attempt using jQuery to deliver unicodes
// var unicodes = ["1F0A1"];
// var $dealerHandRack = $('#dealerhandrack')
// // $dealerHandRack.text('&#x1F0A1');
// $('#dealerhandrack').text(String.fromCharCode(1F0C6));


//++++++++++++++++++++++++++++
//   establish funds object
//++++++++++++++++++++++++++++

//start funds at $1000
var funds = {balance: 1000,
							//reduce funds by amount of bet 
							betReduce: function() {

								//reduce balance by bet amount
								this.balance = this.balance - bet;

								//display funds balance
								$('#bank').text("Funds: " + this.balance);

								betYet = true;
							},
							//return amount of bet in the case of a win
							winBet: function() {

								//announce result
								console.log("Player wins!")
								$('#gamemessage').text("player wins!");


								//add twice the bet to the balance
								this.balance = this.balance + (2 * bet);

								//display the new balance
								$('#bank').text("Funds: " + this.balance);

								//Reset bet yet for next turn	
								betYet = false;
								dealYet = false;

								//zero out the bet
								bet = 0;

								//report the new bet
								$betMessage.text('Your bet: ' + bet)
							},
							//return 1.5 times amount of bet if blackjack
							winBlackjack: function() {

								//announce result
								console.log("Player gets a blackjack!!")
								$('#gamemessage').text("player gets a blackjack!!");


								//pay 2.5 times the bet to balance
								this.balance = this.balance + (2.5 * bet);

								//report the new balance
								$('#bank').text("Funds: " + this.balance);
								
								//Reset bet yet for next turn	
								betYet = false;
								dealYet = false;
								//zero out the bet
								bet = 0;

								//report the new bet
								$betMessage.text('Your bet: ' + bet);

							},
							loseBet: function() {

								//annonce result
								console.log("Player loses");
								$('#gamemessage').text("player loses");
								
								//Reset bet yet for next turn	
								betYet = false;
								dealYet = false;

								//zero out the bet 		
								bet = 0;

								//report the new bet
								$betMessage.text('Your bet: ' + bet)
							},
							push: function() {

								//announce result
								console.log("It's a push!")
								$('#gamemessage').text("player wins!");


								//add bet back to balance
								this.balance = this.balance + bet;

								//Reset bet yet for next turn	
								betYet = false;
								dealYet = false;

								//zero out the bet
								bet = 0;

								//display bet message
								$betMessage.text('Your bet: ' + bet);

								//display funds balance
								$('#bank').text("Funds: " + this.balance);
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
//   set event listeners
//+++++++++++++++++++++++++


//set onclick for id "one"
$('#one').click(function () {
	//increase bet by one
	bet++;
	funds.betReduce(1);
	//display bet
	$betMessage.text('Your bet: $' + bet);
});

//pointer on hover
$('#one').css( 'cursor', 'pointer' )

//set onclick for id "five"
$('#five').click(function () {
	//increase bet by five
	bet += 5;
	funds.betReduce(5);
	//display bet
	$betMessage.text('Your bet: ' + bet);
});

//pointer on hover
$('#five').css( 'cursor', 'pointer' );

//set onclick for id "twentyfive"
$('#twentyfive').click(function () {
	//increase bet by 25
	bet += 25;
	funds.betReduce(25);
	//display bet
	$betMessage.text('Your bet: ' + bet);
});

//pointer on hover
$('#twentyfive').css( 'cursor', 'pointer' );

//set onclick for id "onehundred"
$('#onehundred').click(function () {
	//increase bet by 100
	bet += 100;
	funds.betReduce(100);
	//display bet
	$betMessage.text('Your bet: ' + bet);
});

//pointer on hover
$('#onehundred').css( 'cursor', 'pointer' );

$('#fivehundred').click(function () {
	//increase bet by 500
	bet += 500;
	funds.betReduce(500);
		//display bet
		$betMessage.text('Your bet: ' + bet);
});

//pointer on hover
$('#fivehundred').css( 'cursor', 'pointer' );


//set onclick for deal
$('#deal').click(function () {
	console.log("Deal!");
	deal();
})

//pointer on hover
$('#deal').css( 'cursor', 'pointer' );

//set onclick for hit
$('#hit').click(function () {
	hit();
})

//pointer on hover
$('#hit').css( 'cursor', 'pointer' );

// //set onclick for stand
// $('#stand').click(function () {
// 	stand(playerHandValue);
// })



//++++++++++++++++++
//   Shuffle Deck 
//++++++++++++++++++
buildDeck();
shuffle(deck);

//+++++++++++++++++++
//   deal function
//+++++++++++++++++++

var deal = function () {

	//if bet yet is false, no deal
	if (betYet === true) {

		//clear hands
		dealerHand = [];
		playerHand = [];

		//clear display
		$('#dealerhand').empty();
		$('#playerhand').empty(); 

		//clear messages
		$('#dealerhandmessage').empty();
		$('#playerhandmessage').empty();
		$('#gamemessage').empty();

		//deal yet is true
		dealYet = true;


		//if there are less than 10 cards remaining, shuffle deck
		if (deck.length < 10) {
			//announce shuffling
			console.log("SHUFFLING!")
			//build a new deck
			buildDeck();
			//shuffle
			shuffle(deck);
		}

		// Pop a card off the deck. Put in in the dealer's hand. Twice
		for (var i = 0; i < 2; i++) {
			var currentCard = deck.pop();
			dealerHand.push(currentCard);	
		}

		renderDealerHand();

		//grab the second child of dealer hand and set it to back
		$('#dealerhand i:nth-child(2)').attr("id","back");

		// //display first card face up
		// //Get the id of the first card in the dealer's hand
		// //put <i> tags in dealerhand
		// $('#dealerhand').html('<i></i>');

		// //give id = dealerHand[0].id to <i> tags
		// $('#dealerhand i:first-child').attr("id", dealerHand[0].id);

		// //display dealer's second card face down
		// $('#dealerhand').append('<i id="back"></i>');

		//evaluate hand
		var dealerHandValue = calcDealerHandValue();
			// $('#dealerhandmessage').text("dealer shows " + dealerHand[0].value);

		
		//show dealer's first card
		console.log("Dealer shows " + dealerHand[0].value)


		//if dealer hand equals 21, call blackjack function
		if (dealerHandValue === 21) {

			console.log("Dealer Blackjack!");

			$('#gamemessage').text("dealer blackjace");

			//render the dealer's hand	
			renderDealerHand();

			//dealer wins
			dealerWins();
		} else {
			//if dealer hand value exceeds 21, call bust function
			if (dealerHandValue > 21) {
				console.log("Dealer Bust!");
				$('#gamemessage').text("dealer busts");
				playerWins();
			} 
		}

		// Put it in the player's hand. Twice
		for (var i = 0; i < 2; i++) {
				var currentCard = deck.pop();
				playerHand.push(currentCard);	
		}

		//render player hand
		renderPlayerHand();

		// //display player's first card
		// $('#playerhand').append('<i></i>');
		// $('#playerhand i:first-child').attr("id", playerHand[0].id);

		// //display player's second card
		// $('#playerhand').append('<i></i>');
	 //  $('#playerhand i:nth-child(2)').attr("id", playerHand[1].id);

		//evaluate hand
		var playerHandValue = calcPlayerHandValue();
		
		//display player hand value
		$('#playerhandmessage').text("player has " + playerHandValue);

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
	} else {
		$('#gamemessage').text("you must bet first");

	}
}

//++++++++++++++++++
//   Hit function
//++++++++++++++++++

var hit = function () {

	//if betYet = false, send message, don't perform
	if (betYet === true && dealYet === true) {

		//Pop a card off the deck, 
		var currentCard = deck.pop();
		//Put it in the player's hand
		playerHand.push(currentCard);

		//Add up PHV 
		var playerHandValue = calcPlayerHandValue();

		//display and report PHV
		$('#playerhandmessage').text("player has " + playerHandValue);

		console.log("Player has " + playerHandValue);

		//render player's hand
		renderPlayerHand();

		//display additional card
		// $tagAppended = $('<i></i>');
		// $tagAppended.attr("id", playerHand[playerHand.length - 1].id);
		// $('#playerhand').append($tagAppended);
	  //$('#playerhand i:nth-child(3)').attr("id", playerHand[2].id);

		//Test for 21
		if (playerHandValue === 21) {
			console.log("Player hits 21!");
			$('#playerhandmessage').text("player has 21!");
			stand(21);
		}

		//Test for bust
		if (playerHandValue > 21) {
			console.log("Player busts!");
			$('#playerhandmessage').text("player busts");
			dealerWins();
		}
		//set onclick for stand and pass player hand value as argument
		$('#stand').click(function () {
			stand(playerHandValue);
		})

		//pointer on hover
	$('#stand').css( 'cursor', 'pointer' );
	} else {
		$('#gamemessage').text("you have not placed a bet");
	}
}
//+++++++++++++++++++
//   Stand function
//+++++++++++++++++++

var stand = function (playerHandValue) {

	//count up dealer hand value
	var dealerHandValue = calcDealerHandValue();

	// //loop over dealers hand values
	// //this gets called twice


	// for (var i = 0; i < dealerHand.length; i++) {
	// 	//add to dealer hand value
	// 	dealerHandValue += dealerHand[i].value;
	// }

	//get rid of back
	//$('#dealerhand i:nth-child(2)').detach();

	//show face down card
	// $tagAppended = $('<i></i>');
	// $tagAppended.attr("id", dealerHand[dealerHand.length - 1].id);
	// $('#dealerhand').append($tagAppended);

	//render dealer hand
	renderDealerHand();

	//Report dealer hand value
	$('#dealerhandmessage').text("dealer has " + dealerHandValue);
	console.log("Dealer has: " + dealerHandValue);

	//If the total is 17, reduce by number of aces
	if (dealerHandValue === 17) {
		dealerHandValue = aceReduce(dealerHandValue);
	}

	//if less than 17, hit and repeat until 17 or more
	while (dealerHandValue < 17) {
		
		//pop a card off the stack
		var currentCard = deck.pop();

		//Put it in the dealer's hand
		dealerHand.push(currentCard);

		//display the new card
		renderDealerHand();

		//calculate new DHV
		dealerHandValue = calcDealerHandValue();

		if (dealerHandValue === 17) {
			dealerHandValue = aceReduce(dealerHandValue);
		}

		//report new dealer hand value
		console.log("Dealer has " + dealerHandValue)
		$('#dealerhandmessage').text("dealer has " + dealerHandValue);

	}

	//if the total is 17, reduce aces one by one

	if (dealerHandValue > 21) {
			console.log("Dealer busts");
			$('#dealerhandmessage').text("dealer busts");

			//do I need this?
			// dealerHandValue = 0;
			playerWins();
		} else {

		//check to see who wins
		checkWhoWins();
	}
}
//+++++++++++++++++++++++++++++
//   Check who wins function
//+++++++++++++++++++++++++++++

var checkWhoWins = function (){

	//add up player hand value
	var playerHandValue = calcPlayerHandValue();
	//add up dealer hand value
	var dealerHandValue = calcDealerHandValue();
	if (playerHandValue > dealerHandValue) {
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

//++++++++++++++++++++++++
//   render player hand
//++++++++++++++++++++++++

//I know these can be abstracted into a single function

var renderPlayerHand = function() {
	//clear existing
	$('#playerhand').empty()	
	//loop over hand
	for (var i = 0; i < playerHand.length; i++) {
		$tagAppended = $('<i></i>');
		$tagAppended.attr("id", playerHand[i].id);
		$('#playerhand').append($tagAppended);
	}
}

//++++++++++++++++++++++++
//   render dealer hand
//++++++++++++++++++++++++

//I know these can be abstracted into a single function

var renderDealerHand = function() {
	//clear existing
	$('#dealerhand').empty()	
	//loop over hand
	for (var i = 0; i < dealerHand.length; i++) {
		$tagAppended = $('<i></i>');
		$tagAppended.attr("id", dealerHand[i].id);
		$('#dealerhand').append($tagAppended);
	}
}

//++++++++++++++++++++++++
//   calculate hand value
//++++++++++++++++++++++++

//I know these can be abstracted into a single function

var calcDealerHandValue = function() {
	//make counter for sub total of value
	var subTotal = 0;
	//make counter for number of aces in hand
	var aceTotal = 0;
	//loop over cards in hand
	for (var i = 0; i < dealerHand.length; i++) {
		//if we find an ace,
		if (dealerHand[i].face === "ace") {
			//increment ace total
			aceTotal++
		};
		//sum up value
		subTotal += dealerHand[i].value
	}

	//if subtotal exceeds 21 and there are aces in the hand
	while ((subTotal > 21) && (aceTotal > 0)) {
			subTotal -= 10;
			aceTotal --;
		}
	return subTotal;
}

var calcPlayerHandValue = function() {
	//make counter for sub total of value
	var subTotal = 0;
	//make counter for number of aces in hand
	var aceTotal = 0;
	//loop over cards in hand
	for (var i = 0; i < playerHand.length; i++) {
		//if we find an ace,
		if (playerHand[i].face === "ace") {
			//increment ace total
			aceTotal++
		};
		//sum up value
		subTotal += playerHand[i].value
	}

	//if subtotal exceeds 21 and there are aces in the hand
	while ((subTotal > 21) && (aceTotal > 0)) {
			subTotal -= 10;
			aceTotal --;
		}
	return subTotal;
}

//+++++++++++++++++++++++++++++++++++++++
//   ace reduce function for soft 17
//+++++++++++++++++++++++++++++++++++++++

var aceReduce = function(dealerHandValue) {
	//declare variable to count number of aces
	var aceTotal = 0;
	//add up aces in dealer's hand
	for (var i = 0; i < dealerHand.length; i++) {
		//if we find an ace,
		if (dealerHand[i].face === "ace") {
			//increment ace total
			aceTotal++
		};
	dealerHandValue = dealerHandValue - (10 * aceTotal);
	}
}







