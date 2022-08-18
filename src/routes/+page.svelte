<script lang="ts">
  import Cell from '$lib/components/Cell.svelte'
  import ShuffleBtn from '$lib/components/ShuffleBtn.svelte'
  import { knuthShuffle } from 'knuth-shuffle'

  const positionMap: Record<number, string> = {
    0: 'left-[28%] top-[30%]',
    1: 'left-1/2 top-[20%] -translate-x-1/2',
    2: 'right-[28%] top-[30%]',
    3: 'right-[28%] bottom-[30%]',
    4: 'left-1/2 bottom-[20%] -translate-x-1/2',
    5: 'left-[28%] bottom-[30%]'
  }

  const shuffleLetters = () => {
    surroundingLetters = knuthShuffle(surroundingLetters)
  }

  const validateSubmission = () => {
    // check length
    // make sure center letter in word
    // see if word
  }

  const addLetter = (l: string) => {
    word = [...word, l]
    wordDisplay += l === centerLetter ? centerLetterHTML : l
  }

  const removeLetter = () => {
    const removedLetter = word.pop()
    word = word
    console.log(removedLetter === centerLetter)
    if (removedLetter === centerLetter) {
      wordDisplay = wordDisplay.slice(0, -1 * centerLetterHTML.length)
    } else {
      wordDisplay = wordDisplay.slice(0, -1)
    }
  }

  const clearWord = () => {
    word = []
  }

  let centerLetter = 'a'
  let surroundingLetters = ['c', 'r', 't', 'h', 'e', 's']
  const centerLetterHTML = `<span class="text-yellow-400">${centerLetter}</span>`
  let word: string[] = []
  let wordDisplay = ''

  $: console.log({ word, wordDisplay })
</script>

<div class="flex flex-col justify-center items-center relative h-screen">
  <h1 class="text-white font-bold text-4xl h-fit">Word Hive</h1>
  <user-entry
    class="relative h-[32px] text-white top-0 translate-y-full font-semibold text-2xl uppercase"
    >{@html wordDisplay}</user-entry
  >
  <hive class="relative h-[50%] w-[50%] border border-white">
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
