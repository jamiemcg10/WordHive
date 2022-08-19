<script lang="ts">
  import Cell from '$lib/components/Cell.svelte'
  import ShuffleBtn from '$lib/components/ShuffleBtn.svelte'
  import { knuthShuffle } from 'knuth-shuffle'
  import { onMount } from 'svelte'
  import { tick } from 'svelte'
  import cs from 'clsx'

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
    wordsFound = [word.join(''), ...wordsFound] // alphabetize list
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
  let wordDropdownOpen = false
  let sortedWords: string[]

  $: {
    sortedWords = Array.from(wordsFound)
    sortedWords.sort()
  }

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
  class={cs(
    'py-2 px-4 absolute bg-white/[.75] sm:bg-white/[.03] sm:h-[70%] sm:h-1/2 mt-10 top-[17%] sm:top-1/2 translate-y-0 sm:-translate-y-1/2 sm:border sm:border-gray-400 sm:w-[45%] sm:right-4 sm:left-auto left-16 right-16 rounded sm:text-white text-sm tracking-wide transition-[height]',
    {
      'h-14': !wordDropdownOpen,
      'h-[70%]': wordDropdownOpen
    }
  )}
>
  <div class="sm:hidden flex justify-between items-center h-10 w-full">
    <div class="flex truncate items-center">
      <span class="text-lg shrink-0">Words found</span>
      <div class="block space-x-2 px-2 text-ellipsis overflow-hidden">
        {#each wordsFound as word}
          <span>{word}</span>
        {/each}
      </div>
    </div>
    <button class="shrink-0" on:click={() => (wordDropdownOpen = !wordDropdownOpen)}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        class="inline text-gray-900"
      >
        <path
          d="M5.79681 7C4.95612 7 4.49064 7.97434 5.01887 8.62834L8.83333 13.351C9.43371 14.0943 10.5668 14.0943 11.1672 13.351L14.9816 8.62834C15.5098 7.97434 15.0444 7 14.2037 7H5.79681Z"
          fill="currentColor"
        />
      </svg></button
    >
  </div>
  <div class="h-[95%]">
    <p class={cs('sm:block w-full mb-2', !wordDropdownOpen && 'hidden')}>
      You have found {wordsFound.length} word{wordsFound.length === 1 ? '' : 's'}
    </p>
    <div class="sm:hidden absolute top-0 w-full -ml-4 rounded z-[-1] h-full backdrop-blur-[2px]" />
    <div
      class={cs('sm:inline-flex h-[95%] flex-col flex-wrap gap-x-8', {
        'inline-flex': wordDropdownOpen,
        'hidden sm:inline-flex': !wordDropdownOpen
      })}
    >
      {#each sortedWords as word}
        <span class="capitalize">{word}</span>
      {/each}
    </div>
  </div>
</div>
