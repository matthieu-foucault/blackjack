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

function hit(player, cardVisible) {
    var card = shoe.pop();
    player.cards.push(card);
    addCard(document.getElementById(player.cardsDiv), card, cardVisible);
    updateScore(player);
    if (player.score == 21 && player.cards.length == 2)
        player.blackjack();
    else if (player.score > 21) {
        endRound();
        player.lose();
    }
}

function addCard(div, card, cardVisible) {
    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    if (cardVisible)
        cardDiv.classList.add(card.color + card.value);
    else
        cardDiv.classList.add('back');
    div.appendChild(cardDiv)
}

function clearCards(div) {
    div.innerHTML = '';
}

function updateScore(player) {
    var score = 0;
    var numAces = 0;
    for (var i = 0; i < player.cards.length; i++) {
        score += player.cards[i].intValue;
        if (player.cards[i].intValue == 1)
            numAces++
    }
    while(numAces > 0 && score <= 11) {
        score += 10;
        numAces--;
    }
    document.getElementById(player.scoreSpan).innerHTML = score.toString();
    player.score = score;
}

function endRound() {
    document.getElementById('btn-hit').disabled = true;
    document.getElementById('btn-stand').disabled = true;
    document.getElementById('btn-new-round').disabled = false;
}

function startRound() {
    document.getElementById('btn-new-round').disabled = true;
    document.getElementById('btn-hit').disabled = false;
    document.getElementById('btn-stand').disabled = false;
    player1.init();
    dealer.init();
    clearCards(document.getElementById(player1.cardsDiv));
    clearCards(document.getElementById(dealer.cardsDiv));
    hit(player1, true);
    hit(player1, true);

    hit(dealer, true);
    hit(dealer, false);
}

function stand() {
    endRound();
    clearCards(document.getElementById(dealer.cardsDiv));
    for (var i = 0; i < dealer.cards.length; i++) {
        addCard(document.getElementById(dealer.cardsDiv), dealer.cards[i], true);
    }
    while (dealer.score < player1.score && dealer.score < 21) {
        hit(dealer, true);
    }
    if (dealer.score > player1.score && dealer.score < 21) {
        dealer.win();
    } else if (dealer.score == player1.score) {
        dealer.draw();
    }
}

var shoe = newShoe(8);

player1 = {
    init: function () {
        this.cards = [];
        this.score = 0;
    },
    cardsDiv: 'player-cards',
    scoreSpan: 'player-score-span',
    blackjack: function () {
        alert('Blackjack!!');
        stand();
    },
    win: function () {
        alert('You win!');
    },
    draw: function () {
        alert("It's a draw");
    },
    lose: function() {
        alert('You lose!');
    }
};

dealer = {
    init: function () {
        this.cards = [];
        this.score = 0;
    },
    cardsDiv: 'dealer-cards',
    scoreSpan: 'dealer-score-span',
    showCards: function() {
        clearCards(document.getElementById(dealer.cardsDiv));
        for (var i = 0; i < dealer.cards.length; i++) {
            addCard(document.getElementById(dealer.cardsDiv), dealer.cards[i], true);
        }
    },
    blackjack: function () {
        this.showCards();
    },
    win: function () {
        player1.lose();
    },
    draw: function () {
        player1.draw();
    },
    lose: function() {
        player1.win();
    }
};

startRound();

document.getElementById('btn-hit').onclick = function() { hit(player1, true) };
document.getElementById('btn-stand').onclick = stand;
document.getElementById('btn-new-round').onclick = startRound;
