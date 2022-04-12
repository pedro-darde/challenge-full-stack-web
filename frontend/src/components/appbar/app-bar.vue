<template>
  <div>
    <v-app-bar color="deep-purple accent-4">
      <div class="d-flex">
        <v-img
          alt="Logo"
          contain
          src="@/assets/images/maisa.png"
          transition="scale-transition"
          width="50"
        />
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
      </div>
      <v-toolbar-title class="font-white bold"> Módulo Acadêmico </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      disable-resize-watcher="false"
      :hide-overlay="true"
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
          v-for="link in links"
          :key="link.title"
        >
          <v-list-item link :to="link.to">
            <v-icon class="mr-2"> {{ link.icon }}</v-icon>

            {{ link.title }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script src="./script.js"></script>
<style lang="scss" scoped src="./styles.scss"></style>