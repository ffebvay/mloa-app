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
                <router-link to="/login">
                    <md-button class="md-icon-button">
                        <md-icon>power_settings_new</md-icon>
                    </md-button>
                </router-link>
            </div>

        </md-toolbar>

        <md-tabs md-alignment="fixed" class="md-transparent" md-dynamic-height>

            <md-tab id="user-profile" md-label="Mon profil">

                <div class="form-container">

                    <div class="md-layout-item">

                        <form id="profile-form" class="md-layout md-alignment-center-center" @submit.prevent="handleSubmit">

                            <md-card class="md-layout-item md-gutter md-size-50 md-small-size-100">

                                <md-card-header>
                                    <div class="md-title">Mon profil</div>

                                    <!--<div id="stage-bar">
                                        <div id="stage-progress">
                                            <img alt="progress" src="@/assets/bonus/COIN.02.png" />
                                            <div id="stage-text">Niveau 5</div>
                                        </div>
                                    </div>-->

                                </md-card-header>

                                <md-card-content>
                                    <div>

                                        <div class="md-layout-item md-small-size-100 avatar">
                                            <!-- TODO: Update Player avatar logic regarding internal assets & user's choices -->
                                            <img id="avatar" alt="player-avatar"/>
                                        </div>

                                        <div v-show="(account.user.flags.canChangeJob || account.user.flags.canChangeJob === true)">
                                            <md-button class="md-raised md-accent md-dense change-job" @click.native="showJobChange = true">Changer de métier</md-button>
                                        </div>

                                    </div>

                                    <div class="md-layout md-gutter">

                                        <div class="md-layout-item md-small-size-100">
                                            <md-field>
                                                <label for="username">Nom d'utilisateur</label>
                                                <md-input name="username" id="username" v-model="account.user.username"></md-input>
                                            </md-field>
                                        </div>

                                    </div>

                                    <div class="md-layout md-gutter">

                                        <div class="md-layout-item md-small-size-100">
                                            <md-field>
                                                <label for="gender">Genre</label>
                                                <md-select v-model="account.user.genre" name="gender" id="gender" md-dense>
                                                    <md-option value="MAN">Masculin</md-option>
                                                    <md-option value="WOM">Féminin</md-option>
                                                </md-select>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-small-size-100">
                                            <md-field>
                                                <label for="skin">Couleur de peau</label>
                                                <md-select v-model="account.user.skinColor" name="skin" id="skin" md-dense>
                                                    <md-option value="PEACH">Pêche</md-option>
                                                    <md-option value="COFFEE">Café</md-option>
                                                    <md-option value="CHOCOLATE">Chocolat</md-option>
                                                </md-select>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-small-size-100">
                                            <md-field>
                                                <label for="color">Couleur des cheveux</label>
                                                <md-select v-model="account.user.hairColor" name="color" id="color" md-dense>
                                                    <md-option value="BLOND">Blond</md-option>
                                                    <md-option value="BROWN">Brun</md-option>
                                                </md-select>
                                            </md-field>
                                        </div>

                                    </div>

                                    <div class="md-layout md-gutter md-alignment-center-center">

                                        <md-button>
                                            <router-link to="/">
                                                Retour
                                            </router-link>
                                        </md-button>

                                    </div>
                                </md-card-content>

                            </md-card>

                        </form>

                    </div>

                </div>

            </md-tab>

            <md-tab id="mloa-info" md-label="Informations MLOA">

                <div class="form-container">

                    <div class="md-layout-item">

                        <form id="mloa-form" class="md-layout md-alignment-center-center" @submit.prevent="handleSubmit">

                            <md-card class="md-layout-item md-gutter md-size-50 md-small-size-100">

                                <md-card-header>
                                    <div class="md-title">Informations CIP</div>
                                </md-card-header>

                                <md-card-content v-if="account.user.info">

                                    <md-content class="md-layout md-gutter md-subhead md-alignment-center-center">
                                        Si tu le souhaites, tu peux stocker ici les informations de ton conseiller à la MLOA.
                                    </md-content>

                                    <div class="md-layout md-gutter">

                                        <div class="md-layout-item md-small-size-100">
                                            <md-field>
                                                <label for="advisor-firstname">Prénom</label>
                                                <md-input name="advisor-firstname" id="advisor-firstname" v-model="account.user.info.advisorFirstName"></md-input>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-small-size-100">
                                            <md-field>
                                                <label for="advisor-lastname">Nom</label>
                                                <md-input name="advisor-lastname" id="advisor-lastname" v-model="account.user.info.advisorLastName"></md-input>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-small-size-100">
                                            <md-field>
                                                <label for="advisor-email">Adresse e-mail</label>
                                                <md-input name="advisor-email" id="advisor-email" v-model="account.user.info.advisorEmail"></md-input>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-small-size-100">
                                            <md-field>
                                                <label for="advisor-phone">Numéro de téléphone</label>
                                                <span class="md-prefix">+33</span>
                                                <md-input name="advisor-phone" id="advisor-phone" v-model="account.user.info.advisorPhone"></md-input>
                                            </md-field>
                                        </div>

                                    </div>

                                    <div class="md-layout md-gutter md-alignment-center-center">

                                        <md-button>
                                            <router-link to="/">
                                                Retour
                                            </router-link>
                                        </md-button>

                                    </div>
                                </md-card-content>

                            </md-card>

                        </form>

                    </div>

                </div>

            </md-tab>

        </md-tabs>

        <!-- Validate creation button -->
        <div class="md-layout md-alignment-bottom-right fixed-fab" v-if="!showJobChange">

            <md-button class="md-fab" form="profile-form" type="submit">
                <md-icon>save</md-icon>
            </md-button>

        </div>

        <ChangeJobDialog :visible="showJobChange" @close="onChangeJobDialogClose" />

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import mergeImages from 'merge-images'
    import ChangeJobDialog from "./ChangeJobDialog";

    export default {
        name: "UserProfile",
        components: {ChangeJobDialog},
        data () {
            return {
                showJobChange: false,
                avatarList: []
            }
        },
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            }),
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
            },
            computedStage: function() {
                return (this.account.user.stage / 4) * 100
            }
        },
        created () {
            // Display player's avatar by merging several sprites
            this.pushSprites()

            if (this.avatarList.length != 0) {
                mergeImages(this.avatarList)
                    .then(b64 => document.querySelector('#avatar').src = b64)
            }
        },
        beforeUpdate() {
            // Display player's avatar by merging several sprites
            this.pushSprites()

            if (this.avatarList.length != 0) {
                mergeImages(this.avatarList)
                    .then(b64 => document.querySelector('#avatar').src = b64)
            }
        },
        methods: {
            ...mapActions('account', ['updateUser']),
            updateProfile: function(user) {
                let newUser = user

                newUser.updatedAt = Date.now()

                return newUser
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
            handleSubmit(e) {
                this.submitted = true
                this.$validator.validate().then(valid => {
                    if (valid) {
                        let newUser = this.updateProfile(this.account.user)

                        this.updateUser(newUser)
                    }
                })
            },
            onChangeJobDialogClose: function() {
                this.showJobChange = false
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

    .avatar {
        background: lightslategray;
        margin-bottom: 20px;
    }

    .avatar > img {
        display: block;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
        /*-ms-interpolation-mode: nearest-neighbor;
        image-rendering: -moz-crisp-edges;
        image-rendering: pixelated;*/
        position: relative;
    }

    .change-job {
        margin-bottom: 30px;
    }

    /*#stage-bar {
        width: 100%;
        margin-top: 36px;
        height: 10px;
        text-align: end;
        background: goldenrod;
    }

    #stage-progress {
        width: 25%;
        height: 10px;
        background: gold;
    }

    #stage-progress > img {
        margin-top: 14px;
        transform: translate(12px, -48px);
        width: 30%;
        height: auto;
    }

    #stage-text {
        text-align: center;
        transform: translate(30px);
    }*/

    div > form {
        margin: 24px;
    }

    .md-subhead {
        margin-bottom: 24px;
    }
</style>