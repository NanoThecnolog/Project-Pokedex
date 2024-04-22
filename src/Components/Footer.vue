<template>
    <v-footer class="footer" app>
        <div class="footer"> @ <a target="_blank" href="https://ericssongomes.com">
                <span>Ericsson Gomes</span>
            </a>. Pokedex &copy; {{
                new
                    Date().getFullYear() }}</div>
    </v-footer>
</template>

<script>
</script>
<style>
.footer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #242424;
    font-weight: 700;
    font-family: sans-serif;
}

a {
    text-decoration: none;
}

a span {
    color: #242424;
}
</style>
