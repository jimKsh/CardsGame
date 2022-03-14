// define teams
const rounds = JSON.parse(localStorage.getItem("rounds")) || [];
const MAX_SCORE = 303;

const winnerSvg = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M19,5h-2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.55,1.92,4.63,4.39,4.94c0.63,1.5,1.98,2.63,3.61,2.96V19H7v2h10v-2h-4v-3.1 c1.63-0.33,2.98-1.46,3.61-2.96C19.08,12.63,21,10.55,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.82C5.84,10.4,5,9.3,5,8z M12,14 c-1.65,0-3-1.35-3-3V5h6v6C15,12.65,13.65,14,12,14z M19,8c0,1.3-0.84,2.4-2,2.82V7h2V8z"/></svg>`;
const medalSvg = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M17,10.43V2H7v8.43c0,0.35,0.18,0.68,0.49,0.86l4.18,2.51l-0.99,2.34l-3.41,0.29l2.59,2.24L9.07,22L12,20.23L14.93,22 l-0.78-3.33l2.59-2.24l-3.41-0.29l-0.99-2.34l4.18-2.51C16.82,11.11,17,10.79,17,10.43z M11,11.07l-2-1.2V4h2V11.07z M15,9.87 l-2,1.2V4h2V9.87z"/></g></g></svg>`

const addRound = (winner, score1, score2) => {
    rounds.push({score1, score2, winner});
    localStorage.setItem("rounds", JSON.stringify(rounds))
    displayRounds();
}

const roundFormSubmitHandler = (event) => {
    event.preventDefault();
    const winnerInput = document.querySelector(`input[name="winner"]`);
    const winner = winnerInput.checked?1:2;
    const score1 = parseInt(document.querySelector('#score1').value) || 0;
    const score2 = parseInt(document.querySelector('#score2').value) || 0;
    addRound(winner, score1, score2);
}

const deleteLastRound = () => {
    rounds.pop();
    localStorage.setItem("rounds", JSON.stringify(rounds))
    displayRounds();
}

const displayRounds = () => {
    let total1= 0;
    let total2= 0;
    let tbody = "";

    rounds.forEach((round, i) => {
        total1 += round.score1;
        total2 += round.score2;
        tbody += `<tr>
            <td class="round" $()>${i+1}</td>
            <td>${round.score1}${round.winner==1?` ${medalSvg}`:``}</td>
            <td>${total1}${total1>total2?` ${winnerSvg}`:``}</td>
            <td>${round.score2}${round.winner==2?` ${medalSvg}`:``}</td>
            <td>${total2}${total1>total2?``:` ${winnerSvg}`}</td>
            <td>${i==rounds.length-1?`<button class="btn btn-sm btn-warning" onclick="deleteLastRound()">מחק</bitton>`:``}</td>
        </tr>`;
    })

    if (total1 > MAX_SCORE && total1 > total2) {
        alert(`קבוצה 1 ניצחה!`);
    }

    if (total2 > MAX_SCORE && total2 > total1) {
        alert(`קבוצה 2 ניצחה!`);
    }

    // apply to tbody
    document.querySelector('#tbody').innerHTML = tbody;
}

const swtichScore1 = () => {
    document.querySelector('#score1').value = -(parseInt(document.querySelector('#score1').value) || 0 )
}

const swtichScore2 = () => {
    document.querySelector('#score2').value = -(parseInt(document.querySelector('#score2').value) || 0 )
}

displayRounds();