<template>
    <div id="user-profile">

        <!-- Top toolbar -->
        <md-toolbar class="md-primary" md-elevation="0">
            <div class="md-toolbar-section-start">
                <router-link to="/">
                    <md-button class="md-icon-button">
                        <md-icon>home</md-icon>
                    </md-button>
                </router-link>
            </div>

            <div class="md-toolbar-section-end">
                <md-button class="md-icon-button">
                    <md-icon>refresh</md-icon>
                </md-button>

                <router-link to="/login">
                    <md-button>Déconnexion</md-button>
                </router-link>
            </div>

        </md-toolbar>

        <div class="form-container">

            <!--<div class="md-layout-item md-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <span class="md-headline md-layout md-alignment-center-center">Mon profil</span>
            </div>

            <div class="md-layout-item md-size-75 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <hr />
            </div>-->

            <div class="md-layout-item">

                <form id="profile-form" class="md-layout md-alignment-center-center" @submit.prevent="handleSubmit">

                    <md-card class="md-layout-item md-gutter md-size-50 md-small-size-100">

                        <md-card-header>
                            <div class="md-title">Mon profil</div>
                        </md-card-header>

                        <md-card-content>
                            <div class="md-layout md-gutter">

                                <div class="md-layout-item md-small-size-100">
                                    <md-field>
                                        <label for="username">Nom d'utilisateur</label>
                                        <md-input name="username" id="username" v-model="currentUser.username"></md-input>
                                    </md-field>
                                </div>

                            </div>

                            <div class="md-layout md-gutter">

                                <div class="md-layout-item md-small-size-100">
                                    <md-field>
                                        <label for="gender">Sexe</label>
                                        <md-select name="gender" id="gender" md-dense>
                                            <md-option value="masculin">Masculin</md-option>
                                            <md-option value="feminin">Féminin</md-option>
                                        </md-select>
                                    </md-field>
                                </div>

                                <div class="md-layout-item md-small-size-100">
                                    <md-field>
                                        <label for="color">Couleur des cheveux</label>
                                        <md-select name="color" id="color" md-dense>
                                            <md-option value="blond">Blond</md-option>
                                            <md-option value="brun">Brun</md-option>
                                        </md-select>
                                    </md-field>
                                </div>

                            </div>

                            <div class="md-layout md-gutter">

                                <div class="md-layout-item md-small-size-100">
                                    <img :src="getImage(this.avatarUrl)" alt="avatar-selection" />
                                </div>

                            </div>

                            <div class="md-layout md-gutter">

                                <div class="md-layout-item md-small-size-100">
                                    <md-button class="md-icon-button centered" @click="updateAvatar(true)">
                                        <md-icon class="md-size-2x">arrow_left</md-icon>
                                    </md-button>

                                    <md-button class="md-icon-button centered" @click="updateAvatar(false)">
                                        <md-icon class="md-size-2x">arrow_right</md-icon>
                                    </md-button>
                                </div>

                            </div>
                        </md-card-content>

                    </md-card>

                </form>

            </div>

        </div>

        <!-- Validate creation button -->
        <div class="md-layout md-alignment-bottom-right fixed-fab">

            <md-button class="md-fab" form="profile-form" type="submit">
                <md-icon>save</md-icon>
            </md-button>

        </div>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "UserProfile",
        data () {
            return {
                currentUser: null,
                currentAvatar: null,
                avatarUrl: null,
                avatarsArray: [
                    '../assets/masculin.brun.png',
                    '../assets/masculin.blond.png',
                    '../assets/feminin.brun.png',
                    '../assets/feminin.blond.png'
                ]
                /*sex: [
                    'masculin',
                    'feminin'
                ],
                hairColor: [
                    'brun',
                    'blond'
                ]*/
            }
        },
        props: ['avatar'],
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            })
        },
        created () {
            this.avatarUrl = this.$route.params.avatar
            this.currentUser = this.account.user
            //this.avatarUrl = '../assets/'

            console.log(this.currentUser)
            console.log('Current avatar URL: ', this.avatarUrl)
        },
        methods: {
            updateAvatar(reverse) {
                //let remainder =

                /*if (reverse) {

                }
                else {

                }*/
            },
            getImage(path) {
                //return path ? require(path) : require('../assets/masculin.brun.png')
                return require('../assets/masculin.brun.png')
            }
        }
    }
</script>

<style scoped>
    #user-profile {
        height: 100%;
        overflow-x: hidden;
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
        bottom: 0;
        z-index: 9999;
    }

    .centered {
        /*margin: 0 auto;*/
    }

    div > form {
        margin: 24px;
    }
</style>