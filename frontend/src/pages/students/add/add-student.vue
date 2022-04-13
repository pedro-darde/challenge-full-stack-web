<template>
  <v-container>
    <page-title-component title="Adicionar estudante" />
    <add-student-component @userCreated="userCreated" />
  </v-container>
</template>

<script src="./script.js">
</script>
<style lang="scss" scoped src="./styles.scss">
</style>