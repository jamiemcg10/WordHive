<script lang="ts">
  import { tick } from 'svelte'
  import ButtonBar from '$lib/components/ButtonBar.svelte'
  import Cell from '$lib/components/Cell.svelte'
  import { knuthShuffle } from 'knuth-shuffle'
  import { onMount } from 'svelte'

  export let centerLetter: string
  export let surroundingLetters: string[]
  export let wordsFound: string[]

  const centerLetterHTML = `<span class="text-yellow-400">${centerLetter}</span>`

  const positionMap: Record<number, string> = {
    0: 'left-1/2 top-1/2  translate-x-1/4',
    1: 'left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2',
    2: 'right-1/2 top-1/2 -translate-x-1/4',
    3: 'right-1/2 bottom-1/2 -translate-x-1/4',
    4: 'left-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2',
    5: 'left-1/2 bottom-1/2 translate-x-1/4'
  }

  const addLetter = async (l: string) => {
    word = [...word, l]
    wordDisplay += l === centerLetter ? centerLetterHTML : l

    await tick()
    moveCursorToEnd()
  }

  const clearWord = () => {
    word = []
    wordDisplay = ''
    inputEl.focus()
  }

  const moveCursorToEnd = () => {
    inputEl.focus()

    const range = document.createRange()
    range.selectNodeContents(inputEl)
    range.collapse(false)

    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
  }

  const removeLetter = async () => {
    const removedLetter = word.pop()
    word = word
    if (removedLetter === centerLetter) {
      wordDisplay = wordDisplay.slice(0, -1 * centerLetterHTML.length)
    } else {
      wordDisplay = wordDisplay.slice(0, -1)
    }

    await tick()
    moveCursorToEnd()
  }

  const shuffleLetters = () => {
    surroundingLetters = knuthShuffle(surroundingLetters)
  }

  const validateSubmission = () => {
    // check duplicate
    // check length
    // make sure center letter in word
    // see if word
    wordsFound = [word.join(''), ...wordsFound] // alphabetize list
    clearWord()
  }

  let inputEl: HTMLElement
  let word: string[] = []
  let wordDisplay = ''

  onMount(() => {
    inputEl.focus()
  })
</script>

<svelte:body
  on:keyup={(e) => {
    const { key } = e
    if (surroundingLetters.includes(key) || key === centerLetter) {
      addLetter(key)
    } else if (key === 'Backspace') {
      removeLetter()
    } else if (key === 'Enter') {
      e.preventDefault()
      validateSubmission()
    }
  }} />

<div
  class="inline-flex flex-col w-full sm:w-1/2 justify-center items-center relative h-screen pt-[110px] sm:p-0"
>
  <div
    on:keydown|preventDefault={() => {}}
    on:keyup|preventDefault={() => {}}
    on:blur={() => {
      moveCursorToEnd()
    }}
    class="relative h-[32px] text-white top-0 translate-y-full font-semibold text-2xl uppercase focus:outline-none caret-yellow-400"
    contenteditable="true"
    bind:this={inputEl}
    bind:innerHTML={wordDisplay}
  />
  <hive class="relative h-50% w-50%">
    <Cell
      letter={centerLetter}
      center={true}
      position={'left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'}
      on:click={() => {
        addLetter(centerLetter)
      }}
    />
    {#each surroundingLetters as letter, i}
      <Cell
        {letter}
        position={positionMap[i]}
        on:click={() => {
          addLetter(letter)
        }}
      />
    {/each}
  </hive>

  <ButtonBar
    on:remove={() => removeLetter()}
    on:shuffle={() => shuffleLetters()}
    on:submit={() => validateSubmission()}
  />
</div>
