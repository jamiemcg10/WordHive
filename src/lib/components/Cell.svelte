<script lang="ts">
  import cs from 'clsx'

  export let letter: string
  export let position: string
  export let center = false
</script>

<div class="absolute inline-block w-[4.69em] cursor-pointer {position}" on:click>
  {#key letter}
    <p
      class="cursor-pointer font-extrabold uppercase text-2xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      {letter}
    </p>
  {/key}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61 58">
    <path
      class={cs({
        'text-yellow-400': center,
        'text-white': !center
      })}
      d="M 89.516 65.242 L 114.516 78.992 L 114.516 106.492 L 89.516 120.242 L 64.516 106.492 L 64.516 78.992 Z"
      data-bx-shape="n-gon 89.516 92.742 28.868 27.5 6 0 1@70e67742"
      style="fill: currentColor;"
      transform="matrix(0, 1, -1, 0, 123.241997, -60.515999)"
    />
  </svg>
</div>
