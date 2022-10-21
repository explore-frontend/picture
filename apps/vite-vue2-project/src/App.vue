<script setup lang="ts">
import Picture from '@kwai-explore/picture.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import '@/assets/base.css';
import examplePic from './assets/Gardens.png?preset=modern';
</script>

<template>
    <div id="app">
        <header>
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

            <div class="wrapper">
                <HelloWorld msg="You did it!" />

                <nav>
                    <router-link to="/">Home</router-link>
                    <router-link to="/about">About</router-link>
                </nav>
            </div>
        </header>
        <Picture :src="examplePic"></Picture>

        <router-view />
    </div>
</template>

<style scoped>
#app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 28px;

    font-weight: normal;
}

header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

a,
.green {
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
}

@media (hover: hover) {
    a:hover {
        background-color: hsla(160, 100%, 37%, 0.2);
    }
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 10px;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    body {
        display: flex;
        place-items: center;
    }

    #app {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 0 20px;
    }

    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 14px;

        padding: 10px 0;
        margin-top: 20px;
    }
}
</style>
