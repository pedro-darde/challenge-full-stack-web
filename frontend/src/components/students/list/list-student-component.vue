<template>
  <container fluid>
    <v-row>
      <v-col cols="12" sm="10" xs="10" md="10">
        <v-expansion-panels v-model="panel">
          <v-expansion-panel>
            <v-expansion-panel-header> Filtro </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field label="Nome" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="CPF" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="E-mail" required></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col colos="12" sm="2" xs="2" md="2">
        <v-btn color="primary" class="add-user-btn" @click="addStudent">
          <v-icon>mdi-account-plus</v-icon>
          <span> Cadastrar aluno</span>
        </v-btn>
      </v-col>
    </v-row>
  </container>
</template>

<script src="./script.js">
</script>
<style lang="scss" scoped src="./styles.scss">
</style>