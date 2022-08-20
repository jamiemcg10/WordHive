<script lang="ts">
  import cs from 'clsx'
  export let open: boolean
</script>

<button class="shrink-0" on:click={() => (open = !open)}
  ><svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    class={cs('inline text-gray-800 transform-all duration-250', open && 'rotate-180')}
  >
    <path
      d="M5.79681 7C4.95612 7 4.49064 7.97434 5.01887 8.62834L8.83333 13.351C9.43371 14.0943 10.5668 14.0943 11.1672 13.351L14.9816 8.62834C15.5098 7.97434 15.0444 7 14.2037 7H5.79681Z"
      fill="currentColor"
    />
  </svg></button
>
