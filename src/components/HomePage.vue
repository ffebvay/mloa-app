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
                    <!-- <img :src="getImage(avatarPath)" alt="player-avatar" /> -->

                    <!-- TODO: Update Player avatar logic regarding internal assets & user's choices -->
                    <img id="avatar" alt="player-avatar"/>
                    <md-tooltip md-direction="bottom">Avatar</md-tooltip>
                </div>

                <div class="md-layout-item">
                    <div class="d-flex align-items-center">
                        <h3>Bonjour {{account.user.username}} !</h3>
                    </div>
                    <div class="progress-container">
                        <span v-if="account.user.job !== 'sans'" class="md-body-1">Métier : {{displayJob}}</span>
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
        <div v-if="(!showWelcome && !showEdit && !showJobSelect)" class="md-layout md-alignment-center-center fixed-fab v-step-4 v-step-6">

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

        <!-- Ephemeral layouts (tutorial, welcome and job selection -->
        <WelcomeDialog :visible="showWelcome" @close="onWelcomeDialogClose" />

        <JobDialog :visible="showJobSelect" @close="onJobDialogClose" />

        <v-tour name="tuto" :steps="steps"></v-tour>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import Tasks from "./Tasks"
    import WelcomeDialog from "./WelcomeDialog"
    import { experienceToNextLevel } from '../_helpers'
    import mergeImages from 'merge-images'
    import JobDialog from "./JobDialog";

    export default {
        name: "HomePage",
        components: { JobDialog, WelcomeDialog, Tasks },
        data () {
            return {
                showWelcome: false,
                showJobSelect: false,
                showEdit: false, // used to hide the Fixed "+" button when the Edit Dialog opens
                steps: [
                    {
                        target: '.v-step-1',
                        content: `Découvre la <strong>MLOApp</strong> !`
                    },
                    {
                        target: '.v-step-2',
                        content: 'La partie haute est consacrée à ton évolution. Tu peux y trouver ton avatar et suivre ta progression.'
                    },
                    {
                        target: '.v-step-3',
                        content: 'Cette partie affiche des informations sur ton personnage : le niveau de ton métier, l\'expérience acquise au fil du temps et le nombre de tâches que tu auras accomplies !'
                    },
                    {
                        target: '.v-step-4',
                        content: 'Ce bouton te permet d\'ajouter une tâche à ta liste de choses à faire.',
                        params: {
                            placement: 'top'
                        }
                    },
                    {
                        target: '.v-step-5',
                        content: 'Chaque tâche que tu crées s\'ajoute ici, et celles que tu complètes en les cochant apparaîtront dans la partie "Déjà accomplies".',
                        params: {
                            placement: 'top'
                        }
                    },
                    {
                        target: '.v-step-6',
                        content: 'Enfin, ce menu te permettra de naviguer entre les différentes pages de l\'application pour te renseigner sur ta Mission Locale préférée !',
                        params: {
                            placement: 'top'
                        }
                    }
                ],
                avatarList: [] // useful for merging sprites
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
            userJob: function() {
                switch(this.account.user.job) {
                    case 'esthetique':
                        return 'EST'
                        break
                    case 'agriculture':
                        return 'AGR'
                        break
                    case 'transport':
                        return 'TRS'
                        break
                    case 'restauration':
                        return 'BOU'
                        break
                    case 'commerce':
                        return 'COM'
                        break
                    case 'tourisme':
                        return 'TOU'
                        break
                    case 'batiment':
                        return 'BAT'
                        break
                    default:
                        return 'COM'
                        break
                }
            },
            displayJob: function() {
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
            },
            userStage: function() {
                switch(this.account.user.stage) {
                    case 1:
                        return '01'
                        break
                    case 2:
                        return '02'
                        break
                    case 3:
                        return '03'
                        break
                    case 4:
                        return '04'
                        break
                    default:
                        return '01'
                        break
                }
            },
            skinColorPath: function() {
                return this.account.user.genre + '.SKIN.' + this.account.user.skinColor
            },
            hairColorPath: function() {
                return this.account.user.genre + '.HAIR01.' + this.account.user.hairColor
            },
            clothesPath: function() {
                return this.account.user.genre + '.CLOTHES01'
            }
        },
        created () {
            console.log(this.account)

            // Display modal dialog on first connection and edit "user.flags.welcomed" value to "true"
            if (this.account.user.flags.welcomed === false) {
                this.showWelcome = true
            }

            // Display player's avatar by merging several sprites
            this.pushSprites()

            if (this.avatarList.length != 0) {
                mergeImages(this.avatarList)
                    .then(b64 => document.querySelector('img').src = b64)
            }
        },
        beforeUpdate () {
            // Display Job Selection dialog when the user reaches Level 2
            if (this.account.user.jobLevel === 2 && this.account.user.job === 'sans') {
                this.showJobSelect = true
            }

            // Display player's avatar by merging several sprites
            this.pushSprites()

            if (this.avatarList.length != 0) {
                mergeImages(this.avatarList)
                    .then(b64 => document.querySelector('img').src = b64)
            }
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
            pushSprites: function() {
                // reset avatar picture
                if (this.avatarList.length != 0) this.avatarList = []

                // Add base sprites to the internal array
                this.avatarList.push(require('@/assets/' + this.skinColorPath + '.png'))
                this.avatarList.push(require('@/assets/' + this.hairColorPath + '.png'))
                this.avatarList.push(require('@/assets/' + this.clothesPath + '.png'))

                if (this.account.user.job !== 'sans') {
                    this.avatarList.push(require('@/assets/' + this.account.user.genre + '.' + this.userJob + '.' + this.userStage + '.png'))
                }
            },
            onWelcomeDialogClose: function() {
                this.showWelcome = false

                // Start tutorial once the user was welcomed
                this.$tours['tuto'].start()
            },
            onJobDialogClose: function() {
                this.showJobSelect = false
            }/*,
            getImage(path) {
                return path ? require('@/assets/' + path) : ''
            }*/
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

    .avatar {
        background: lightslategray;
    }

    .avatar > img{
        display: block;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
        /*-ms-interpolation-mode: nearest-neighbor;
        image-rendering: -moz-crisp-edges;
        image-rendering: pixelated;*/
        position: relative;
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

    h3 {
        margin-bottom: 24px;
    }
</style>