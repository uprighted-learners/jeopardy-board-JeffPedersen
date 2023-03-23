class jeopardyGame {
    constructor(element, options={}) {

        this.useCategoryIds = [ 22, 89, 59, 76, 51, 2]; 
        this.categories = [];
        this.clues = {};
        this.currentClue = null;
        this.score = 0;
        this.board = element.querySelector(".board");
        this.scoreCountElement = element.querySelector(".score-count");
        this.formElement = element.querySelector("form");
        this.inputElement = element.querySelector("input[name=user-answer]");
        this.modalElement = element.querySelector(".card-modal");
        this.clueTextElement = element.querySelector(".clue-text");
        this.resultElement = element.querySelector(".result");
        this.resultTextElement = element.querySelector(".result_correct-answer-text");
        this.successTextElement = element.querySelector(".result_success");
        this.failTextElement = element.querySelector(".result_fail");
    }

    startGame() {
        this.board.addEventListener("click", event => {
            if (event.target.dataset.clueId) { // if what we click has a clueid click it
                this.clickTile(event); // click
            }
        });
        this.formElement.addEventListener("submit", event => {
            this.handleFormSubmit(event); // calls handleFormSubmit when submit is clicked
        });

        this.updateScore(0);
        this.fetchCategories();
    }

    fetchCategories() {      
        const categories = this.useCategoryIds.map(category_id => {
            return new Promise((resolve, reject) => {
                fetch(`https://jservice.io/api/category?id=${category_id}`)
                .then(response => response.json()).then(data => {
                    resolve(data);
                });
            });
        });

        Promise.all(categories).then(results => {
            results.forEach((result, categoryIndex) => {

                var category = {
                title: result.title,
                clues: []
                }

                var clues = shuffle(result.clues).splice(0,5).forEach((clue, index) => {
                console.log(clue)
                
                var clueId = categoryIndex + "-" + index;
                category.clues.push(clueId);
                
                this.clues[clueId] = {
                    question: clue.question,
                    answer: clue.answer,
                    value: (index + 1) * 100
                };
                })

                this.categories.push(category);
            });
            console.log(this);

            this.categories.forEach((c) => {
                this.makeTheCategory(c);
            });
        });
    }

    makeTheCategory(category) {      
        let column = document.createElement("div");
        column.classList.add("column");
        column.innerHTML = (
            `<header>${category.title}</header><ul></ul>`
        ).trim();

        var ul = column.querySelector("ul");
        category.clues.forEach(clueId => {
            var clue = this.clues[clueId];
            ul.innerHTML += `<li><button data-clue-id=${clueId}>${clue.value}</button></li>`
        })

        this.board.appendChild(column);
    }

    updateScore(change) {
        this.score += change;
        this.scoreCountElement.textContent = this.score;
    }

    clickTile(event) {
        var clue = this.clues[event.target.dataset.clueId];

        event.target.classList.add("done");
    
        this.inputElement.value = "";
        this.currentClue = clue; // update current clue
        this.clueTextElement.textContent = this.currentClue.question; // pulls data
        this.resultTextElement.textContent = this.currentClue.answer;
        this.modalElement.classList.remove("showing-result"); // hide
        this.modalElement.classList.add("visible"); // show modal
        this.inputElement.focus(); // go to text box
    }

    //Handle an answer from user
    handleFormSubmit(event) {
        event.preventDefault();
    
        var isCorrect = this.inputElement.value === this.currentClue.answer;
        if (isCorrect) {
            this.updateScore(this.currentClue.value);
        }
    
       //Show answer
        this.revealAnswer(isCorrect);
    }

    revealAnswer(isCorrect) {

       //Show the individual success/fail case
        this.successTextElement.style.display = isCorrect ? "block" : "none";
        this.failTextElement.style.display = !isCorrect ? "block" : "none";
    
       //Show the whole result container
        this.modalElement.classList.add("showing-result");
    
        setTimeout(() => { // timeout 2.5s
            this.modalElement.classList.remove("visible");
        }, 2500);
    }
    
}

/**https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  * Shuffles array in place.
  * @param {Array} a items An array containing the items.
  */
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
         j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
}

    const game = new jeopardyGame( document.querySelector(".app"), {});
    game.startGame();






























