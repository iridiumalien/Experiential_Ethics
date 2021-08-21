const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
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
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}


const textNodes = [{
    id: 1,
    text: 'Scenario 1: White Voter in Suburban Wisconsin',
    options: [{
        text: 'Continue',
        nextText: 2
    },
    ]
},

    {
        id: 2,
        text: 'You arrive at your polling center at 8am. There is no line.',
        options: [{
            text: 'Enter the building',
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
        text: 'A poll worker asks for your name and address.',
        options: [{
            text: 'Respond',
            nextText: 4
        },
        ]
    },
    {
        id: 4,
        text: 'You are registered to vote.',
        options: [{
            text: 'Continue to next room',
            nextText: 5
        },
            {
                text: 'Leave the building.',
                nextText: 99
            }
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
            nextText: -1
        },
        ]
    },
]

startGame()