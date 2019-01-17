<template>
    <div class="about">

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

        <!-- TODO: Add About page giving details about the application -->
        <div class="main-content">
            <div class="md-layout">

                <div class="md-layout-item md-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                    <span class="md-headline md-layout md-alignment-center-center">Divers</span>
                </div>

                <div class="md-layout-item md-size-75 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                    <hr />
                </div>

            </div>
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
    export default {
        name: "About"
    }
</script>

<style scoped>
    .about {
        height: 100%;
        overflow-x: hidden;
    }

    .main-content {
        padding-top: 25px;
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
</style>