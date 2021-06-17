export default {
    state: {
        dataset: [],
        datasetSorted: [],
        tags: []
    },
    actions: {
        ADD_TO_DATASET: ({commit}, dataset) => {
            commit('SET_DATASET', dataset)
        },
        ADD_TO_TAGS: ({commit}, tags) => {
            commit('SET_TAG', tags)
        },
        EDIT_DATASET: ({commit}, data) => {
            console.log(data)
            commit('EDIT_STATE', data)
        },
        DELETE_DATASET: ({commit}, index) => {
            commit('REMOVE_FROM_STATE', index)
        },
        DELETE_TAGS: ({commit}, tags) => {
            commit('REMOVE_TAGS_FROM_STATE', tags)
        },
        GET_CURRENT_DATASET({state}, index) {
            return state.dataset[index]
        },
        GET_CURRENT_DATASET_WITH_TAG({commit}, filters) {
            commit('SET_SORTED_DATASET', filters)
        }
    },
    mutations: {
        SET_DATASET: (state, dataset) => {
            for (let i = 0; i < state.dataset.length; i++) {
                if (state.dataset[i].name === dataset.name) {
                    return
                }
            }
            state.dataset.push(dataset)
        },
        SET_TAG: (state, tag) => {
            let wrong = false
            for (let i = 0; i < tag.length; i++) {
                for (let j = 0; j < state.tags.length; j++) {
                    if (state.tags[j] === tag[i]) {
                        wrong = true
                        break
                    }
                    wrong = false
                }
                if (wrong) {
                    continue
                }
                state.tags.push(tag[i])
            }
        },
        EDIT_STATE: (state, data ) => {

            let dataset = state.dataset[data.index]
            dataset.name = data.name
            dataset.tags = data.tags
            dataset.size = data.size

            console.log(state.dataset[data.index])
        },
        REMOVE_FROM_STATE: (state, index) => {
            state.dataset.splice(index, 1)
        },
        REMOVE_TAGS_FROM_STATE: (state, tags) => {
            console.log(tags)

            for (let i = 0; i < state.tags.length; i++) {
                for (let j = 0; j < tags.length; j++) {
                    if (tags[j] === state.tags[i]) {
                        console.log(tags[j], state.tags[i])
                        let containsTag = false
                        for (let m = 0; m < state.dataset.length; m++) {
                            console.log(m)
                            for (let k = 0; k < state.dataset[m].tags.length; k++) {
                                if (state.dataset[m].tags[k] === tags[j]) {
                                    containsTag = true
                                    break
                                }
                            }
                        }
                        if (!containsTag) {
                            state.tags.splice(i, 1)
                        }
                    }
                }
            }
        },
        SET_SORTED_DATASET: (state, filters) => {
            state.datasetSorted = []
            let iterationIndex = []
            for (let i = 0; i < state.dataset.length; i++) {
                for (let j = 0; j < state.dataset[i].tags.length; j++) {
                    for (let k = 0; k < filters.length; k++) {
                        if (filters[k] === state.dataset[i].tags[j]) {
                            console.log(iterationIndex)
                            state.dataset[i].sorted = true
                            if (iterationIndex.indexOf(i) === -1) {
                                state.datasetSorted.push(state.dataset[i])
                            }
                            iterationIndex.push(i)
                        }
                    }
                }
            }
        }
    },
    getters: {
        DATASET(state) {
            return state.dataset
        },
        TAGS(state) {
            return state.tags
        },
        DATASET_SORTED(state) {
            return state.datasetSorted
        }
    }
}