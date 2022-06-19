import React, { useState, useEffect } from 'react'

import cards from './resources/black_cards.txt'
import './App.css'

function App() {
    const [cardMap, setCardMap] = useState(new Map())
    const [prompt, setPrompt] = useState("Click button to start!")

    function clean(str) {
        const tagsRegex = /<[0-9A-Za-z/\\]*>/ig
        const specialCharsRegex = /&[0-9A-Za-z/\\]*;/ig
        return str.replaceAll(tagsRegex, '').replaceAll(specialCharsRegex, '')
    }

    async function initCardMap() {
        await fetch(cards)
            .then(r => r.text())
            .then(text => {
                const PROMPT_ID = 0
                const PROMPT_TEXT = 3

                var cards = new Map()
                var lines = text.split('\n')

                lines.forEach(line => {
                    var columns = line.split('\t')
                    cards.set(parseInt(columns[PROMPT_ID]), clean(columns[PROMPT_TEXT]))
                })

                setCardMap(cards)
            }
        );
    }

    function getRandomPromptFromMap(e) {
        var num

        while (!cardMap.has(num)) {
            num = Math.floor(Math.random() * cardMap.size)
        }

        setPrompt(cardMap.get(num))
    }

    useEffect(() => { initCardMap() }, []);

    return (
        <div className='main-parent'>
            <div className='card-prompt'>{prompt}</div>
            <div className='randomize-button'>
                <button onClick={getRandomPromptFromMap}>Get new card</button>
            </div>
        </div>
    );
}

export default App;
