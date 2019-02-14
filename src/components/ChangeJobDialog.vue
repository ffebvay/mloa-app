<template>
    <md-dialog :md-active.sync="jobChange">

        <md-dialog-content>

            <div class="md-layout md-small-size-100 avatar-container">
                <!-- TODO: Update Player avatar logic regarding internal assets & user's choices -->
                <img id="stage-01" class="avatar" alt="player-avatar"/>
                <img id="stage-02" class="avatar" alt="player-avatar"/>
                <img id="stage-03" class="avatar" alt="player-avatar"/>
                <img id="stage-04" class="avatar" alt="player-avatar"/>
                <md-tooltip position="bottom">Paliers de progression</md-tooltip>
            </div>

            <form id="edit-form" class="md-layout md-alignment-center-center" @submit.prevent="handleSubmit">

                <md-field>
                    <label for="job">Domaine d'activité</label>
                    <md-select v-model="account.user.job" name="job" id="job" md-dense>
                        <md-option value="esthetique">Métiers de l'esthétique</md-option>
                        <md-option value="agriculture">Métiers de l'agriculture</md-option>
                        <md-option value="transport">Métiers de transport & maintenance</md-option>
                        <md-option value="restauration">Métiers de bouche</md-option>
                        <md-option value="commerce">Métiers du commerce</md-option>
                        <md-option value="tourisme">Métiers du tourisme</md-option>
                        <md-option value="batiment">Métiers du bâtiment & main d'oeuvre</md-option>
                    </md-select>
                </md-field>

                <div class="md-subheading">
                    Tu as choisi de repartir à zéro dans un nouveau métier.<br /><br />
                </div>
                <div class="md-caption">
                    N'aie pas peur de faire un mauvais choix, cette action n'écrasera pas ta progression dans ton métier actuel.<br />
                    Il te sera possible à tout moment de modifier ton choix dans ton profil et de retrouver la progression que tu avais dans n'importe quel métier que tu as pu exercer !
                </div>

                <md-dialog-actions>

                    <md-button type="submit" class="md-primary" @click.native="jobChange = false">Sauvegarder</md-button>
                    <md-button class="md-primary" @click.native="jobChange = false">Annuler</md-button>

                </md-dialog-actions>

            </form>

        </md-dialog-content>

    </md-dialog>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import mergeImages from 'merge-images'

    export default {
        name: "ChangeJobDialog",
        data () {
            return {
                user: {},
                currentJob: '',
                submitted: false,
                stageList1: [],
                stageList2: [],
                stageList3: [],
                stageList4: []
            }
        },
        props: ['visible'],
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            }),
            jobChange: {
                get() {
                    return this.visible
                },
                set(value) {
                    if (!value) {
                        this.$emit('close')
                    }
                }
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
            this.currentJob = this.account.user.job
        },
        beforeUpdate () {
            // Display Job Costumes by merging several sprites
            this.pushSprites(this.stageList1)
            this.pushSprites(this.stageList2)
            this.pushSprites(this.stageList3)
            this.pushSprites(this.stageList4)

            // Add Job stages
            if (this.account.user.job !== 'sans') {
                this.stageList1.push(require('@/assets/' + this.account.user.genre + '.' + this.userJob + '.01.png'))
                this.stageList2.push(require('@/assets/' + this.account.user.genre + '.' + this.userJob + '.02.png'))
                this.stageList3.push(require('@/assets/' + this.account.user.genre + '.' + this.userJob + '.03.png'))
                this.stageList4.push(require('@/assets/' + this.account.user.genre + '.' + this.userJob + '.04.png'))
            }

            if (this.stageList1.length !== 0) {
                mergeImages(this.stageList1)
                    .then(b64 => document.querySelector('#stage-01').src = b64)
            }

            if (this.stageList2.length !== 0) {
                mergeImages(this.stageList2)
                    .then(b64 => document.querySelector('#stage-02').src = b64)
            }

            if (this.stageList3.length !== 0) {
                mergeImages(this.stageList3)
                    .then(b64 => document.querySelector('#stage-03').src = b64)
            }

            if (this.stageList4.length !== 0) {
                mergeImages(this.stageList4)
                    .then(b64 => document.querySelector('#stage-04').src = b64)
            }
        },
        updated () {
            this.stageList1 = []
            this.stageList2 = []
            this.stageList3 = []
            this.stageList4 = []
        },
        methods: {
            ...mapActions('account', ['updateUser']),
            pushSprites: function(array) {
                // reset avatar picture
                if (array.length !== 0) array = []

                // Add base sprites to the internal array
                array.push(require('@/assets/' + this.skinColorPath + '.png'))
                array.push(require('@/assets/' + this.hairColorPath + '.png'))
                array.push(require('@/assets/' + this.clothesPath + '.png'))
            },
            changeJob: function(user) {
                const playerJob = this.currentJob
                let newUser = user
                let savedState = {}

                // Check if selected item is equal to current job
                // then stop everything
                if (newUser.job === playerJob) {
                    return newUser
                }

                // Check foreach item in history if selected job exists in history
                let oldJob = newUser.history.find(item => {
                    return newUser.job === item.job
                })

                if (oldJob)  {
                    // IN EVERY CASE: Store current stats in history
                    savedState = {
                        job: playerJob,
                        jobLevel: newUser.jobLevel,
                        exp: newUser.currentExp,
                        stage: newUser.stage
                    }

                    // Check if currentJob exists in History
                    let found = newUser.history.findIndex(function(el) {
                        return el.job === playerJob
                    })

                    if (found === -1) {
                        newUser.history.push(savedState)
                    }
                    else {
                        newUser.history[found].jobLevel = newUser.jobLevel
                        newUser.history[found].exp = newUser.currentExp
                        newUser.history[found].stage = newUser.stage
                    }

                    // User has stats in selected job, give him the old stats
                    newUser.job = oldJob.job
                    newUser.jobLevel = oldJob.jobLevel
                    newUser.currentExp = oldJob.exp
                    newUser.stage = oldJob.stage
                }
                else {
                    // IN EVERY CASE: Store current stats in history
                    savedState = {
                        job: playerJob,
                        jobLevel: newUser.jobLevel,
                        exp: newUser.currentExp,
                        stage: newUser.stage
                    }

                    // Check if currentJob exists in History
                    let found = newUser.history.findIndex(function(el) {
                        return el.job === playerJob
                    })

                    if (found !== -1) {
                        newUser.history[found].jobLevel = newUser.jobLevel
                        newUser.history[found].exp = newUser.currentExp
                        newUser.history[found].stage = newUser.stage
                    }
                    else {
                        newUser.history.push(savedState)
                    }

                    // User took this job for the first time, give him defautl stats
                    newUser.jobLevel = 2
                    newUser.currentExp = 50
                    newUser.stage = 1
                }

                return newUser
            },
            handleSubmit(e) {
                this.submitted = true
                this.$validator.validate().then(valid => {
                    if (valid) {
                        let newUser = this.changeJob(this.account.user)

                        console.log('New user : ', newUser)

                        this.updateUser(newUser)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .avatar-container {
        background: lightslategray;
        margin-bottom: 20px;
    }

    .avatar-container > img {
        width: 25%;
        height: 200px;
        margin-left: auto;
        margin-right: auto;
    }

    .md-dialog-actions {
        padding: 0;
    }

    .md-caption {
        margin-bottom: 48px;
    }
</style>