<script lang="ts">
  import ShuffleBtn from '$lib/components/ShuffleBtn.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher<{
    remove: void
    shuffle: void
    submit: void
  }>()
  const sharedBtnClasses =
    'font-semibold bg-gray-100 rounded-full tracking-wider py-3 px-3 drop-shadow-md'
</script>

<div class="flex xs:space-x-10 space-x-6">
  <button
    class={sharedBtnClasses}
    on:click={() => {
      dispatch('remove')
    }}
    >Delete
  </button>
  <ShuffleBtn
    on:click={() => {
      dispatch('shuffle')
    }}
  />
  <button class={sharedBtnClasses} on:click={() => dispatch('submit')}>Enter </button>
</div>
