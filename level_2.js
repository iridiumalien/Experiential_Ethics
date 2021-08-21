const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

let hour = 8;
let min = 0;
let time = new Text();

function refreshData()
{
    let x = 5;  // 5 Seconds


    // Do your thing here
    if (min != 50) {
        min = min + 10;
        time = (hour + ':' + min);
    } else {
        hour = hour + 1;
        min = 0
        time(hour + ':00');
    }
    document.getElementById("demo").innerHTML = time;

    if (hour == 13 && min == 30) {
        showTextNode(4)
    }

    setTimeout(refreshData, x*1000);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {

    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return refreshData(); // execute function
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}


const textNodes = [{
    id: 1,
    text: 'Scenario 2: Native American Voter in Arizona',
    options: [{
        text: 'Continue',
        nextText: 2
    },
    ]
},

    {
        id: 2,
        text: 'There are no polling sites on your reservation. The nearest polling location is over 5 hours away. What would you like to do?',
        options: [{
            text: 'Travel to polling location.',
            nextText: 3
        },
            {
                text: 'Give up',
                nextText: 99
            }
        ]
    },
    {
        id: 3,
        text: 'You are en route.',
        options: [{
            text: 'Okay',
            nextText: -1
        },
        ]
    },
    {
        id: 4,
        text: 'You have arrived!',
        options: [{
            text: 'Continue',
            nextText: 5
        },
        ]
    },
    {
        id: 5,
        text: 'A poll worker asks to see a government issued photo ID.',
        options: [{
            text: 'Show ID.',
            nextText: 6
        },
            {
                text: 'Give up.',
                nextText: 99
            }
        ]
    },

    {
        id: 6,
        text: 'You receive a ballot. You have successfully voted.',
        options: [
        ]
    },
    {
        id: 99,
        text: 'You did not vote in this election.',
        options: [{
            text: 'Restart',
            nextText: 1
        },
        ]
    },
]

startGame()