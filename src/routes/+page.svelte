<script lang="ts">
  import WordList from '$lib/components/WordList.svelte'
  import GameBoard from '$lib/components/GameBoard.svelte'

  let centerLetter = 'a'
  let surroundingLetters = ['c', 'r', 't', 'h', 'e', 's']
  let wordsFound: string[] = []
  let wordDropdownOpen = false
</script>

<h1
  class="text-gray-100 font-bold tracking-wider text-4xl h-fit left-1/2 -translate-x-1/2 mt-12 absolute whitespace-nowrap drop-shadow-md"
>
  Word Hive
</h1>

<GameBoard bind:centerLetter bind:surroundingLetters bind:wordsFound />
<WordList bind:wordDropdownOpen bind:wordsFound />
