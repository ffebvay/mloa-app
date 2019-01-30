<template>
    <div class="home">

        <!-- Top toolbar -->
        <md-toolbar class="md-primary" md-elevation="0">
            <div class="md-toolbar-section-start">
                <router-link :to="{ name: 'profile' }">
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
                    <md-button class="md-icon-button">
                        <md-icon>power_settings_new</md-icon>
                    </md-button>
                </router-link>
            </div>

        </md-toolbar>

        <!-- App header -->
        <div id="app-header" class="md-layout v-step-1">

            <!-- TODO: Add UI layout for current player - Avatar, nickname, XP points -->
            <div class="md-layout-item md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100 player-details d-flex">

                <div class="avatar v-step-2">
                    <img :src="getImage(avatarPath)" alt="avatar" />
                    <md-tooltip md-direction="bottom">Avatar</md-tooltip>
                </div>

                <div class="md-layout-item">
                    <div class="d-flex align-items-center">
                        <h3>Bonjour {{account.user.username}} !</h3>
                    </div>
                    <div class="progress-container">
                        <span class="md-body-1">Métier: {{userJob}}</span>
                        <div class="md-body-1">Niveau {{account.user.jobLevel}}</div>

                        <div class="xp-tip">
                            <md-progress-bar md-mode="determinate" class="md-accent" :md-value="currentExperience"></md-progress-bar>
                            <md-tooltip md-direction="bottom">Expérience</md-tooltip>
                        </div>

                        <span class="small-text">{{account.user.currentExp}} / {{experienceToGain}}</span>
                        <div class="md-body-1 v-step-3">Tâches accomplies : {{account.user.completedTasks}}</div>
                    </div>
                </div>

            </div>

        </div>

        <div id="tuto-step-5" class="v-step-5"></div>
        <!-- Main content (list of tasks) -->
        <div class="md-layout md-gutter">

            <Tasks />

        </div>

        <!-- Add task button -->
        <div v-if="!showWelcome" class="md-layout md-alignment-center-center fixed-fab v-step-4 v-step-6">

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

        <WelcomeDialog :visible="showWelcome" @close="onClose"/>

        <v-tour name="tuto" :steps="steps"></v-tour>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import Tasks from "./Tasks"
    import WelcomeDialog from "./WelcomeDialog"
    import { experienceToNextLevel } from '../_helpers'

    export default {
        name: "HomePage",
        components: { WelcomeDialog, Tasks },
        data () {
            return {
                userId: '',
                showWelcome: false,
                steps: [
                    {
                        target: '.v-step-1',
                        content: `Découvrez la <strong>MLOApp</strong> !`
                    },
                    {
                        target: '.v-step-2',
                        content: 'Vous trouverez ici votre avatar, à partir duquel vous pourrez suivre votre progression dans vos tâches quotidiennes.'
                    },
                    {
                        target: '.v-step-3',
                        content: 'Cette partie affiche des informations sur votre personnage : le niveau de votre métier, l\'expérience acquise au fil du temps et le nombre de tâches que vous avez accomplies !'
                    },
                    {
                        target: '.v-step-4',
                        content: 'Ce bouton vous permet d\'ajouter une tâche à votre liste de choses à faire.',
                        params: {
                            placement: 'top'
                        }
                    },
                    {
                        target: '.v-step-5',
                        content: 'Chaque tâche que vous créez s\'ajoute ici, et celles que vous cochez dans la partie "Déjà accomplies".',
                        params: {
                            placement: 'top'
                        }
                    },
                    {
                        target: '.v-step-6',
                        content: 'Enfin, ce menu vous permet de naviguer entre les différentes pages de l\'application pour vous renseigner sur votre Mission Locale préférée !',
                        params: {
                            placement: 'top'
                        }
                    }
                ]
            }
        },
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            }),
            experienceToGain: function () {
                return this.experienceToNextLevel(this.account.user.jobLevel)
            },
            currentExperience: function () {
                return (this.account.user.currentExp / this.experienceToGain) * 100
            },
            avatarPath: function() {
                return this.account.user.genre + '.' + this.account.user.hairColor + '.png'
            },
            userJob: function() {
                switch(this.account.user.job) {
                    case 'esthetique':
                        return 'Esthétique'
                        break
                    case 'agriculture':
                        return 'Agriculture'
                        break
                    case 'transport':
                        return 'Transport & Maintenance'
                        break
                    case 'restauration':
                        return 'Restauration'
                        break
                    case 'commerce':
                        return 'Commerce'
                        break
                    case 'tourisme':
                        return 'Tourisme & Loisirs'
                        break
                    case 'batiment':
                        return 'Bâtiment & Main d\'oeuvre'
                        break
                    default:
                        return 'Sans'
                        break
                }
            }
        },
        created () {
            // to pass it as a parameter for User Profile route
            this.userId = this.account.user._id

            // Display modal dialog on first connection and edit "user.flags.welcomed" value to "true"
            if (this.account.user.flags.welcomed === false) {
                this.showWelcome = true
            }
        },
        mounted () {
            // TODO: Add instructional steps
        },
        methods: {
            ...mapActions('users', {
                getAllUsers: 'getAll'
            }),
            ...mapActions('account', {
                getLoggedUser: 'getCurrent'
            }),
            experienceToNextLevel: function () {
                return experienceToNextLevel(this.account.user.jobLevel)
            },
            onClose: function() {
                this.showWelcome = false
                this.$tours['tuto'].start()
            },
            getImage(path) {
                return path ? require(`../assets/${path}`) : ''
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
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 1;
    }

    .fixed-fab {
        position: fixed;
        right: 0;
        left: 0;
        bottom: 40px;
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