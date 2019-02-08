<template>
    <md-dialog :md-active.sync="welcome">

        <md-dialog-content>

            <div class="md-headline">Bienvenue à toi, nouveau joueur !</div>
            <div class="md-caption">La première étape avant de commencer est de choisir l'apparence de ton avatar, chacun des éléments présents ici seront ensuite modifiables sur ton profil.</div><br />

            <div class="md-caption">En progressant dans le jeu tu pourras accéder à de nouvelles possibilités !</div>

            <form id="edit-form" class="md-layout md-alignment-center-center" @submit.prevent="handleSubmit">

                <md-field>
                    <label for="gender">Genre</label>
                    <md-select v-model="user.genre" name="gender" id="gender" md-dense>
                        <md-option value="MAN">Masculin</md-option>
                        <md-option value="WOM">Féminin</md-option>
                    </md-select>
                </md-field>

                <md-field>
                    <label for="skin">Couleur de peau</label>
                    <md-select v-model="user.skinColor" name="skin" id="skin" md-dense>
                        <md-option value="PEACH">Pêche</md-option>
                        <md-option value="COFFEE">Café</md-option>
                        <md-option value="CHOCOLATE">Chocolat</md-option>
                    </md-select>
                </md-field>

                <md-field>
                    <label for="hair">Couleur des cheveux</label>
                    <md-select v-model="user.hairColor" name="hair" id="hair" md-dense>
                        <md-option value="BROWN">Brun</md-option>
                        <md-option value="BLOND">Blond</md-option>
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
            console.log(this.account)
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
            ...mapActions('account', ['updateUser']),
            greetUser: function(user) {
                let newUser = user

                if (newUser.flags.welcomed === false) {
                    newUser.flags.welcomed = true
                }

                newUser.updatedAt = Date.now()

                return newUser
            },
            handleSubmit(e) {
                this.submitted = true
                this.$validator.validate().then(valid => {
                    if (valid) {
                        let newUser = this.greetUser(this.user)

                        console.log('New user : ', newUser)

                        this.updateUser(newUser)
                    }
                })

                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>