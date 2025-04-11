<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase, isSupabaseConfigured } from '$lib/supabase';
	import { Alert } from 'flowbite-svelte';

	let loading = true;
	let error = null;
	let configError = !isSupabaseConfigured;

	onMount(async () => {
		if (!isSupabaseConfigured) {
			error = 'Supabase configuration is not complete. Please check the .env file.';
			console.error(error);
			loading = false;
			return;
		}

		try {
			if (!supabase) {
				error = 'Supabase client is not initialized.';
				loading = false;
				return;
			}

			const { data, error: authError } = await supabase.auth.getSession();

			if (authError) {
				error = `Authentication error: ${authError.message}`;
				console.error('Error processing authentication callback:', authError);
				return;
			}

			if (data?.session) {
				console.log('Authentication successful:', data.session.user);

				setTimeout(() => {
					goto('/');
				}, 1000);
			} else {
				error = 'Session not found.';
			}
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error';
			error = `An error occurred during processing: ${errorMessage}`;
			console.error('Exception occurred during authentication callback processing:', err);
		} finally {
			loading = false;
		}
	});
</script>

<div class="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
	{#if configError}
		<div class="w-full max-w-md px-4">
			<Alert color="red" class="mb-8">
				<span class="font-medium">Supabase Configuration Error!</span>
				<br />
				VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY are not set in the .env file.
				<br />
				Please create a .env file based on the .env.example file and set the URL and Anon Key from your
				Supabase project.
			</Alert>
			<div class="flex justify-center">
				<button
					class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
					on:click={() => goto('/')}
				>
					Return to Login Page
				</button>
			</div>
		</div>
	{:else}
		<div class="rounded-lg bg-white p-8 shadow-lg">
			{#if loading}
				<div class="flex flex-col items-center">
					<svg
						class="text-primary-500 h-10 w-10 animate-spin"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<p class="mt-4 text-lg">Authentication processing...</p>
				</div>
			{:else if error}
				<div class="flex flex-col items-center text-red-500">
					<svg
						class="h-10 w-10"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p class="mt-4 text-lg">{error}</p>
					<button
						class="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						on:click={() => goto('/')}
					>
						Return to Login Page
					</button>
				</div>
			{:else}
				<div class="flex flex-col items-center text-green-500">
					<svg
						class="h-10 w-10"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
					<p class="mt-4 text-lg">Login successful! Redirecting shortly...</p>
				</div>
			{/if}
		</div>
	{/if}
</div>
