<script lang="ts">
  import Caret from '$lib/components/Caret.svelte'
  import cs from 'clsx'

  export let wordDropdownOpen: boolean
  export let wordsFound: string[]

  let sortedWords: string[]

  $: {
    sortedWords = Array.from(wordsFound)
    sortedWords.sort()
  }
</script>

<div
  class={cs(
    'py-2 px-4 absolute bg-white/[.75] sm:bg-white/[.03] sm:h-70% sm:h-1/2 mt-10 top-17% sm:top-1/2 translate-y-0 sm:-translate-y-1/2 sm:border sm:border-gray-400 sm:w-45% sm:right-4 sm:left-auto left-16 right-16 overflow-y-hidden overflow-x-scroll sm:overflow-x-auto rounded sm:text-white text-sm tracking-wide transition-[height]',
    {
      'h-14': !wordDropdownOpen,
      'h-136': wordDropdownOpen
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
    <Caret bind:open={wordDropdownOpen} />
  </div>
  <div class="h-120">
    <p class={cs('sm:block w-full mb-2 whitespace-nowrap', !wordDropdownOpen && 'hidden')}>
      You have found {wordsFound.length} word{wordsFound.length === 1 ? '' : 's'}
    </p>
    <div class="sm:hidden absolute top-0 w-full -ml-4 rounded z-[-1] h-full backdrop-blur-xs" />
    <div
      class={cs('sm:inline-flex h-95% flex-col flex-wrap', {
        'inline-flex': wordDropdownOpen,
        'hidden sm:inline-flex': !wordDropdownOpen
      })}
    >
      {#each sortedWords as word}
        <span class="capitalize pr-8">{word}</span>
      {/each}
    </div>
  </div>
</div>
