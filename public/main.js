var facesCards = ['J', 'Q', 'K'];
var ace = 'A';
var cardColors = ['clubs', 'diamonds', 'hearts', 'spades'];

function newDeck() {
    var _deck = [];
    for (var colIdx = 0; colIdx < cardColors.length; colIdx++) {
        for (var i = 2; i <= 10; i++) {
            _deck.push({color: cardColors[colIdx], value: i.toString(), intValue: i});
        }
        for (var faceIdx = 0; faceIdx < facesCards.length; faceIdx++) {
            _deck.push({color: cardColors[colIdx], value: facesCards[faceIdx], intValue:10});
        }
        _deck.push({color: cardColors[colIdx], value: ace, intValue:1});
    }
    return _deck;
}

function newShoe(numDecks) {
    var shoe = [];
    for (var i = 0; i < numDecks; i++) {
        shoe = shoe.concat(newDeck())
    }
    return shuffle(shoe);
}

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function hitPlayer() {
    
}

function hitDealer(visibleCard) {

}

function startRound() {
    hitPlayer();
    hitPlayer();
    hitDealer(true);
    hitDealer(false);
}

var shoe = newShoe(8);
var playerCards = [];
var dealerCards = [];