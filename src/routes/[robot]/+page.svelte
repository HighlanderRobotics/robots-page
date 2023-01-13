<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
    import loadingGear from '$lib/loading-gear.svg';

	// @ts-ignore
	import * as ScrollMagic from 'scrollmagic-with-ssr';
	import { fade } from 'svelte/transition';

	export let data: PageData;
	let { robotData } = data;

	const getFramePath = (index: number): string =>
		`/assets/robots/${data.robotPath}/animation/${index.toString().padStart(4, '0')}.png`;

	let scrollPosition = 0;

	let images: HTMLImageElement[] = [];
	let finishedLoading = false;
	let triggerLoadedAnimation = false;
    let loadingTakingLong = false;

	let canvas: HTMLCanvasElement;

	let onScroll = () => {};
	let scrollHeight: number;
	let robotJourney: HTMLElement;
	let currentFrame = 0;

	onMount(() => {
		// Load images
		(async () => {
			setTimeout(() => loadingTakingLong = true, 1000)

			for (let i = 1; i < robotData.animationFrameCount; i++) {
                const img = new Image();
                img.src = getFramePath(i);
				img.onload = (e) => {
					console.log(
						Math.round((images.length / robotData.animationFrameCount) * 100) + '% loaded'
					);
					console.log(images.length, robotData.animationFrameCount);
					
					images[i] = img;

					if (images.length === robotData.animationFrameCount) onFinishedLoading();
				}
			}
		})();
	});

	function onFinishedLoading() {
		console.log('Finished loading');

		updateImage(0);
		const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

		onScroll = () => {
			const scrollTop = window.scrollY;
			const maxScrollTop =
				robotJourney.getBoundingClientRect().bottom + scrollTop - window.innerHeight;
			const scrollFraction = scrollTop / maxScrollTop;
			const frameIndex = Math.min(
				robotData.animationFrameCount - 1,
				Math.floor(scrollFraction * robotData.animationFrameCount)
			);

			requestAnimationFrame(() => updateImage(frameIndex + 1));

			currentFrame = frameIndex;
		};

		function updateImage(index: number) {
			if (!images[index]) return;

			canvas.width = images[index].width;
			canvas.height = images[index].height;

			context.clearRect(0, 0, canvas.width, canvas.height);
			context.drawImage(images[index], 0, 0);

			console.log(context);
		}

		setTimeout(() => {
			updateImage(1);
			finishedLoading = true;

			setTimeout(() => (triggerLoadedAnimation = true), 300);

			// ScrollMagic
			const controller = new ScrollMagic.Controller();

			const endingScene = new ScrollMagic.Scene({ triggerElement: '.end', triggerHook: 1 })
				.setClassToggle('#selkie-animation', 'ended')
				.addTo(controller);
		}, 100);
	}
</script>

<svelte:head>
	<title>{robotData.name} — Highlander Robotics</title>
</svelte:head>


{#if !finishedLoading && loadingTakingLong}
    <div class="loader" transition:fade={{ duration: 300 }}>
        <div class="center">
            <img src={loadingGear} alt="loading symbol" style:transform={`rotate(${(images.length/robotData.animationFrameCount)*360}deg)`}>
            <div class="percentage">{Math.round((images.length/robotData.animationFrameCount)*100)}%</div>
        </div>
    </div>
{/if}
<div style:display={finishedLoading ? 'contents' : 'none'}>
	<div class="robot-journey" bind:this={robotJourney}>
		<section class="hero">
            <div class="titles">
                <h1
                style:font-size={`${robotData.nameScalePercent}vw`}
                class={triggerLoadedAnimation ? 'loaded' : ''}
				>
                {robotData.name}
            </h1>
        </div>
    </section>
    <canvas id="selkie-animation" class={(false ? 'ended' : '') + (triggerLoadedAnimation ? "loaded" : "")} bind:this={canvas} />
		{#each robotData.subassemblies as subassembly, i}
			<section class="subassembly" id={`subassembly-${i}`}>
				<div
					class="description position-{subassembly.position}"
					style={`--poke-into-animation-amount: ${subassembly.pokeIntoAnimationPercent || 0}vh`}
				>
					<h2>{subassembly.heading}</h2>
					<p>
						{@html subassembly.body.replace(/\*([^\*]*)\*/g, '<span class="highlight">$1</span>')}
					</p>
				</div>
			</section>
		{/each}
	</div>
	<section class="end">
		<div class="metrics">
			{#each robotData.metrics as metric}
				<div class="metric">
					<div class="upper">{metric.top || ''}</div>
					<div class="number">{metric.big || ''}</div>
					<div class="lower">{metric.bottom || ''}</div>
				</div>
			{/each}
		</div>
		<div
			class="reveal-link"
			style:background-image="url('/assets/robots/{data.robotPath}/ending-background.jpg')"
		>
			<a href={robotData.revealVideoURL} target="_blank" rel="noreferrer">Watch it in action</a>
		</div>
	</section>
</div>

<svelte:window on:scroll={onScroll} bind:scrollY={scrollHeight} />

<style global>
	:root {
		font-size: 20px;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Heebo';
	}

    .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .loader .center {
        position: relative;
    }

    .loader img {
        height: 10rem;
    }

    .loader .percentage {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.3rem;
        font-weight: bold;
        color: #350868;
    }

	h1,
	h2 {
		font-family: 'Heebo';
	}

	#selkie-animation {
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		height: 100vh;
		aspect-ratio: 1 / 1;

        opacity: 0;
	}

    #selkie-animation.loaded {
        opacity: 1;
        transform: translateX(-50%);
        transition: opacity 0.7s;
    }

	#selkie-animation.ended {
		position: absolute;
		top: unset;
		bottom: 0;
	}

	section {
		height: 100vh;
		color: #000;
	}

	.hero {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #350868;
		background-color: #fff;
		overflow: visible;
	}

	.hero .titles h1 {
		line-height: 0.9em;
		font-family: 'Russo One';
		text-transform: uppercase;
		opacity: 0;
		transform: scale(0.95);
	}

	.hero .titles h1.loaded {
        transition: 0.7s;
        transition-delay: 0.05s;
		opacity: 1;
		transform: unset;
	}

	.subassembly {
		position: relative;
	}

	.description {
		transition: opacity 0.3s;
	}

	.description.position-center {
		max-width: 800px;
		position: absolute;
		top: 4rem;
		left: 50%;
		transform: translateX(-50%);
	}

	.description.position-left {
		max-width: calc(((100vw - 100vh) / 2 - 2rem) + var(--poke-into-animation-amount));
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 2rem;
	}

	.description.position-right {
		max-width: calc(((100vw - 100vh) / 2 - 2rem) + var(--poke-into-animation-amount));
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 2rem;
	}

	.description h2 {
		font-size: 2.5rem;
	}

	.description p .highlight {
		color: #350868;
		font-weight: 700;
	}

	.description p {
		font-weight: 400;
	}

	.hero h1 {
		font-family: 'Heebo', sans-serif;
	}

	.robot-journey {
		overflow: hidden;
		position: relative;
	}

	.end {
		height: 100vh;
		background-color: #fff;
		display: flex;
		flex-direction: column;
	}

	.metrics {
		display: flex;
	}

	.metric {
		background-color: #350868;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
		width: 100%;
		padding: 3rem 1rem;
		text-align: center;
	}

	.end .metric .number {
		font-size: 4rem;
		font-family: 'Heebo';
		font-weight: 800;
	}

	.end .reveal-link {
		display: grid;
		place-items: center;
		background-size: cover;
		background-position: 10%;
		flex-grow: 1;
	}

	.end .reveal-link a {
		text-decoration: none;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.34);

		padding: 1em;

		border: 1px solid #fff;

		transition: 0.3s;
	}

	.end .reveal-link a:hover {
		text-decoration: none;
		color: #000;
		background-color: #fff;

		padding: 1em;

		border: 1px solid #fff;
	}

	@media only screen and (max-width: 700px) {
		#selkie-animation {
			height: unset;
			width: 100vw;
			top: unset;
			bottom: 0;
		}

		.description.description.position-left,
		.description.position-right,
		.description.position-center {
			position: unset;
			max-width: 100%;
			transform: unset;
			font-size: 0.7rem;
			padding: 2.5rem 1rem 1rem 1rem;
		}

		.metrics {
			flex-direction: column;
		}

		.end .reveal-link a {
			margin: 4rem;
		}
	}
</style>
