<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: "App",
        data() {
            return {

            }
        },
        components: {

        },
      methods: {
          show () {
              this.$modal.show('my-first-modal');
          },
          hide () {
              this.$modal.hide('my-first-modal');
          }
      }
    }
</script>

<style lang="scss">
    body {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    ul {
        padding-left: 0;
    }

    li {
        list-style: none;
    }

    button {
        display: inline-block;
        border: none;
        padding: 1rem 2rem;
        margin: 0;
        text-decoration: none;
        background: #0069ed;
        color: #ffffff;
        font-family: sans-serif;
        font-size: 1rem;
        line-height: 1;
        cursor: pointer;
        text-align: center;
        transition: background 250ms ease-in-out, transform 150ms ease;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    .modal-overlay {
        background-color: #000;
        opacity: 0.7;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
    }

    .closed {
        display: none;
    }

    .opened {
        display: block;
    }

    .container {
        margin: 0 auto;
        @media screen and (min-width: 320px){
            max-width: 510px
        }
        @media screen and (min-width: 576px){
            max-width: 690px
        }
        @media screen and (min-width: 768px){
            max-width: 930px
        }
        @media screen and (min-width: 992px){
            max-width: 1110px
        }
    }
</style>
