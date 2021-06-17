<template>
    <section class="section tag">
        <h1 class="section__title tag__title">Теги:</h1>

        <ul class="tag__list">
            <li class="tag__item" v-for="(tag) in this.TAGS" :key="tag">
                <label :for="tag" class="tag__button">{{ tag }}</label>
                <input :id="tag" type="checkbox" @click="sortDataset(tag, $event)" class="tag__input">
            </li>
        </ul>
        <button type="button" @click="showModal(false)" class="tag__create-dataset">Create</button>
    </section>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "tag",
        props: ['activeTagSort'],
        data() {
            return {
                tagsToSort: []
            }
        },
        computed: {
            ...mapGetters([
                "TAGS"
            ]),
        },
        methods: {
            ...mapActions([
                'GET_CURRENT_DATASET_WITH_TAG'
            ]),
            showModal (toShowMutateButtons) {
                this.$emit('showModal', toShowMutateButtons);
            },
            sortDataset(name, event) {
                if (event.target.checked) {
                    event.target.closest('.tag__item').querySelector('.tag__button').classList.add('checked')

                    this.$emit('updateParent', true)
                    this.tagsToSort.push(name)
                    this.GET_CURRENT_DATASET_WITH_TAG(this.tagsToSort)
                } else {
                    let checkedCount = 0
                    let tagItems = document.querySelectorAll('.tag__item')
                    event.target.closest('.tag__item').querySelector('.tag__button').classList.remove('checked')
                    tagItems.forEach(function (item) {
                        if (item.querySelector('.tag__button').classList.contains('checked')) {
                            checkedCount += 1
                        }
                    })
                    if (checkedCount === 0) {
                        this.$emit('updateParent', false)
                    }

                    //this.activeTagSort = !this.activeTagSort
                    for (let i = 0; i < this.tagsToSort.length; i++) {
                        if (this.tagsToSort[i] === name) {
                            this.tagsToSort.splice(i, 1)
                        }
                    }
                    this.GET_CURRENT_DATASET_WITH_TAG(this.tagsToSort)
                }
            }
        }
    }
</script>

<style lang="scss">
    .tag {
        &__input {
            position: absolute;
            left: -9999px;
        }
        &__list {
            display: flex;
            flex-wrap: wrap;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
        }
        &__item {
            margin: 0 10px 25px 0;
        }
        &__button {
            color: #a0b5cb;
            background: #242f3d;
            border: 1px solid #4f5964;
            border-radius: 5px;
            padding: 5px 10px;
            cursor: pointer;
        }
    }
    .section {
        &__title {
            text-align: left;
            color: #a0b5cb;
        }
    }
    .checked {
        background-color: #0069ed
    }
</style>