<script lang="ts">
  import Cell from '$lib/components/Cell.svelte'
  import ShuffleBtn from '$lib/components/ShuffleBtn.svelte'
  import { knuthShuffle } from 'knuth-shuffle'
  import { onMount } from 'svelte'
  import { tick } from 'svelte'

  const positionMap: Record<number, string> = {
    0: 'left-1/2 top-1/2  translate-x-1/4',
    1: 'left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2',
    2: 'right-1/2 top-1/2 -translate-x-1/4',
    3: 'right-1/2 bottom-1/2 -translate-x-1/4',
    4: 'left-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2',
    5: 'left-1/2 bottom-1/2 translate-x-1/4'
  }

  const shuffleLetters = () => {
    surroundingLetters = knuthShuffle(surroundingLetters)
  }

  const validateSubmission = () => {
    // check duplicate
    // check length
    // make sure center letter in word
    // see if word
    wordsFound = [...wordsFound, word.join('')] // alphabetize list
    clearWord()
  }

  const addLetter = async (l: string) => {
    word = [...word, l]
    wordDisplay += l === centerLetter ? centerLetterHTML : l

    await tick()
    moveCursorToEnd()
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

  let inputEl: HTMLElement
  let centerLetter = 'a'
  let surroundingLetters = ['c', 'r', 't', 'h', 'e', 's']
  const centerLetterHTML = `<span class="text-yellow-400">${centerLetter}</span>`
  let word: string[] = []
  let wordDisplay = ''
  let wordsFound: string[] = []

  onMount(() => {
    inputEl.focus()
  })
</script>

<svelte:body
  on:keyup={(e) => {
    const { key } = e
    // edit this to work with Macs
    if (surroundingLetters.includes(key) || key === centerLetter) {
      addLetter(key)
    } else if (key === 'Backspace') {
      removeLetter()
    } else if (key === 'Enter') {
      e.preventDefault()
      validateSubmission()
    }
  }} />

<h1 class="text-white font-bold text-4xl h-fit left-1/2 -translate-x-1/2 mt-12 absolute">
  Word Hive
</h1>
<div class="inline-flex flex-col w-1/2 justify-center items-center relative h-screen">
  <div
    on:keydown|preventDefault={() => {}}
    on:keyup|preventDefault={() => {}}
    on:blur={() => {
      moveCursorToEnd()
    }}
    class="relative h-[32px] text-white top-0 translate-y-full font-semibold text-2xl uppercase focus:outline-none"
    contenteditable="true"
    bind:this={inputEl}
    bind:innerHTML={wordDisplay}
  />
  <hive class="relative h-[50%] w-[50%]">
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
  <div class="flex space-x-10">
    <button
      class="font-semibold bg-white rounded-full py-[12px] px-[12px]"
      on:click={() => {
        removeLetter()
      }}>Delete</button
    >
    <ShuffleBtn on:click={shuffleLetters} />
    <button
      class="font-semibold bg-white rounded-full py-[12px] px-[12px]"
      on:click={validateSubmission}>Enter</button
    >
  </div>
</div>
<div
  class="p-2 absolute bg-white/[.03] h-[50%] mt-10 top-1/2 -translate-y-1/2 border border-gray-400 w-[45%] right-4 rounded text-white text-sm tracking-wide"
>
  <p class="w-full">You have found {wordsFound.length} word{wordsFound.length === 1 ? '' : 's'}</p>
  <div class="">
    {#each wordsFound as wordFound}
      <span class="capitalize">{wordFound}</span>
    {/each}
  </div>
</div>
