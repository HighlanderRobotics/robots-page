<script>

	import { robotsData } from "$lib/robotsData";
    import logo from "$lib/assets/images/logo-wide.png";

</script>

<svelte:head>
    <title>Robots — Highlander Robotics</title>
</svelte:head>

<nav>
    <a href="https://highlanderrobotics.com/">
        <div class="back-arrow-glyph material-icons">arrow_back</div>
        <div class="text">Main Site</div>
    </a>
    <div class="page-title">
        <img src={logo} alt="8033 robots" />
        <div>Robots</div>
    </div>
</nav>

<main>
    <div class="robot-list">
        {#each Object.entries(robotsData) as [key, robot]}
            <a href={robot.unfinished ? undefined : `/${key}`}>
                <div class={"robot-card " + ((robot.unfinished || false) ? "unfinished" : "") }>
                    <img src={`/assets/robots/${key}/animation/0001.png`} alt={`${robot.name} render`}>
                    <div class="text">
                        <div class="name">{robot.name}</div>
                        <div class="season">{robot.seasonName}</div>
                    </div>
                    {#if robot.unfinished}
                        <div class="unfinished-chip">Under construction</div>
                    {/if}
                </div>
            </a>
        {/each}
    </div>
</main>

<style>
    :root {
        font-size: 20px;
    }

    nav {
        background-color: #fff;
        position: fixed;
        display: flex;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;

        border-bottom: 2px solid #dbdbdb;
    }

    nav a {
        text-decoration: none;

        display: flex;
        align-items: center;
        padding: 0.5em;
        color: #350868;
        transition: color 0.3s;
    }

    nav a:hover {
        color: #000;
    }

    nav .text {
        margin-left: 0.5ch;
        font-family: 'DM Sans', sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.05ch;
        font-size: 0.9rem;
    }

    nav .back-arrow-glyph {
        transition: transform 0.3s;
    }

    nav a:hover .back-arrow-glyph {
        transform: translateX(-0.2ch);
    }

    .page-title {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Heebo', sans-serif;
        font-weight: 800;
        color: #350868;
        font-size: 1.3rem;

        display: flex;
        align-items: center;
    }

    .page-title img {
        height: 1.2em;
        margin: 0.5ch;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 2.5rem;
    }

    .robot-list {
        display: grid;
        grid-template-columns: repeat( auto-fit, 20rem );
        gap: 1rem;
        margin: 1rem;
        justify-content: center;
        width: min(130vh, 100vw)
    }

    a {
        text-decoration: none;
        color: inherit;
        transition: 0.3s;
    }

    .robot-card {
        background-color: #fff;
        border: 2px solid #dbdbdb;
        border-radius: 1rem;
        cursor: pointer;

        overflow: hidden;
        
        display: flex;
        flex-direction: column;
        width: max-content;
        
        transition: 0.3s;

        position: relative;
    }

    .robot-card img {
        width: 20rem;
        border-bottom: 2px solid #dbdbdb;
    }

    .robot-card .text {
        background-color: #fff;
        padding: 1rem;
    }

    .name {
        font-family: 'Heebo', sans-serif;
        font-size: 1.5rem;
        color: #350868;
        font-weight: 700;
    }

    .season {
        font-family: 'Open Sans', sans-serif;
    }

    .robot-card.unfinished {
        cursor: default;
    }

    .robot-card.unfinished *:not(.unfinished-chip) {
        opacity: 0.4;
    }

    .robot-card:not(.unfinished):hover {
        transform: translateY(-0.2rem);
        box-shadow: 0px 0.3rem 0.4rem -0.3rem rgba(0, 0, 0, 0.301);
    }

    .unfinished-chip {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #350868;
        color: #fff;
        font-family: 'Open Sans', sans-serif;
        border-radius: 10em;
        padding: 0.2em 0.8em;
        font-size: 1.1rem;
        width: max-content;
    }
</style>