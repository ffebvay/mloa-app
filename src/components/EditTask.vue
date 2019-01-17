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

    export default {
        name: "EditTask",
        data () {
            return {
                task: {},
                submitted: false
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
                console.log(this.task)
                console.log('Form filled !')
            },
            handleSubmit(e) {
                this.submitted = true
                this.$validator.validate().then(valid => {
                    if (valid) {
                        console.log('New Task : ',  this.task)


                        this.task.updatedAt = Date.now()

                        this.editTask(this.taskToUpdate)
                    }
                })
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>