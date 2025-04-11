<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { supabase } from '$lib/supabase';

	export const user = writable(null);
	export const session = writable(null);
	export const isLoading = writable(true);

	onMount(async () => {
		const { data } = await supabase.auth.getSession();
		session.set(data.session);
		user.set(data.session?.user ?? null);
		isLoading.set(false);

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			session.set(_session);
			user.set(_session?.user ?? null);

			console.log('Authentication state changed:', event, _session?.user?.email);
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<slot />
