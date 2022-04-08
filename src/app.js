/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* app.js */

import Deck from './deck';
import './style.css';

const computerCardSlot = document.querySelector('.computer-card-slot');
const computerDeckElement = document.querySelector('.computer-deck');
const text = document.querySelector('.text');

const newGame = document.querySelector('.new-game');
const clubs = document.querySelector('.clubs');
const diamonds = document.querySelector('.diamonds');
const hearts = document.querySelector('.hearts');
const spades = document.querySelector('.spades');

let computerDeck;
let inRound;
let playerScore = 0;

function isRoundWinner(suit, card) {
    return suit === card.suit;
}

function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards;
}

function cleanBeforeRound() {
    inRound = false;
    computerCardSlot.innerHTML = '';
    text.innerText = '';
    updateDeckCount();
}

function startGame() {
    playerScore = 0;
    computerDeck = new Deck();
    computerDeck.shuffle();
    inRound = false;
    cleanBeforeRound();
    console.log(`start game ${computerDeck.cards[0].suit}`);
}

function flipCards(suit) {
    inRound = true;
    const computerCard = computerDeck.pop();
    computerCardSlot.appendChild(computerCard.getHTML());
    console.log(`checking suit ${suit} with computer ${computerCard.card}`);
    const winner = isRoundWinner(suit, computerCard);
    if (winner) {
        playerScore += 4;
        text.innerText = `You win! Score: ${playerScore}`;
    } else {
        playerScore -= 1;
        text.innerText = `You lose! Score: ${playerScore}`;
    }
    updateDeckCount();
    if (computerDeck.numberOfCards === 0) {
        startGame();
    }
    console.log(computerDeck.cards[0].suit);
}

newGame.addEventListener('click', startGame);

// const SUITS = ['♠', '♣', '♥', '♦'];

function selectSuit(suit) {
    console.log(`${suit} clicked`);
    computerCardSlot.innerHTML = '';
    flipCards(suit);
}

diamonds.addEventListener('click', () => {
    selectSuit('♦');
});

clubs.addEventListener('click', () => {
    selectSuit('♣');
});

hearts.addEventListener('click', () => {
    selectSuit('♥');
});

spades.addEventListener('click', () => {
    selectSuit('♠');
});

startGame();