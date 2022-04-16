<template>
  <v-container>
    <page-title-component title="Dashboard" />
    <v-row dense>
      <v-col cols="4">
        <v-card color="deep-purple accent-4" dark>
          <v-card-text>
            <div class="text--white font-weight-bold">Novos usuários</div>
            <p class="text-h4 text--primary">{{ countStudents }}</p>
            <p>Usuários da ultima semana*</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text> Ver </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <!-- TODO: Realizar a dashboard com dados reais vindo da API -->

      <v-col cols="4">
        <v-card color="deep-purple accent-4" dark>
          <v-card-text>
            <div class="text--white font-weight-bold">Mesmo CPF</div>
            <p class="text-h5 text--primary">{{ totalCpf }}</p>
            <div class="text--white font-weight-bold">Mesmo email</div>
            <p class="text-h5 text--primary">{{ totalEmail }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text> Ver </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script src="./script.js">
</script>

<style lang="scss" scoped src="./styles.scss">
</style>
