<template>
    <div class="nav">
        <router-link class="nav__link" to="/first-page">First Page</router-link>
        |
        <router-link class="nav__link" to="/second-page">Second Page</router-link>
    </div>
</template>

<script>
    export default {
        name: "nav"
    }
</script>

<style lang="scss">
    .nav {
        margin-top:  20px;
        &__link {
            color: #fff;
            font-size: 23px;
        }
    }
</style>