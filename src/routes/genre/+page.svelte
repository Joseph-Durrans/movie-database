<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from '../$types';

    export let form: ActionData;
</script>

<form action="?/createGenre" method="post" class="w-1/2" use:enhance>
    <input type="text" name="name" placeholder="name" autocomplete="given-name" />
    <input type="submit" value="Create" />
</form>


{#if form?.success} 
    <p>Genre created!</p>
{/if}