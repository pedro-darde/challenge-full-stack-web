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
          <v-text-field
            label="RA"
            required
            v-model="student.ra"
            :rules="raRules"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="CPF"
            :rules="documentRules"
            required
            v-model="student.document"
            v-mask="'###.###.###-##'"
          />
        </v-col>
      </v-row>
      <v-btn
        class="mr-4"
        type="submit"
        :disabled="!canCreate"
        color="deep-purple accent-4 white--text font-weight-bold"
        :loading="loading"
      >
        Criar
      </v-btn>
      <v-btn color="secondary font-weight-bold" @click="goBack"> Voltar </v-btn>
    </v-container>
  </v-form>
</template>

<script src="./script.js">
</script>
<style lang="scss" scoped src="./styles.scss"></style>