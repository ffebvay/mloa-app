<template>
    <div class="tasks-list">

        <div class="md-layout md-gutter">

            <div class="md-layout-item md-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <span class="md-headline md-layout md-alignment-center-center">Aujourd'hui</span>
            </div>

            <div class="md-layout-item md-size-75 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <hr />
            </div>

        </div>

        <div id="tasks-container" class="md-layout md-gutter">

            <span v-if="tasks.error" class="md-layout md-alignment-center-center text-danger">ERROR: {{ tasks.error }}</span>

            <div class="md-layout-item md-alignment-center-center light-bg" v-if="tasks.items">

                <div id="task-container" class="md-layout md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100" v-for="task in tasks.items" :key="task.id">
                    <md-card md-with-hover class="md-layout-item md-alignment-center md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-accent">
                        <md-ripple>
                            <md-card-header>
                                <md-card-header-text>
                                    <div class="md-title">{{ task.text }}</div>
                                </md-card-header-text>
                            </md-card-header>

                            <md-card-content v-if="task.description">
                                <div class="md-subhead">
                                    {{ task.description }}
                                </div>
                            </md-card-content>

                            <md-card-actions class="md-layout md-alignment-bottom-right">
                                <div class="check-container">
                                    <md-checkbox v-bind="task.completed"></md-checkbox>
                                </div>
                            </md-card-actions>
                        </md-ripple>
                    </md-card>
                </div>

            </div>

            <div v-else class="md-layout md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <span class="md-subheading">Aucune tâche à effectuer aujourd'hui, bravo !</span>
            </div>

        </div>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "Tasks",
        computed: {
            ...mapState({
                tasks: state => state.tasks.all
            })
        },
        created () {
            this.getAllTasks()
        },
        methods: {
            ...mapActions('tasks', {
                getAllTasks: 'getAll'
            })
        }
    }
</script>

<style scoped>
    div > span hr {
        margin: 24px;
    }

    .tasks-list {
        padding-top: 25px;
        height: 100vh;
        width: 100%;
        overflow-x: hidden;
    }

    .md-subheading {
        margin-top: 50px;
    }

    .light-bg {
        padding: 20px;
        background-color: lightgray;
    }

    #tasks-container {
        margin: 24px;
        padding: 5px;
        overflow-x: hidden;
    }

    #task-container {
        display: block;
        margin: 20px;
    }
</style>