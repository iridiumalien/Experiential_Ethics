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

    if (hour == 15 && min == 30) {
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
    text: 'Scenario 4: African American Voter in Atlanta, Georgia',
    options: [{
        text: 'Continue',
        nextText: 2
    },
    ]
},

    {
        id: 2,
        text: 'You arrive at your polling center at 8am. The line wraps around the block. What would you like to do?',
        options: [{
            text: 'Get in line',
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
        text: 'You are waiting in line.',
        options: [{
            text: 'Okay',
            nextText: -1
        },
        ]
    },
    {
        id: 4,
        text: 'You have made it to the front of the line!',
        options: [{
            text: 'Continue',
            nextText: 5
        },
        ]
    },
    {
        id: 5,
        text: 'A poll worker asks for your name and address.',
        options: [{
            text: 'Respond',
            nextText: 6
        },
        ]
    },
    {
        id: 6,
        text: 'Your name was purged from the voter rolls! You need to register to vote.',
        options: [{
            text: 'Register to vote.',
            nextText: 7
        },
            {
                text: 'Give up.',
                nextText: 99
            }
        ]
    },
    {
        id: 7,
        text: 'A poll worker asks to see a government issued photo ID.',
        options: [{
            text: 'Show ID.',
            nextText: 8
        },
            {
                text: 'Give up.',
                nextText: 99
            }
        ]
    },
    {
        id: 8,
        text: 'You are now registered to vote.',
        options: [{
            text: 'Continue to next room.',
            nextText: 9
        },
            {
                text: 'Leave.',
                nextText: 99
            }
        ]
    },
    {
        id: 9,
        text: 'A poll worker asks to see a government issued photo ID.',
        options: [{
            text: 'Show ID.',
            nextText: 10
        },
            {
                text: 'Give up.',
                nextText: 99
            }
        ]
    },
    {
        id: 10,
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