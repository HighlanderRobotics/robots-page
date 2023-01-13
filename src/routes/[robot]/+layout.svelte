<nav>
    <a href="/">
        <div class="back-arrow-glyph material-icons">arrow_back</div>
        <div class="text">All Robots</div>
    </a>
</nav>

<slot />

<style>
    nav {
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        border-bottom-right-radius: 0.5rem;
    }

    a {
        text-decoration: none;

        display: flex;
        align-items: center;
        padding: 0.5em;
        color: #350868;
        transition: color 0.3s;
    }

    a:hover {
        color: #000;
    }

    .text {
        margin-left: 0.5ch;
        font-family: 'DM Sans', sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.05ch;
        font-size: 0.9rem;
    }

    .back-arrow-glyph {
        transition: transform 0.3s;
    }

    a:hover .back-arrow-glyph {
        transform: translateX(-0.2ch);
    }
</style>