<template>
    <div id="choose-action">

        <div id="choose-task">
            <div class="md-headline">
                Choisis une action
            </div>
            <div class="md-caption">
                Tu peux choisir une des activités prédéfinies ou bien décider de créer ta propre tâche à partir d'une décision que tu as prise, par exemple.
            </div>

            <router-link to="/task">
                <md-button class="md-primary md-raised big-width big-height" :md-ripple="false">
                    Créer une tâche
                </md-button>
            </router-link>
        </div>

        <div class="md-layout">

            <div class="md-layout-item md-size-75 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <hr />
            </div>

        </div>

        <!-- TODO: When the user clicks on a suggestion, pass a list of activities in order to display them in the next page (on buttons to add new activities) -->

        <div id="choose-suggestion">
            <div class="md-caption">
                Il s'agit d'une version bêta, ces actions ne sont donc pas encore disponibles mais seront ajoutées et revues pour la version finale.
            </div>

            <div class="md-layout md-alignment-center-center">
                <!--<router-link to="/select">-->
                    <md-button class="md-layout-item md-raised grey-bg big-height" disabled>Travail</md-button>
                <!--</router-link>-->

                <!--<router-link to="/select">-->
                    <md-button class="md-layout-item md-raised grey-bg big-height" disabled>Mobilité</md-button>
                <!--</router-link>-->
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
        name: "ChooseAction"
    }
</script>

<style scoped>
    #choose-action {
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

    .big-width {
        margin: 20px;
        width: 80%;
    }

    .big-height {
        height: 50px;
    }

    .grey-bg {
        background: lightgray !important;
    }

    .md-headline {
        margin-bottom: 20px;
    }

    .md-caption {
        margin-bottom: 30px;
    }

    a {
        width: 50%;
    }

    a > button {
        width: 80%;
    }
</style>