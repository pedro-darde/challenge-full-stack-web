<template>
  <v-form :valid="valid" ref="form" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Nome"
            required
            v-model="student.name"
            :rules="nameRules"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field label="Sobrenome" v-model="student.last_name" />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="E-mail"
            required
            v-model="student.email"
            :rules="emailRules"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field label="RA" :disabled="true" v-model="student.ra" />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="CPF"
            :disabled="true"
            v-model="student.document"
            v-mask="'###.###.###-##'"
          />
        </v-col>
      </v-row>
      <v-btn
        class="mr-4"
        type="submit"
        :disabled="!canCreate"
        color="primary"
        :loading="loading"
      >
        Salvar
      </v-btn>
      <v-btn color="secondary" @click="goBack"> Voltar </v-btn>
    </v-container>
  </v-form>
</template>

<script src="./script.js">
</script>
<style lang="scss" scoped src="./styles.scss"></style>