<template>
    <section class="section dataset">
        <h1 class="section__title dataset__title">Выберите датасет</h1>
        <ul class="dataset__list">
            <li @click="showModal(true, index, item)" v-for="(item, index) in datasetArray()" :key="item.name" class="dataset__item">
                <div class="dataset__item-wrapper">
                    <h4 class="dataset__item-title">{{ item.name }}</h4>
                    <ul class="dataset-tags__list">
                        <li v-for="tag in item.tags" :key="tag" class="dataset-tags__item">
                            <p class="dataset-tags__item-text"><img src="../assets/discount.svg" alt="Ticket icon" class="dataset-tags__item-icon">{{ tag }}</p>
                        </li>
                    </ul>
                </div>
                <div class="dataset__item-size">
                    <p class="dataset__item-size-text">{{ item.size }} MB</p>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "dataset",
        computed: {
            ...mapGetters([
                "DATASET",
                "DATASET_SORTED"
            ]),
        },
        props: ['activeTagSort'],
        data() {
            return {}
        },
        methods: {
            deleteFromState() {
                this.$emit('deleteFromState')
            },
            showModal (toShowMutateButtons, index, item) {
                this.$emit('showModal', toShowMutateButtons, index, item);
            },
            datasetArray() {
                if (this.activeTagSort) {
                    return this.DATASET_SORTED
                }
                return this.DATASET
            }
        }
    }
</script>

<style lang="scss">
    .dataset {
        &__list {
            display: flex;
            flex-wrap: wrap;
        }
        &__item {
            margin: 0 10px 25px 0;
            min-width: 180px;
            cursor: pointer;
            &-title {
                color: #fff;
                margin: 0 0 50px 0;
                text-align: left;
            }
            &-wrapper {
                background: #242f3d;
                padding: 16px 13px 0 13px;
                border: 1px solid #4f5964;
                border-radius: 5px;
            }
            &-size {
                background-color: #0f1621;
                border-radius: 3px;
                width: 87%;
                margin: 0 auto;
                &-text {
                    padding: 5px;
                    margin: 0;
                }
            }
        }
        &-tags {
            &__item {
                &-text {
                    color: #a0b5cb;
                    margin: 0 0 8px 0;
                    text-align: left;
                }
                &-icon {
                    margin-right: 8px;
                    width: 11px;
                    color: #fff;
                }
            }
        }
    }
</style>