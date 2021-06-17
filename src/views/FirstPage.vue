<template>
    <div class="first-page">
        <div class="container">
            <Tag @updateParent="updateStatus" :activeTagSort="activeTagSort" @showModal="showModal"/>
            <Dataset :activeTagSort="activeTagSort" @showModal="showModal"/>
            <DatasetCreateModal
                    @editData="editData"
                    @editingAction="editingAction"
                    @deleteFromState="deleteFromState"
                    :editing="editing"
                    :showMutateButtons="showMutateButtons"
                    :editingName="editingName"
                    :editingSize="editingSize"
                    :editingTags="editingTags"
                    />
        </div>
    </div>
</template>


<script>
    import tag from "../components/tag";
    import dataset from "../components/dataset";
    import makeDatasetModal from "../components/makeDatasetModal";
    import {mapActions} from 'vuex'


    export default {
        name: "FirstPage",
        components: {
            Tag: tag,
            Dataset: dataset,
            DatasetCreateModal: makeDatasetModal,
        },
        computed: {

        },
        data() {
            return {
                isShowModal: true,
                showMutateButtons: true,
                editing: false,
                deleteIndex: null,
                editingName: '',
                editingSize: '',
                deleteItem: [],
                editingTags: [],
                activeTagSort: false
            }
        },
        methods: {
            ...mapActions([
                "DELETE_DATASET",
                "EDIT_DATASET",
                "GET_CURRENT_DATASET",
                "DELETE_TAGS"
            ]),
            updateStatus(data) {
                this.activeTagSort = data
            },
            deleteFromState() {
                this.DELETE_DATASET(this.deleteIndex)
                this.DELETE_TAGS(this.deleteItem)
            },
            showModal (toShowMutateButtons, index, item) {
                this.deleteIndex = index
                if (item) {
                    this.deleteItem = item.tags
                }
                this.showMutateButtons = toShowMutateButtons;
                this.$modal.show('datasetModal');
            },
            editData(data) {
                data.index = this.deleteIndex
                this.EDIT_DATASET(data)
                this.editing = false;
            },
            editingAction() {
                this.editing = true;
                let _this = this
                this.GET_CURRENT_DATASET(this.deleteIndex).then(function (response) {
                    _this.editingName = response.name
                    _this.editingSize = response.size
                    _this.editingTags = response.tags
                })

            }
        }
    }
</script>

<style lang="scss">
.section__title {
    font-size: 15px;
}
</style>