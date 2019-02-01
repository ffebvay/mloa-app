<template>
    <md-dialog :md-active.sync="show"
               md-closed="show = false"
               md-clicked-outside="show = false"
               @md-opened="fillForm">

        <md-dialog-content>

            <md-dialog-title>Modifier une tâche</md-dialog-title>

            <form id="edit-form" class="md-layout md-alignment-center-center" @submit.prevent="handleSubmit">

                <md-field>
                    <label>Titre</label>
                    <md-input v-model="task.text" v-validate="'required'" name="text" />
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

                <div class="md-layout checklist-group" v-if="task.checklist && task.checklist.length > 0">

                    <md-dialog-title>Liste de vérification</md-dialog-title>

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

                    <div class="md-layout date-group">

                        <md-dialog-title>Échéance</md-dialog-title>

                        <md-datepicker v-model="task.dueDate">
                            <label>Sélectionner une date...</label>
                        </md-datepicker>

                    </div>

                </div>

                <md-dialog-actions>

                    <md-button type="submit" class="md-primary">Confirmer</md-button>
                    <md-button class="md-primary" @click="show = false">Annuler</md-button>

                </md-dialog-actions>

            </form>

        </md-dialog-content>

    </md-dialog>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import clone from 'lodash/clone'

    export default {
        name: "EditTask",
        data () {
            return {
                task: {},
                submitted: false,
                newChecklistItem: null,
                checklist: []
            }
        },
        props: ['visible', 'taskId', 'taskToUpdate'],
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            }),
            ...mapState('tasks', ['status']),
            show: {
                get() {
                    return this.visible
                },
                set(value) {
                    if (!value) {
                        this.$emit('close')
                    }
                }
            }
        },
        created () {
            this.getAllUsers()
        },
        methods: {
            ...mapActions('users', {
                getAllUsers: 'getAll',
            }),
            ...mapActions('tasks', ['editTask']),
            fillForm() {
                this.task = this.taskToUpdate
                this.checklist = this.task.checklist
                console.log(this.task)
                console.log('Form filled !')
            },
            addChecklistItem(e) {
                let checklistItem = {
                    text: this.newChecklistItem,
                    completed: false
                }

                this.checklist.push(checklistItem)
                this.newChecklistItem = null

                if (e) e.preventDefault()
            },
            removeChecklistItem(i) {
                this.task.checklist.splice(i, 1)
                this.checklist = clone(this.task.checklist)
            },
            handleSubmit(e) {
                this.submitted = true
                this.$validator.validate().then(valid => {
                    if (valid) {
                        console.log('New Task : ',  this.task)

                        this.task.updatedAt = Date.now()
                        this.task.checklist = this.checklist

                        this.editTask(this.task)
                    }
                })
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>
    .checklist-group {
        margin-top: 50px;
    }

    .date-group {
        margin-top: 24px;
    }
</style>