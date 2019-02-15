<template>
    <div class="tasks-list">
        <md-tabs md-alignment="fixed" class="md-transparent" md-dynamic-height>
            <md-tab id="tab-todo" md-label="Aujourd'hui">

                <!--<div class="md-layout">

                    <div class="md-layout-item md-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                        <span class="md-headline md-layout md-alignment-center-center">Aujourd'hui</span>
                    </div>

                    <div class="md-layout-item md-size-75 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                        <hr />
                    </div>

                </div>-->

                <div id="tasks-container" class="md-layout ">

                    <span v-if="tasks.error" class="md-layout md-alignment-center-center text-danger">ERREUR: {{ tasks.error }}</span>

                    <div class="md-layout-item md-alignment-center-center light-bg" v-if="tasks.items">

                        <div class="task-container md-layout md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100" v-for="task in tasks.items" :key="task._id">

                            <md-card v-if="!task.completed" class="md-layout-item md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-primary white-bg">
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
                                                <md-menu-item @click="updateTask(task)">
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

                                    <md-card-content>
                                        <div class="md-body-1" v-if="task.description">
                                            {{ task.description }}
                                        </div>

                                        <div v-if="task.checklist && task.checklist.length > 0" class="check-control">
                                            <md-list>
                                                <md-subheader>Liste de vérification</md-subheader>

                                                <md-list-item v-for="(item, $index) in task.checklist" :key="item._id">
                                                    <!-- TODO: Add onChange event when checkbox item is checked -->
                                                    <md-checkbox v-model="item.completed" v-on:change="$emit('change', updateChecklist(task))"></md-checkbox>
                                                    <span class="md-list-item-text">{{item.text}}</span>
                                                </md-list-item>
                                            </md-list>
                                        </div>

                                        <!-- Due date -->
                                        <div v-if="task.dueDate" class="due-date-text">
                                            <md-icon style="color:red; font-size:16px !important;">calendar_today</md-icon>
                                            Échéance : {{ task.dueDate | moment("from") }}
                                        </div>
                                    </md-card-content>

                                    <md-card-actions class="md-layout md-alignment-center-center">
                                        <div class="check-container">
                                            <md-checkbox v-model="task.completed" v-on:change="$emit('change', scoreTask(task))"></md-checkbox>
                                        </div>
                                    </md-card-actions>
                                </md-ripple>
                            </md-card>
                        </div>

                    </div>

                    <div v-if="!tasks.items" class="md-layout md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                        <span class="md-subheading">Aucune tâche à effectuer aujourd'hui, bravo !</span>
                    </div>

                </div>

            </md-tab>

            <md-tab id="tab-due" md-label="Planifiées">

                <!--<div class="md-layout">

                    <div class="md-layout-item md-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                        <span class="md-headline md-layout md-alignment-center-center">Aujourd'hui</span>
                    </div>

                    <div class="md-layout-item md-size-75 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                        <hr />
                    </div>

                </div>-->

                <div id="due-container" class="md-layout ">

                    <span v-if="tasks.error" class="md-layout md-alignment-center-center text-danger">ERREUR: {{ tasks.error }}</span>

                    <div class="md-layout-item md-alignment-center-center light-bg" v-if="tasks.items">

                        <div class="task-container md-layout md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100" v-for="task in tasks.items" :key="task._id">

                            <md-card v-if="(!task.completed && task.dueDate !== null)" class="md-layout-item md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-primary white-bg">
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
                                                <md-menu-item @click="updateTask(task)">
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

                                    <md-card-content>
                                        <div class="md-body-1" v-if="task.description">
                                            {{ task.description }}
                                        </div>

                                        <div v-if="task.checklist && task.checklist.length > 0" class="check-control">
                                            <md-list>
                                                <md-subheader>Liste de vérification</md-subheader>

                                                <md-list-item v-for="(item, $index) in task.checklist" :key="item._id">
                                                    <!-- TODO: Add onChange event when checkbox item is checked -->
                                                    <md-checkbox v-model="item.completed" v-on:change="$emit('change', updateChecklist(task))"></md-checkbox>
                                                    <span class="md-list-item-text">{{item.text}}</span>
                                                </md-list-item>
                                            </md-list>
                                        </div>

                                        <!-- Due date -->
                                        <div v-if="task.dueDate" class="due-date-text">
                                            <md-icon style="color:red; font-size:16px !important;">calendar_today</md-icon>
                                            Échéance : {{ task.dueDate | moment("from") }}
                                        </div>
                                    </md-card-content>

                                    <md-card-actions class="md-layout md-alignment-center-center">
                                        <div class="check-container">
                                            <md-checkbox v-model="task.completed" v-on:change="$emit('change', scoreTask(task))"></md-checkbox>
                                        </div>
                                    </md-card-actions>
                                </md-ripple>
                            </md-card>
                        </div>

                    </div>

                    <div v-if="!tasks.items" class="md-layout md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                        <span class="md-subheading">Aucune tâche à effectuer aujourd'hui, bravo !</span>
                    </div>

                </div>

            </md-tab>

            <md-tab id="tab-done" md-label="Déjà accomplies">

                <div id="tasks-done-container" class="md-layout ">

                    <span v-if="tasks.error" class="md-layout md-alignment-center-center text-danger">ERREUR: {{ tasks.error }}</span>

                    <div class="md-layout-item md-alignment-center-center light-bg" v-if="tasks.items">

                        <div class="task-container md-layout md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100" v-for="task in tasks.items" :key="task._id">

                            <md-card v-if="task.completed" class="md-layout-item md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100 md-primary" :class="{'gray-card': task.completed}">
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
                                                <md-menu-item @click="updateTask(task)">
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

                                    <md-card-content>
                                        <div class="md-body-1" v-if="task.description">
                                            {{ task.description }}
                                        </div>

                                        <div v-if="task.checklist && task.checklist.length > 0" class="check-control gray-card">
                                            <md-list>
                                                <md-subheader>Liste de vérification</md-subheader>

                                                <md-list-item v-for="(item, $index) in task.checklist" :key="item._id">
                                                    <!-- TODO: Add onChange event when checkbox item is checked -->
                                                    <md-checkbox v-model="item.completed" v-on:change="$emit('change', updateChecklist(task))"></md-checkbox>
                                                    <span class="md-list-item-text">{{item.text}}</span>
                                                </md-list-item>
                                            </md-list>
                                        </div>

                                        <!-- Due date -->
                                        <div v-if="task.dueDate" class="due-date-text">
                                            <md-icon style="color:red; font-size:16px !important;">calendar_today</md-icon>
                                            Échéance : {{ task.dueDate | moment("from") }}
                                        </div>
                                    </md-card-content>

                                    <md-card-actions class="md-layout md-alignment-center-center">
                                        <div class="check-container">
                                            <md-checkbox v-model="task.completed" v-on:change="$emit('change', scoreTask(task))"></md-checkbox>
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

            </md-tab>

        </md-tabs>

        <EditTask :visible="showDialog" :task-id="currentTaskId" :task-to-update="currentTask" @close="onClose" />

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import EditTask from "./EditTask"
    import { experienceToNextLevel } from "../_helpers/gameHelpers"

    export default {
        name: "Tasks",
        components: { EditTask },
        data: function() {
            return {
                showDialog: false,
                currentTaskId: '',
                currentTask: null,
                currentUser: JSON.parse(localStorage.getItem('user')) // in order to refresh Vue instance when data is modified
            }
        },
        computed: {
            ...mapState({
                account: state => state.account,
                tasks: state => state.tasks.all,
                users: state => state.users.all
            })
        },
        created () {
            this.getAllTasks(this.account.user._id)
            this.getAllActivities(this.account.user._id)
        },
        beforeUpdate () {
            // Only current way I found to update User stats once a task is completed
            setTimeout(() => {
                this.getLoggedUser(this.account.user._id)
            }, 1000)
        },
        methods: {
            ...mapActions('tasks', {
                getAllTasks: 'getAllByUser',
                getSpecificTask: 'getTask',
                markDone: 'completeTask',
                updateChecklistItem: 'editTask',
                deleteSelected: 'deleteTask'
            }),
            ...mapActions('activities', {
                getAllActivities: 'getAllByUser'
            }),
            ...mapActions('account', {
                getLoggedUser: 'getCurrent'
            }),
            ...mapActions('users', {
                getAllUsers: 'getAll'
            }),
            ...mapActions('snackbar', ['setSnack']),
            updateChecklist(task) {
                this.currentTask = task

                // update date of modification
                this.currentTask.updatedAt = Date.now()

                setTimeout(() => {
                    this.updateChecklistItem(this.currentTask),
                    500
                })
            },
            updateTask: function(task) {
                this.currentTask = task
                this.currentTaskId = task._id
                this.showDialog = true
                this.$parent.showEdit = true
            },
            deleteTask: function(taskId) {
                this.deleteSelected(taskId)

                // Only solution I found to force re-render upon Task deletion...
                setTimeout(() =>
                { this.getAllTasks(this.account.user._id) }, 500)
            },
            scoreTask: function(task) {
                let newStats = this.account.user

                // XP Gain/ Checklist bonuses
                let checklistXP = 0
                let gainXP = 0
                let snack = ''

                // Add or remove XP if Task was checked/ unchecked
                if (task.completed === true) {
                    // if task contains a checklist
                    if (task.checklist && task.checklist.length > 0) {
                        task.checklist.forEach(function(item) {
                            // foreach subtask, if the item was checked => give 2 XP bonus
                            if (item.completed === true) {
                                checklistXP += 2
                            }
                        })
                    }

                    // calculate new earned experience
                    newStats.currentExp += ((task.grantExp * task.difficulty) + checklistXP)

                    // add stage experience (bonus due to reaching stage 1, 2, 3, 4)
                    // NewExp = TaskExp {5 * difficulty} + (TaskExp * Stage) { 5 * difficulty * [1, 2, 3, 4] } + constants (checklists)
                    // <=> NewExp += (TaskExp * Stage)
                    let stageXP = (task.grantExp * task.difficulty) * newStats.stage
                    newStats.currentExp += stageXP

                    // store total of XP gained
                    gainXP += ((task.grantExp * task.difficulty) + checklistXP)
                    gainXP += stageXP

                    // increment completed tasks
                    newStats.completedTasks++

                    // set date of completion
                    if (!task.completedDate) {
                        task.completedDate = Date.now()
                    }

                    // set snack message
                    snack = 'Vous avez gagné de l\'expérience : '
                }
                else {
                    // if task contains a checklist
                    if (task.checklist && task.checklist.length > 0) {
                        task.checklist.forEach(function(item) {
                            // foreach subtask, if the item was checked => remove the 2 XP bonus
                            if (item.completed === true) {
                                checklistXP += 2
                            }
                        })
                    }

                    // check if total of XP is negative
                    newStats.currentExp - ((task.grantExp * task.difficulty) + checklistXP) < 0 ?
                        newStats.currentExp = 0
                        : newStats.currentExp -= ((task.grantExp * task.difficulty) + checklistXP)

                    // remove stage experience (malus due to reaching stage 1, 2, 3, 4)
                    let stageXP = (task.grantExp * task.difficulty) * newStats.stage
                    newStats.currentExp -= stageXP

                    // store total of XP lost
                    gainXP += ((task.grantExp * task.difficulty) + checklistXP)
                    gainXP += stageXP

                    // update completed tasks counter always greater than 0 !
                    newStats.completedTasks - 1 < 0 ? newStats.completedTasks = 0 : newStats.completedTasks--

                    // if completedDate is set, delete it
                    if (task.completedDate) {
                        delete task.completedDate
                    }

                    // set snack message
                    snack = 'Vous avez perdu de l\'expérience : '
                }

                // Level up if totalXP of user is superior to the amount of XP to level up
                if (newStats.currentExp >= experienceToNextLevel(newStats.jobLevel)) {
                    newStats.jobLevel++
                }

                if (newStats.jobLevel >= 10 && newStats.flags.canChangeJob === false) {
                    newStats.flags.canChangeJob = true
                }

                // Stage up if new Job Level reaches 5, 10 or 15 => IT SHOULD NOT BE LESS THAN OR MORE THAN 4
                if (newStats.stage === 1 && (newStats.jobLevel >= 5 && newStats.jobLevel < 10)) {
                    newStats.stage++ // Stage 2
                }
                else if (newStats.stage === 2 && (newStats.jobLevel >= 10 && newStats.jobLevel < 15)) {
                    newStats.stage++ // Stage 3
                }
                else if (newStats.stage === 3 && newStats.jobLevel >= 15) {
                    newStats.stage++ // Stage 4
                }

                // set snack message
                snack += `${gainXP} XP`

                // group parameters into one object
                let params = {
                    task: task,
                    newStats: newStats,
                    snack: snack
                }

                // call action form "tasks" store
                this.markDone(params)
            },
            onClose: function() {
                this.showDialog = false
                this.$parent.showEdit = false

                // Only solution I found to force re-render upon Edit Dialog closing...
                setTimeout(() =>
                { this.getAllTasks(this.account.user._id) }, 1000)
            }
        }
    }
</script>

<style scoped>
    div > span hr {
        margin: 24px;
    }

    .tasks-list {
        margin-bottom: 80px;
        /*padding-top: 25px;*/
        height: 100vh;
        width: 100%;
        overflow-x: hidden;
    }

    .md-subheading {
        margin-top: 50px;
    }

    .light-bg {
        background-color: rgba(1, 1, 1, 0);
    }

    .gray-card {
        background-color: darkgray !important;
        color: lightgray !important;
    }

    #tasks-container {
        /*margin: 24px;*/
        padding: 5px;
        /*overflow-x: hidden;*/
    }

    #tasks-done-container {
        /*margin: 24px;*/
        padding: 5px;
        /*overflow-x: hidden;*/
    }

    .task-container {
        display: block;
        margin: 15px;
        text-align: left;
    }

    .check-control {
        margin-top: 30px;
    }

    .white-bg {
        background: #fff !important;
    }

    .md-card-actions {
        /*background: #85e3cb !important;*/
        background: #85cce3 !important;
    }

    .md-checkbox {
        margin: 16px;
    }

    .gray-card > .md-list {
        background-color: darkgray !important;
    }

    .gray-card .md-subheader {
        color: lightgray !important;
    }

    .gray-card .md-list-item-text {
        color: lightgray !important;
    }

    .due-date-text {
        color: red;
    }
</style>