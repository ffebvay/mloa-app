<template>
    <md-dialog :md-active.sync="jobSelect">

        <md-dialog-content>

            <div class="md-headline">Maintenant commencent les choses sérieuses !</div>
            <div class="md-caption">Il est temps pour toi de choisir le métier que tu voudrais exercer parmi les choix possibles.</div><br />

            <div class="md-caption">Pas de panique ! À compter du niveau 10 dans le métier que tu auras choisi, il te sera possible de réinitialiser ta progression et de changer de métier à volonté.</div><br /><br />

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

                <md-dialog-actions>

                    <md-button type="submit" class="md-primary" @click="jobSelect = false">Terminé !</md-button>

                </md-dialog-actions>

            </form>

        </md-dialog-content>

    </md-dialog>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "JobDialog",
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
            jobSelect: {
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
            ...mapActions('account', ['updateUser']),
            chooseJob: function(user) {
                let newUser = user

                newUser.updatedAt = Date.now()

                return newUser
            },
            handleSubmit(e) {
                this.submitted = true
                this.$validator.validate().then(valid => {
                    if (valid) {
                        let newUser = this.chooseJob(this.user)

                        console.log('New user : ', newUser)

                        this.updateUser(newUser)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>