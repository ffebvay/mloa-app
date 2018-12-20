<template>
    <div class="register">

        <form class="md-layout md-alignment-center-center" @submit.prevent="handleSubmit">

            <md-card class="md-layout-item md-gutter md-size-30 md-small-size-100">
                <md-card-header>
                    <div class="md-title">MLOA App</div>
                </md-card-header>

                <md-card-content>

                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-gutter md-small-size-100">

                            <md-field :class="{ 'md-invalid': submitted && errors.has('firstName') }">
                                <label>Prénom</label>
                                <md-input v-model="user.firstName" v-validate="'required'" name="firstName" />
                                <span class="md-error" v-if="submitted && errors.has('firstName')">{{ errors.first('firstName') }}</span>
                                <!-- <div v-if="submitted && errors.has('firstName')" class="invalid-feedback">{{ errors.first('firstName') }}</div> -->
                            </md-field>
                            <md-field :class="{ 'md-invalid': submitted && errors.has('lastName') }">
                                <label>Nom</label>
                                <md-input v-model="user.lastName" v-validate="'required'" name="lastName" />
                                <span class="md-error" v-if="submitted && errors.has('lastName')">{{ errors.first('lastName') }}</span>
                                <!-- <div v-if="submitted && errors.has('lastName')" class="invalid-feedback">{{ errors.first('lastName') }}</div> -->
                            </md-field>
                            <md-field :class="{ 'md-invalid': submitted && errors.has('username') }">
                                <label>Nom d'utilisateur</label>
                                <md-input v-model="user.username" v-validate="'required'" name="username" />
                                <span class="md-error" v-if="submitted && errors.has('username')">{{ errors.first('username') }}</span>
                                <!-- <div v-if="submitted && errors.has('username')" class="invalid-feedback">{{ errors.first('username') }}</div> -->
                            </md-field>
                            <md-field md-has-password :class="{ 'md-invalid': submitted && errors.has('password') }">
                                <label>Mot de passe</label>
                                <md-input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" name="password" />
                                <span class="md-error" v-if="submitted && errors.has('password')">{{ errors.first('password') }}</span>
                                <!-- <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div> -->
                            </md-field>

                        </div>
                    </div>

                    <md-progress-bar class="progress-bar" md-mode="indeterminate" v-if="status.registering" />

                    <md-card-actions class="md-layout md-alignment-center-space-around">

                        <md-button type="submit" class="md-raised md-primary" :disabled="status.registering">Inscription</md-button>
                        <router-link to="/login" class="btn btn-link">Déjà inscrit ?</router-link>

                    </md-card-actions>

                </md-card-content>

            </md-card>

        </form>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "RegisterPage",
        data () {
            return {
                user: {
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: ''
                },
                submitted: false
            }
        },
        computed: {
            ...mapState('account', ['status'])
        },
        methods: {
            ...mapActions('account', ['register']),
            handleSubmit(e) {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.register(this.user)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .register {
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