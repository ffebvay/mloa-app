<template>
    <div class="create-task">

        <!-- Top toolbar -->
        <md-toolbar class="md-primary" md-elevation="0">
            <div class="md-toolbar-section-start">
                <router-link :to="{ name: 'profile' }">
                    <md-button class="md-icon-button">
                        <md-icon>person</md-icon>
                    </md-button>
                </router-link>
            </div>

            <div class="md-toolbar-section-end">
                <md-button class="md-icon-button">
                    <md-icon>refresh</md-icon>
                </md-button>

                <router-link to="/login">
                    <md-button class="md-icon-button">
                        <md-icon>power_settings_new</md-icon>
                    </md-button>
                </router-link>
            </div>

        </md-toolbar>

        <div class="form-container">
            <form id="create-form" class="md-layout md-alignment-center-center" @submit.prevent="handleSubmit">

                <md-card class="md-layout-item md-gutter md-size-50 md-small-size-100">
                    <md-card-header>
                        <div class="md-title">Ajouter une tâche</div>
                    </md-card-header>

                    <md-card-content>

                        <div class="md-layout md-gutter md-alignment-center-center">
                            <div class="md-layout-item md-gutter md-small-size-100">

                                <md-field :class="{ 'md-invalid': submitted && errors.has('text') }">
                                    <label>Titre</label>
                                    <md-input v-model="task.text" v-validate="'required'" name="text" />
                                    <span class="md-error" v-if="submitted && errors.has('text')">{{ errors.first('text') }}</span>
                                </md-field>

                                <md-field>
                                    <label>Description</label>
                                    <md-textarea v-model="task.description" name="description" />
                                </md-field>

                                <md-field>
                                    <label>Difficulté</label>
                                    <md-select v-model="task.difficulty" name="difficulty">

                                        <md-option value="1">Facile</md-option>
                                        <md-option value="1.5">Moyen</md-option>
                                        <md-option value="2">Difficile</md-option>

                                    </md-select>
                                </md-field>

                                <div class="md-layout checklist-group">

                                    <label class="md-title">Liste de vérification</label>

                                    <md-field v-for="(item, $index) in checklist" :key="item._id">
                                        <md-input type="text" v-model="item.text"></md-input>
                                        <md-button class="md-icon-button" @click="removeChecklistItem($index)">
                                            <md-icon>delete</md-icon>
                                        </md-button>
                                    </md-field>

                                    <md-field>
                                        <md-icon>add_circle_outline</md-icon>
                                        <label>Ajouter un élément...</label>

                                        <md-input type="text" v-model="newChecklistItem" @keydown.enter="addChecklistItem($event)" :placeholder="newChecklistItem"></md-input>
                                    </md-field>

                                </div>

                                <div class="md-layout date-group">

                                    <label class="md-title">Échéance</label>

                                    <md-datepicker v-model="task.dueDate">
                                        <label>Sélectionner une date...</label>
                                    </md-datepicker>

                                </div>

                            </div>
                        </div>

                        <md-progress-bar class="progress-bar" md-mode="indeterminate" v-if="status.creating" />

                        <md-card-actions class="md-layout md-alignment-center-space-around">

                            <md-button type="submit" class="md-primary">Confirmer</md-button>
                            <md-button href="/" class="md-primary">Annuler</md-button>

                        </md-card-actions>

                    </md-card-content>

                </md-card>

            </form>
        </div>

        <!-- Validate creation button -->
        <div class="md-layout md-alignment-bottom-right fixed-fab">

            <md-button class="md-fab" form="create-form" type="submit" :disabled="status.creating">
                <md-icon>check</md-icon>
            </md-button>

        </div>

        <!-- Navigation bar -->
        <div class="phone-viewport">

            <md-bottom-bar class="md-primary" md-type="fixed">
                <md-bottom-bar-item md-label="Tâches" md-icon="home"></md-bottom-bar-item>
                <md-bottom-bar-item md-label="MLOA" md-icon="whatshot"></md-bottom-bar-item>
                <md-bottom-bar-item md-label="À propos" md-icon="help"></md-bottom-bar-item>
            </md-bottom-bar>

        </div>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import clone from 'lodash/clone'

    export default {
        name: "CreateTask",
        data () {
            return {
                task: {
                    userId: '',
                    text: '',
                    description: '',
                    difficulty: '',
                    checklist: [],
                    dueDate: null
                },
                submitted: false,
                newChecklistItem: null,
                checklist: []
            }
        },
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all,
            }),
            ...mapState('tasks', ['status'])
        },
        created () {
            this.getAllUsers()
        },
        methods: {
            ...mapActions('users', {
                getAllUsers: 'getAll'
            }),
            ...mapActions('tasks', ['addTask']),
            addChecklistItem(e) {
                let checklistItem = {
                    text: this.newChecklistItem,
                    completed: false
                }

                this.task.checklist.push(checklistItem)
                this.checklist.push(checklistItem)
                this.newChecklistItem = null

                if (e) e.preventDefault()
            },
            removeChecklistItem(i) {
                this.task.checklist.splice(i, 1)
                this.checklist = clone(this.task.checklist)
            },
            handleSubmit(e) {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.task.userId = this.account.user._id

                        console.log(this.task)
                        this.addTask(this.task)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .create-task {
        height: 100vh;
        overflow-x: hidden;
    }

    .md-card {
        margin-bottom: 75px;
    }

    .form-container {
        height: 100%;
    }

    .phone-viewport {
        width: 100%;
        display: inline-flex;
        align-items: flex-end;
        overflow: hidden;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 9999;
    }

    .fixed-fab {
        position: fixed;
        right: 0;
        bottom: 56px;
        z-index: 9999;
    }

    .checklist-group {
        margin-top: 50px;
    }

    .date-group {
        margin-top: 24px;
    }

    div > form {
        margin: 24px;
    }
</style>