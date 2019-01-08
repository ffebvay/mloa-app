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

                <div class="task-container md-layout md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100" v-for="task in tasks.items" :key="task.id">

                    <md-card md-with-hover v-if="!task.completed" class="md-layout-item md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-accent" :class="{'gray-card': task.completed}">
                        <md-ripple>
                            <md-card-header>
                                <md-card-header-text>
                                    <div class="md-title">{{ task.text }}</div>
                                    <div class="md-subhead">
                                        <div v-if="task.difficulty === 1">
                                            Difficulté: FACILE
                                        </div>
                                        <div v-else-if="task.difficulty === 1.5">
                                            Difficulté: MOYEN
                                        </div>
                                        <div v-else>
                                            Difficulté: EXTRÊME
                                        </div>
                                    </div>
                                </md-card-header-text>

                                <md-menu md-size="big" md-direction="bottom-end">
                                    <md-button class="md-icon-button" md-menu-trigger>
                                        <md-icon>more_vert</md-icon>
                                    </md-button>

                                    <md-menu-content>
                                        <md-menu-item @click="updateTask(task._id)">
                                            <span>Modifier</span>
                                            <md-icon>create</md-icon>
                                        </md-menu-item>
                                        <md-menu-item @click="deleteTask(task._id)">
                                            <span>Supprimer</span>
                                            <md-icon>clear</md-icon>
                                        </md-menu-item>
                                    </md-menu-content>
                                </md-menu>
                            </md-card-header>

                            <md-card-content v-if="task.description">
                                <div>
                                    {{ task.description }}
                                </div>
                            </md-card-content>

                            <md-card-actions class="md-layout md-alignment-bottom-right">
                                <div class="check-container">
                                    <md-checkbox v-model="task.completed" v-on:change="markDone(task)"></md-checkbox>
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

        <div class="md-layout md-gutter">

            <div class="md-layout-item md-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <span class="md-headline md-layout md-alignment-center-center">Déjà accomplies</span>
            </div>

            <div class="md-layout-item md-size-75 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <hr />
            </div>

        </div>

        <div id="tasks-done-container" class="md-layout md-gutter">

            <span v-if="tasks.error" class="md-layout md-alignment-center-center text-danger">ERROR: {{ tasks.error }}</span>

            <div class="md-layout-item md-alignment-center-center light-bg" v-if="tasks.items">

                <div class="task-container md-layout md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100" v-for="task in tasks.items" :key="task.id">

                    <md-card md-with-hover v-if="task.completed" class="md-layout-item md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-accent" :class="{'gray-card': task.completed}">
                        <md-ripple>
                            <md-card-header>
                                <md-card-header-text>
                                    <div class="md-title">{{ task.text }}</div>
                                    <div class="md-subhead">
                                        <div v-if="task.difficulty === 1">
                                            Difficulté: FACILE
                                        </div>
                                        <div v-else-if="task.difficulty === 1.5">
                                            Difficulté: MOYEN
                                        </div>
                                        <div v-else>
                                            Difficulté: EXTRÊME
                                        </div>
                                    </div>
                                </md-card-header-text>

                                <md-menu md-size="big" md-direction="bottom-end">
                                    <md-button class="md-icon-button" md-menu-trigger>
                                        <md-icon>more_vert</md-icon>
                                    </md-button>

                                    <md-menu-content>
                                        <md-menu-item @click="updateTask(task._id)">
                                            <span>Modifier</span>
                                            <md-icon>create</md-icon>
                                        </md-menu-item>
                                        <md-menu-item @click="deleteTask(task._id)">
                                            <span>Supprimer</span>
                                            <md-icon>clear</md-icon>
                                        </md-menu-item>
                                    </md-menu-content>
                                </md-menu>
                            </md-card-header>

                            <md-card-content v-if="task.description">
                                <div>
                                    {{ task.description }}
                                </div>
                            </md-card-content>

                            <md-card-actions class="md-layout md-alignment-bottom-right">
                                <div class="check-container">
                                    <md-checkbox v-model="task.completed" v-on:change="markDone(task)"></md-checkbox>
                                </div>
                            </md-card-actions>
                        </md-ripple>
                    </md-card>
                </div>

            </div>

            <div v-else class="md-layout md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <span class="md-subheading">Il vous reste de grandes choses à accomplir !</span>
            </div>

        </div>

        <EditTask :visible="showDialog" :task-id="currentTask" @close="onClose" />

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import EditTask from "./EditTask"

    export default {
        name: "Tasks",
        components: {EditTask},
        data: function() {
            return {
                showDialog: false,
                currentTask: ''
            }
        },
        computed: {
            ...mapState({
                account: state => state.account,
                tasks: state => state.tasks.all
            })
        },
        created () {
            this.getAllTasks(this.account.user._id)
        },
        methods: {
            ...mapActions('tasks', {
                getAllTasks: 'getAllByUser',
                markDone: 'completeTask',
                deleteSelected: 'deleteTask'
            }),
            updateTask: function(taskId) {
                this.currentTask = taskId
                this.showDialog = true
            },
            deleteTask: function(taskId) {
                this.deleteSelected(taskId)

                // Only solution I found to force re-render upon Task deletion...
                setTimeout(() =>
                { this.getAllTasks(this.account.user._id) }, 500)
            },
            onClose: function() {
                this.showDialog = false

                // Only solution I found to force re-render upon Edit Dialog closing...
                setTimeout(() =>
                { this.getAllTasks(this.account.user._id) }, 500)
            }
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

    .gray-card {
        background-color: darkgray !important;
    }

    #tasks-container {
        margin: 24px;
        padding: 5px;
        overflow-x: hidden;
    }

    #tasks-done-container {
        margin: 24px;
        padding: 5px;
        overflow-x: hidden;
    }

    .task-container {
        display: block;
        margin: 20px;
        text-align: left;
    }
</style>