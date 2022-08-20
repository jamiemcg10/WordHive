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
    'py-2 px-4 absolute mt-10 rounded text-sm transition-[height]',
    'bg-gray-100/[.03] top-1/2 -translate-y-1/2 h-1/2 desktop:w-45% right-4 left-auto overflow-x-auto desktop:border border-yellow-400 desktop:text-gray-100 overflow-y-hidden',
    'mobile:left-8 mobile:right-8',
    'tablet:bg-gray-100/[.90] tablet:top-17% tablet:translate-y-0 tablet:left-16 tablet:right-16 tablet:overflow-x-scroll tablet:shadow-lg',
    {
      'tablet:h-14': !wordDropdownOpen,
      'h-136 mobile:h-120': wordDropdownOpen
    }
  )}
>
  <div class="desktop:hidden flex justify-between items-center h-10 w-full">
    <div class="flex truncate items-center">
      <span class="text-lg shrink-0">Words found</span>
      <div class="block space-x-2 px-2 text-ellipsis overflow-hidden text-gray-700">
        {#each wordsFound as word}
          <span>{word}</span>
        {/each}
      </div>
    </div>
    <Caret bind:open={wordDropdownOpen} />
  </div>
  <div class="tablet:h-120 mobile:h-104">
    <p class={cs('desktop:block w-full mb-2 whitespace-nowrap', !wordDropdownOpen && 'hidden')}>
      You have found {wordsFound.length} word{wordsFound.length === 1 ? '' : 's'}
    </p>
    <div
      class="desktop:hidden absolute top-0 w-full -ml-4 rounded z-[-1] h-full backdrop-blur-xs"
    />
    <div
      class={cs('desktop:inline-flex h-95% flex-col flex-wrap tracking-wider space-y-1', {
        'inline-flex': wordDropdownOpen,
        'hidden desktop:inline-flex': !wordDropdownOpen
      })}
    >
      {#each sortedWords as word}
        <span class="capitalize pr-8">{word}</span>
      {/each}
    </div>
  </div>
</div>
