<template>
    <div class="home">
        <!-- Top toolbar -->
        <md-toolbar class="md-accent" md-elevation="0">
            <div class="md-toolbar-section-start">
                <md-button class="md-icon-button">
                    <md-icon>menu</md-icon>
                </md-button>
            </div>

            <div class="md-toolbar-section-end">
                <router-link to="/login">
                    <md-button>Déconnexion</md-button>
                </router-link>
            </div>

        </md-toolbar>

        <!-- App header -->
        <div id="app-header" class="md-layout">

            <!-- TODO: Add UI layout for current player - Avatar, nickname, XP points -->
            <div class="md-layout-item md-alignment-center-center md-medium-size-33 md-small-size-50 md-xsmall-size-100 player-details d-flex">
                <div class="avatar" />
                <div class="md-layout-item player-stats">
                    <div class="d-flex align-items-center">
                        <h3>Hola {{account.user.firstName}}.</h3>
                    </div>
                    <div class="progress-container">
                        <span class="md-body-1">Niveau {{account.user.level}}</span>
                        <md-progress-bar md-mode="determinate" :md-value="20"></md-progress-bar>
                        <span class="small-text">20 / 100</span>
                    </div>
                </div>
            </div>

        </div>

        <!-- Main content (list of tasks) -->
        <div class="md-layout md-gutter">

            <div class="md-layout md-gutter md-medium-size-33 md-small-size-50 md-xsmall-size-100">

                <Tasks />

            </div>

        </div>

        <!-- Add task button -->
        <div class="md-layout md-alignment-bottom-right fixed-fab">

            <router-link to="/task">
                <md-button class="md-fab">
                    <md-icon>add</md-icon>
                </md-button>
            </router-link>

        </div>

        <!-- Navigation bar -->
        <div class="phone-viewport">

            <md-bottom-bar id="bottom-bar" class="md-accent" md-type="shift">
                <md-bottom-bar-item id="bottom-bar-item-home" md-label="Tâches" md-icon="home"></md-bottom-bar-item>
                <md-bottom-bar-item id="bottom-bar-item-pages" md-label="Jeux" md-icon="games"></md-bottom-bar-item>
                <md-bottom-bar-item id="bottom-bar-item-posts" md-label="MLOA" md-icon="whatshot"></md-bottom-bar-item>
                <md-bottom-bar-item id="bottom-bar-item-about" md-label="À propos" md-icon="help"></md-bottom-bar-item>
            </md-bottom-bar>

        </div>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import Tasks from "./Tasks";

    export default {
        name: "HomePage",
        components: { Tasks },
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            })
        },
        created () {
            this.getAllUsers()
        },
        methods: {
            ...mapActions('users', {
                getAllUsers: 'getAll'
            })
        }
    }
</script>

<style scoped>
    #app-header {
        flex-wrap: nowrap;
        position: relative;
        background: #cc4141;
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
        position: sticky;
        right: 0;
        bottom: 56px;
        z-index: 9999;
    }

    .md-layout-item {
        height: 164px;
    }

    .player-details {
        display: block;
        margin: 20px;
        text-align: left;
        white-space: nowrap;
        background-color: #993131;
    }

    .avatar {
        width: 164px;
        -ms-interpolation-mode: nearest-neighbor;
        image-rendering: -moz-crisp-edges;
        image-rendering: pixelated;
        position: relative;
        background-image: url(../assets/avat01.png);
    }

    .player-stats {
        padding-left: 12px;
        padding-right: 24px;
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