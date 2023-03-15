<script>
    import "../app.css";
</script>

<header>
    <div class="site-header bg-fainter-purple">
        <div class="site-container container flex flex-row items-center justify-between mx-auto">
            <a href="/" class="max-w-[100px]">
                <img src="../Movies4u-1_2.png" alt="">
            </a>
    
            <nav class="nav-container ">
                <ul class="flex flex-row text-blue font-medium font-mono text-md-sm ">
                    <li><a href="/movies">Movies</a></li>
                    <li><a href="/tv-shows">TV Shows</a></li>
                </ul>
            </nav>
        </div>
    </div>
</header>

<slot></slot>

<footer>
    
</footer>