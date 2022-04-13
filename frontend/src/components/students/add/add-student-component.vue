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

        <v-col cols="12" md="6">
          <v-text-field
            label="E-mail"
            required
            v-model="student.email"
            :rules="emailRules"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="s"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="student.birth_date_formatted"
                label="Data de nascimento"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="student.birth_date"
              no-title
              scrollable
              locale="pt-BR"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancelar
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(student.birth_date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="RA"
            required
            v-model="student.ra"
            :rules="raRules"
          />
        </v-col>
        <v-col cols="12" md="6">
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
        color="primary"
        :loading="loading"
      >
        Criar
      </v-btn>
      <v-btn color="secondary" @click="goBack"> Voltar </v-btn>
    </v-container>
  </v-form>
</template>

<script src="./script.js">
</script>
<style lang="scss" scoped src="./styles.scss"></style>