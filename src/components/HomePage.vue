<template>
    <div class="home">
        <!-- Top toolbar -->
        <md-toolbar class="md-accent" md-elevation="1">
            <h2 class="md-title">Hola {{account.user.firstName}}.</h2>

            <div class="md-toolbar-section-end">
                <router-link to="/login">
                    <md-button>Déconnexion</md-button>
                </router-link>
            </div>

        </md-toolbar>

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
        position: sticky;
        right: 0;
        bottom: 56px;
        z-index: 9999;
    }
</style>