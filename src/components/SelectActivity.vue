<template>
    <div id="select-activity">
        <div id="banner">
            <img alt="activity-banner"/>
        </div>

        <div class="md-layout">

            <div class="md-layout-item md-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <span class="md-headline md-layout md-alignment-center-center">Nom d'activité</span>
            </div>

            <div class="md-layout-item md-size-75 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <hr />
            </div>

        </div>

        <div id="activity-tasks">

            <!-- TODO: Bruh -->

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
    import mergeImages from 'merge-images'

    export default {
        name: "SelectActivity"
    }
</script>

<style scoped>
    #select-activity {
        height: 100%;
        overflow-x: hidden;
    }

    #banner {
        max-height: 200px;
        margin-bottom: 20px;
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