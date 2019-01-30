<template>
    <md-dialog :md-active.sync="welcome">

        <md-dialog-content>

            <div class="md-headline">Bienvenue à toi !</div>
            <div class="md-caption">Choisis le métier dans lequel tu souhaites évoluer, il te sera possible d'en changer à partir du niveau 10.</div>
            <div class="md-caption">Sélectionne ensuite les éléments d'apparence de ton avatar, ils seront modifiables sur ton profil.</div>

            <form id="edit-form" class="md-layout md-alignment-center-center" @submit.prevent="handleSubmit">

                <md-field>
                    <label for="job">Domaine d'activité</label>
                    <md-select v-model="user.job" name="job" id="job" md-dense>
                        <md-option value="esthetique">Métiers de l'esthétique</md-option>
                        <md-option value="agriculture">Métiers de l'agriculture</md-option>
                        <md-option value="transport">Métiers de transport & maintenance</md-option>
                        <md-option value="restauration">Métiers de bouche</md-option>
                        <md-option value="commerce">Métiers du commerce</md-option>
                        <md-option value="tourisme">Métiers du tourisme</md-option>
                        <md-option value="batiment">Métiers du bâtiment & main d'oeuvre</md-option>
                    </md-select>
                </md-field>

                <md-field>
                    <label for="gender">Genre</label>
                    <md-select v-model="user.genre" name="gender" id="gender" md-dense>
                        <md-option value="masculin">Masculin</md-option>
                        <md-option value="feminin">Féminin</md-option>
                    </md-select>
                </md-field>

                <md-field>
                    <label for="hair">Couleur des cheveux</label>
                    <md-select v-model="user.hairColor" name="hair" id="hair" md-dense>
                        <md-option value="brun">Brun</md-option>
                        <md-option value="blond">Blond</md-option>
                    </md-select>
                </md-field>

                <md-dialog-actions>

                    <md-button type="submit" class="md-primary" @click="welcome = false">Terminé !</md-button>

                </md-dialog-actions>

            </form>

        </md-dialog-content>

    </md-dialog>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "WelcomeDialog",
        data () {
            return {
                user: {},
                submitted: false
            }
        },
        props: ['visible'],
        created () {
            this.user = this.account.user
        },
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            }),
            welcome: {
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
        methods: {
            ...mapActions('account', ['welcomeUser']),
            handleSubmit(e) {
                this.submitted = true
                this.$validator.validate().then(valid => {
                    if (valid) {
                        console.log('New user : ', this.user)

                        this.welcomeUser(this.user)
                    }
                })
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>