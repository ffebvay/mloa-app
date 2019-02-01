<template>
    <div class="social-feed">

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

        <!-- TODO: Add MLOA Facebook/ Twitter/ Instagram feed -->
        <div class="facebook-feed">
            <div class="md-layout">

                <div class="md-layout-item md-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                    <span class="md-headline md-layout md-alignment-center-center">Quoi de neuf ?</span>
                </div>

                <div class="md-layout-item md-size-75 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                    <hr />
                </div>

                <!-- TODO: Make request to Facebook Developers to be able to use GraphAPI and fetch MLOA's page -->

                <md-empty-state
                    md-icon="work_off"
                    md-label="Page en développement"
                    md-description="En raison de difficultés techniques, nous ne pouvons afficher de contenu dans cette section pour le moment.">

                </md-empty-state>

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
        name: "SocialFeed"
    }
</script>

<style scoped>
    .social-feed {
        height: 100%;
        overflow-x: hidden;
    }

    .facebook-feed {
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