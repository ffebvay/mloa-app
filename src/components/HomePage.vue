<template>
    <div class="home">

        <!-- Top toolbar -->
        <md-toolbar class="md-primary" md-elevation="0">
            <div class="md-toolbar-section-start">
                <router-link :to="{ name: 'profile', params: { avatar: this.homeAvatar }}">
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
                    <md-button>Déconnexion</md-button>
                </router-link>
            </div>

        </md-toolbar>

        <!-- App header -->
        <div id="app-header" class="md-layout">

            <!-- TODO: Add UI layout for current player - Avatar, nickname, XP points -->
            <div class="md-layout-item md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100 player-details d-flex">

                <div class="avatar">
                    <img src="../assets/masculin.brun.png" alt="avatar"/>
                    <md-tooltip md-direction="bottom">Avatar</md-tooltip>
                </div>

                <div class="md-layout-item">
                    <div class="d-flex align-items-center">
                        <h3>Bonjour {{account.user.firstName}}.</h3>
                    </div>
                    <div class="progress-container">
                        <span class="md-body-1">Niveau {{account.user.currentLevel}}</span>

                        <div class="xp-tip">
                            <md-progress-bar md-mode="determinate" class="md-accent" :md-value="currentExperience"></md-progress-bar>
                            <md-tooltip md-direction="bottom">Expérience</md-tooltip>
                        </div>

                        <span class="small-text">{{account.user.totalExp}} / {{experienceToGain}}</span>
                        <div class="md-body-1">Tâches accomplies : {{account.user.completedTasks}}</div>
                    </div>
                </div>

            </div>

        </div>

        <!-- Main content (list of tasks) -->
        <div class="md-layout md-gutter">

            <Tasks />

        </div>

        <!-- Add task button -->
        <div class="md-layout md-alignment-center-center fixed-fab">

            <router-link to="/task">
                <md-button class="md-fab">
                    <md-icon>add</md-icon>
                </md-button>
            </router-link>

        </div>

        <!-- Navigation bar -->
        <div class="phone-viewport">

            <md-bottom-bar class="md-primary" md-type="fixed" md-sync-route>
                <md-bottom-bar-item md-label="Tâches" md-icon="home" to="/"></md-bottom-bar-item>
                <md-bottom-bar-item md-label="MLOA" md-icon="whatshot" to="/feed"></md-bottom-bar-item>
                <md-bottom-bar-item md-label="À propos" md-icon="help" to="/about"></md-bottom-bar-item>
            </md-bottom-bar>

        </div>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import Tasks from "./Tasks"
    import { experienceToNextLevel } from '../_helpers'

    export default {
        name: "HomePage",
        components: { Tasks },
        data () {
            return {
                userId: '',
                homeAvatar: ''
            }
        },
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            }),
            experienceToGain: function () {
                return this.experienceToNextLevel(this.account.user.currentLevel)
            },
            currentExperience: function () {
                return (this.account.user.totalExp / this.experienceToGain) * 100
            }
        },
        created () {
            this.getAllUsers()

            console.log(this.$router)

            // to pass it as a parameter for User Profile route
            this.userId = this.account.user._id

            // TODO: static route to current avatar at the moment
            this.homeAvatar = '../assets/masculin.brun.png'
        },
        methods: {
            ...mapActions('users', {
                getAllUsers: 'getAll'
            }),
            experienceToNextLevel: function () {
                return experienceToNextLevel(this.account.user.currentLevel)
            }
        }
    }
</script>

<style scoped>
    #app-header {
        flex-wrap: nowrap;
        position: relative;
        /*background: #6aa3b5;*/
    }

    .home {
        height: 100%;
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
        z-index: 1;
    }

    .fixed-fab {
        position: fixed;
        right: 0;
        left: 0;
        bottom: 56px;
        z-index: 9999;
    }

    .md-layout-item {
        padding: 12px;
    }

    .player-details {
        display: block;
        margin: 20px;
        text-align: left;
        background-color: #35515a;
    }

    .avatar > img{
        display: block;
        width: 100%;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        -ms-interpolation-mode: nearest-neighbor;
        image-rendering: -moz-crisp-edges;
        image-rendering: pixelated;
        position: relative;
        /*background-image: url(../assets/masculin.brun.png);*/
    }

    .player-stats {
        padding-left: 12px;
        padding-right: 12px;
        opacity: 1;
    }

    .md-body-1 {
        color: #fff !important;
    }

    .small-text {
        color: darkgray;
        font-size: 12px;
    }

    h1, h2, h3, h4, h5 {
        color: #fff;
    }
</style>