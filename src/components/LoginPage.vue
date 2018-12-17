<template>
    <div class="login">

        <form class="md-layout md-alignment-center-center" @submit.prevent="handleSubmit">
            <md-card class="md-layout-item md-gutter md-size-30 md-small-size-100">
                <md-card-header>
                    <div class="md-title">MLOA App</div>
                </md-card-header>

                <md-card-content>

                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-gutter md-small-size-100">

                            <md-field :class="{ 'md-invalid': submitted && !username }">
                                <label>Nom d'utilisateur</label>
                                <md-input v-model="username" name="username" />
                                <span class="md-error" v-show="submitted && !username">Le nom d'utilisateur est requis</span>
                                <!-- <div v-show="submitted && !username" class="invalid-feedback">Username is required</div> -->
                            </md-field>

                            <md-field md-has-password :class="{ 'md-invalid': submitted && !password }">
                                <label>Mot de passe</label>
                                <md-input type="password" v-model="password" name="password" />
                                <span class="md-error" v-show="submitted && !password">Le mot de passe est requis</span>
                                <!-- <div v-show="submitted && !password" class="invalid-feedback">Password is required</div> -->
                            </md-field>

                        </div>
                    </div>

                    <md-progress-bar class="progress-bar" md-mode="indeterminate" v-if="status.loggingIn" />

                    <md-card-actions class="md-layout md-alignment-center-space-around">

                        <md-button type="submit" class="md-raised md-primary" :disabled="status.loggingIn">Connexion</md-button>
                        <router-link to="/register">Pas encore de compte ?</router-link>

                    </md-card-actions>

                </md-card-content>

            </md-card>
        </form>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "LoginPage",
        data () {
            return {
                username: '',
                password: '',
                submitted: false
            }
        },
        computed: {
            ...mapState('account', ['status'])
        },
        created () {
            // reset login status
            this.logout()
        },
        methods: {
            ...mapActions('account', ['login', 'logout']),
            handleSubmit (e) {
                this.submitted = true
                const { username, password } = this

                if (username && password) {
                    this.login({ username, password })
                }
            }
        }
    }
</script>

<style scoped>
    .login {
        padding-top: 50px;
        height: 100vh;
    }

    .progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
</style>