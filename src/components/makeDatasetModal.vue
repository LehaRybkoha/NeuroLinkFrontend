<template>
    <modal :width="300"
           :height="'auto'"
            name="datasetModal"
           class="create-modal">
        <div class="create-modal-wrapper">
            <div v-if="showMutateButtons" class="create-modal-top">
                <button @click="deleteFromState" class="create-modal-top__button">Удалить</button>
                <button @click="editingAction" class="create-modal-top__button">Редактировать</button>
            </div>
            <h3 class="create-modal__title">Параметры датасета</h3>
            <form class="create-modal-form">
                <div class="create-modal-form__block">
                    <label for="datasetName" class="create-modal-form__block-title">Название датасета</label>
                    <input ref="nameOfDataSet"  v-model="nameOfDataSet" id="datasetName" type="text" class="create-modal-form__block-input">
                </div>
                <div class="create-modal-form__block">
                    <label for="datasetTag" class="create-modal-form__block-title">Теги</label>
                    <input ref="tags" v-model="tags" id="datasetTag" type="text" class="create-modal-form__block-input">
                </div>
                <div class="create-modal-form__block create-modal-form__block--size">
                    <label for="datasetSize"
                           class="create-modal-form__block-title create-modal-form__block-title--size">Размер
                        датасета</label>
                    <input ref="size" v-model="size" id="datasetSize" type="text"
                           class="create-modal-form__block-input create-modal-form__block-input--size">
                </div>

                <button v-if="!editing" type="button" class="create-modal-form__button" @click="sendData">Сформировать</button>
                <button v-else type="button" class="create-modal-form__button" @click="editData">Сохранить</button>
            </form>
        </div>
    </modal>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'


    export default {
        name: "makeDatasetModal",
        props: ['showMutateButtons', 'editing', 'editingName', 'editingSize', 'editingTags'],
        data() {
            return {
                nameOfDataSet: '',
                tags: '',
                size: ''
            }
        },
        computed: {
            ...mapGetters([
                "DATASET",
                "TAGS"
            ])
        },
        methods: {
            ...mapActions([
                'ADD_TO_DATASET',
                'ADD_TO_TAGS',
                'DELETE_DATASET'
            ]),
            sendData() {
                let data = {
                    name: this.nameOfDataSet,
                    tags: this.tags.split(' '),
                    size: this.size
                }
                let tags = this.tags.split(' ')

                this.ADD_TO_DATASET(data)
                this.ADD_TO_TAGS(tags)
                this.nameOfDataSet = ''
                this.tags = ''
                this.size = ''
            },
            editData() {
                let data = {
                    name: this.nameOfDataSet,
                    tags: this.tags.split(' '),
                    size: this.size
                }
                this.$emit('editData', data)
            },
            deleteFromState() {
                this.$emit('deleteFromState')
            },
            async editingAction() {
                await this.$emit('editingAction')
                let _this = this
                setTimeout(function () {
                    _this.nameOfDataSet = _this.editingName
                    _this.size = _this.editingSize
                    _this.tags = _this.editingTags.join(' ')

                }, 50)
            }
        }
    }
</script>

<style lang="scss">
    .create-modal {
        position: absolute;
        width: 500px;

        &-wrapper {
            background-color: #17222c;
        }

        &-top {
            padding: 15px;
            margin-bottom: 20px;

            &__button {
                background-color: #6c7883;
                border: 1px solid #1e3e5b;
                min-width: 100%;
                padding: 10px 0;
                border-radius: 5px;
                color: #283540;
                margin-bottom: 5px;
            }
        }

        &__title {
            background-color: #0d1621;
            color: #fff;
            margin-bottom: 10px;
            font-size: 13px;
            text-align: left;
            padding: 5px 0 5px 15px;
        }
        &-form {
            padding: 15px;
            &__block {
                margin-bottom: 5px;
                text-align: left;

                &-title {
                    color: #a5b4c2;
                    font-size: 11px;
                    &--size {
                        order: 2;
                    }
                }

                &-input {
                    margin-top: 5px;
                    color: #fff;
                    width: 100%;
                    padding: 10px 0 10px 5px;
                    background-color: #252f3d;
                    border: 1px solid #626c78;
                    border-radius: 3px;
                    &--size {
                        padding: 3px 0 3px 5px;
                        order: 1;
                        width: 100px;
                        margin-right: 10px;
                    }
                }
                &--size {
                    display: flex;
                    align-items: center;
                }
            }

            &__button {
                background-color: #2b5279;
                border: 1px solid #5a90be;
                width: 100%;
                padding: 10px 0;
                border-radius: 5px;
                margin: 50px 0 50px 0;
            }
        }
    }
    .vm--modal {
        background: #17222c !important;
    }
</style>