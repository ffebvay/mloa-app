<template>
    <div class="create-task">

        <!-- Top toolbar -->
        <md-toolbar class="md-accent" md-elevation="1">
            <h2 class="md-title">Hola {{account.user.firstName}}.</h2>

            <div class="md-toolbar-section-end">
                <router-link to="/login">
                    <md-button>Déconnexion</md-button>
                </router-link>
            </div>

        </md-toolbar>

        <div class="form-container">
            <form id="create-form" class="md-layout md-alignment-center-center" @submit.prevent="handleSubmit">

                <md-card class="md-layout-item md-gutter md-size-30 md-small-size-100">
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

                            </div>
                        </div>

                        <md-progress-bar class="progress-bar" md-mode="indeterminate" v-if="status.creating" />

                        <md-card-actions class="md-layout md-alignment-center-space-around">

                            <router-link to="/" class="btn btn-link">Annuler</router-link>

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
        <div class="phone-viewport fixed-element">

            <md-bottom-bar id="bottom-bar" class="md-accent" md-type="shift">
                <md-bottom-bar-item id="bottom-bar-item-home" md-label="Tâches" md-icon="home"></md-bottom-bar-item>
                <md-bottom-bar-item id="bottom-bar-item-pages" md-label="Jeux" md-icon="games"></md-bottom-bar-item>
                <md-bottom-bar-item id="bottom-bar-item-posts" md-label="MLOA" md-icon="whatshot"></md-bottom-bar-item>
                <md-bottom-bar-item id="bottom-bar-item-about" md-label="À propos" md-icon="help"></md-bottom-bar-item>
            </md-bottom-bar>

        </div>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "CreateTask",
        data () {
            return {
                task: {
                    userId: '',
                    text: '',
                    description: '',
                    difficulty: ''
                },
                submitted: false
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

    .phone-viewport {
        width: 100%;
        display: inline-flex;
        align-items: flex-end;
        overflow: hidden;
        position: sticky;
        left: 0;
        bottom: 0;
        z-index: 9999;
    }

    .form-container {
        height: 100%;
    }

    .fixed-fab {
        position: sticky;
        right: 0;
        bottom: 56px;
        z-index: 9999;
    }

    div > form {
        margin: 24px;
    }
</style>