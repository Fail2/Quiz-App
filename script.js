const MyQuiz = document.querySelector('.MyQuizApp');
const MyBtn = document.querySelector('.MyBtn button');
const RulesBox = document.querySelector('.RulesBox');
const Questions = document.querySelector('.Questions');
const option_list = document.querySelector('.MyOptions');
const exitButton = document.querySelector('.Buttons .Exit');
const continueButton = document.querySelector('.Buttons .Continue');


const timeCount = document.querySelector('.TimeCount .Seconds');
const timeLine = document.querySelector('.time_lines');

MyBtn.onclick = () => {
    //alert('clicked');
    MyQuiz.style.opacity = 0;
    RulesBox.classList.add('activeInfo');
}

exitButton.onclick = () => {
    //alert('clicked');
    MyQuiz.style.opacity = 1;
    RulesBox.classList.remove('activeInfo');
}

continueButton.onclick = () => {
    //alert('clicked');
    RulesBox.classList.remove('activeInfo');
    Questions.classList.add('activeQuiz');
    //console.log(questions[0].question);
    showQuestions(0);
    startTimer(15);
    startTimerLine(0);
}

const nextButton = document.querySelector('.nextBtn');
const resultBox = document.querySelector('.resultBox');
const restartButton = resultBox.querySelector('.buttons .restart');
const quitButton = resultBox.querySelector('.buttons .quit');


let que_count = 0;

let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;



nextButton.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        showQuestions(que_count);
        clearInterval(counter);
        startTimer(timeValue);

        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextButton.style.display = "none";
    } else {
        showResultBox();
        console.log("Questions Completed");
    }
}

function showQuestions(index) {
    //console.log("showQuestions");

    const que_text = document.querySelector('.text1');

    const total_que = document.querySelector('.total_que p');
    total_que.innerHTML = `${questions[index].num} of ${questions.length} Questions`;
    //console.log(total_que);
    option_list.innerHTML = '';
    que_text.innerHTML = '';
    //console.log(questions[index].options);
    for (let i of questions[index].options) {
        let option_tag = `<div class="option">
                    <span>${i}</span>
                </div>`
        option_list.innerHTML += option_tag;
    }
    //console.log(questions[0].question);
    let que_tag = `<span>  ${questions[index].num}. ${questions[index].question}  </span>`;
    //console.log(que_tag); 
    que_text.innerHTML += que_tag;


    const option = option_list.querySelectorAll('.option');

    for (let i = 0; i < option.length; i++) {
        //console.log(option[i]);
        option[i].addEventListener("click", function() {
            optionSelected(this);
        });
    }

    let thik = `<i class="fa-solid fa-circle-check"></i>`;
    let cross = `<i class="fa-solid fa-circle-xmark"></i>`;


    function optionSelected(answer) {

        clearInterval(counter);
        clearInterval(counterLine);
        let userAns = answer.textContent.trim();
        let correctAns = questions[index].answer.trim();
        console.log(userAns);
        console.log(correctAns);
        if (userAns == correctAns) {
            userScore += 1;
            console.log(userScore);
            answer.classList.add('correct');
            answer.insertAdjacentHTML('beforeend', thik);
            //console.log("Correct Answer");
        } else {
            answer.classList.add('incorrect');
            answer.insertAdjacentHTML('beforeend', cross);
            //console.log("Wrong Answer");
            for (let i = 0; i < option.length; i++) {
                if (option[i].textContent.trim() == correctAns) {
                    option[i].insertAdjacentHTML('beforeend', thik);
                    option[i].classList.add('correct');
                }
            }
        }
        // for (let i = 0; i < option.length; i++) {
        //     option[i].classList.add('disabled');
        // }

        ///this is another way to disable options but best way is below beacuse we have to use children property
        // this will disable all the options once user selects an option (even if it's correct/wrong)
        let all_options = option_list.children.length;
        for (let i = 0; i < all_options; i++) {
            option_list.children[i].classList.add('disabled');
        }
        nextButton.style.display = "block";
    }



}

restartButton.onclick = () => {
    //MyQuiz.style.display =1;
    resultBox.classList.remove('activeResult');
    Questions.classList.add('activeQuiz');
    que_count = 0;
    userScore = 0;
    showQuestions(que_count);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    //nextButton.style.display = "none";
}
quitButton.onclick = () => {
    window.location.reload();
};


function showResultBox() {
    RulesBox.classList.remove('activeInfo');
    Questions.classList.remove('activeQuiz');
    resultBox.classList.add('activeResult');
    let scoreText = resultBox.querySelector('.score_text');
    let text;
    if (userScore > 3) text = "Congo 🔥";
    else if (userScore > 1) text = "Nice 👍";
    else text = "Porasuna kor 😐";
    scoreText.innerHTML = `<span>${text} You Got <p>${userScore}</p> out of <p>${questions.length}</p> </span>`;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 10) {
            timeCount.textContent = "0" + time;
        }
        if (time < 0) {
            timeCount.textContent = "00";
            nextButton.style.display = "block";
            clearInterval(counter);
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 47);

    function timer() {
        time += 1;
        timeLine.style.width = time + 'px';
        //// 15*1000/320=47.5
        if (time > 319) {
            clearInterval(counterLine);
        }
    }
}