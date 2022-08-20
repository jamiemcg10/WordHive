<script lang="ts">
  import ShuffleBtn from '$lib/components/ShuffleBtn.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher<{
    remove: void
    shuffle: void
    submit: void
  }>()
  const sharedBtnClasses = 'font-semibold bg-white rounded-full py-3 px-3'
</script>

<div class="flex space-x-10">
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
