<script lang="ts">
	import TwitterCard from '../components/twitter-card/index.svelte';

	const statuses = ['backlog', 'in-progress', 'review', 'done'] as const;
	type Status = (typeof statuses)[number];
	type Tweet = {
		id: number;
		title: string;
		content: string;
		status: Status;
	};

	let tweets = $state<Tweet[]>([
		{
			id: 1,
			title: 'First Tweet',
			content: 'This is the first tweet in the backlog.',
			status: 'backlog'
		},
		{
			id: 2,
			title: 'Second Tweet',
			content: 'This is a tweet in progress.',
			status: 'in-progress'
		},
		{ id: 3, title: 'Third Tweet', content: 'This is a completed tweet.', status: 'done' },
		{ id: 4, title: 'Fourth Tweet', content: 'Another one for the backlog.', status: 'backlog' },
		{ id: 5, title: 'Fifth Tweet', content: 'Almost done with this one.', status: 'in-progress' },
		{ id: 6, title: 'Sixth Tweet', content: 'This is also in the backlog.', status: 'backlog' },
		{ id: 7, title: 'Seventh Tweet', content: 'In progress now.', status: 'in-progress' },
		{ id: 8, title: 'Eighth Tweet', content: 'Finished this task.', status: 'done' },
		{ id: 9, title: 'Ninth Tweet', content: 'Backlog item.', status: 'backlog' },
		{ id: 10, title: 'Tenth Tweet', content: 'Working on it.', status: 'in-progress' }
	]);

	let searchTerm = $state('');
	let draggedTweet: Tweet | null = $state(null);

	const filteredTweets = $derived(
		searchTerm
			? tweets.filter(
					(tweet) =>
						tweet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
						tweet.content.toLowerCase().includes(searchTerm.toLowerCase())
				)
			: tweets
	);

	const tweetsByStatus = $derived(
		filteredTweets.reduce(
			(acc, tweet) => {
				acc[tweet.status].push(tweet);
				return acc;
			},
			statuses.reduce(
				(acc, status) => {
					acc[status] = [];
					return acc;
				},
				{} as Record<Status, Tweet[]>
			)
		)
	);

	function handleDragStart(tweet: Tweet) {
		draggedTweet = tweet;
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function handleDrop(newStatus: Status) {
		if (draggedTweet) {
			const index = tweets.findIndex((t) => t.id === draggedTweet?.id);
			if (index !== -1) {
				tweets[index].status = newStatus;
			}
		}
	}
</script>

<main>
	<h1>Tweet Kanban Board</h1>
	<div class="search-container">
		<input type="text" bind:value={searchTerm} placeholder="Search tweets..." />
	</div>
	<div class="kanban-board">
		{#each statuses as status}
			<div class="column" role="list" aria-label={status} ondragover={handleDragOver} ondrop={() => handleDrop(status)} tabindex="-1">
				<h2>
					{status
						.split('-')
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' ')}
				</h2>
				<div class="cards">
					{#each tweetsByStatus[status] as tweet (tweet.id)}
						<div role="listitem" tabindex="-1" draggable="true" ondragstart={() => handleDragStart(tweet)}>
							<TwitterCard title={tweet.title} content={tweet.content} />
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		padding: 1rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
	}

	.search-container {
		margin-bottom: 2rem;
		text-align: center;
	}

	input {
		width: 50%;
		padding: 0.5rem;
		font-size: 1rem;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	.kanban-board {
		display: flex;
		gap: 1rem;
	}

	.column {
		flex: 1;
		background-color: #f4f4f4;
		border-radius: 5px;
		padding: 1rem;
	}

	h2 {
		text-align: center;
		margin-bottom: 1rem;
	}

	.cards {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
