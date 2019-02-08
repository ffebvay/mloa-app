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
                    <md-button class="md-icon-button">
                        <md-icon>power_settings_new</md-icon>
                    </md-button>
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

                                <div class="md-layout-item md-small-size-100 avatar">
                                    <!--<img :src="getImage(userAvatar)" alt="avatar-selection" />-->
                                    <!-- TODO: Update Player avatar logic regarding internal assets & user's choices -->
                                    <img id="avatar" alt="player-avatar"/>
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
                                        <label for="color">Couleur de peau</label>
                                        <md-select v-model="account.user.skinColor" name="color" id="color" md-dense>
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

                            <!-- <div class="md-layout md-gutter">

                                <div class="md-layout-item md-small-size-100">
                                    <md-button class="md-icon-button centered" @click="updateAvatar(true)">
                                        <md-icon class="md-size-2x">arrow_left</md-icon>
                                    </md-button>

                                    <md-button class="md-icon-button centered" @click="updateAvatar(false)">
                                        <md-icon class="md-size-2x">arrow_right</md-icon>
                                    </md-button>
                                </div>

                            </div> -->

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
    import mergeImages from 'merge-images'

    export default {
        name: "UserProfile",
        data () {
            return {
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
            }
        },
        created () {
            console.log(this.account.user)

            // Display player's avatar by merging several sprites
            this.pushSprites()

            if (this.avatarList.length != 0) {
                mergeImages(this.avatarList)
                    .then(b64 => document.querySelector('img').src = b64)
            }
        },
        beforeUpdate() {
            // Display player's avatar by merging several sprites
            this.pushSprites()

            if (this.avatarList.length != 0) {
                mergeImages(this.avatarList)
                    .then(b64 => document.querySelector('img').src = b64)
            }

            console.log(this.account.user)
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

                        console.log('User Profile edited : ', newUser)

                        this.updateUser(newUser)
                    }
                })
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

    .avatar {
        background: lightslategray;
        margin: 48px;
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

    div > form {
        margin: 24px;
    }
</style>