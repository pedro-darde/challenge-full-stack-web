<template>
  <v-container fluid>
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
                      <v-text-field
                        label="Nome"
                        v-model="filter.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="CPF"
                        v-model="filter.document"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        label="E-mail"
                        v-model="filter.email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col colos="12" sm="2" xs="2" md="2">
        <v-btn
          color="deep-purple accent-4 white--text font-weight-bold"
          class="add-user-btn"
          @click="addStudent"
        >
          <v-icon>mdi-account-plus</v-icon>
          <span> Cadastrar estudante</span>
        </v-btn>
      </v-col>
    </v-row>

    <div class="mt-2">
      <v-data-table
        item-key="id"
        class="elevation-1"
        :items="students"
        :headers="headers"
        :loading="loading"
        :items-per-page="10"
        :options.sync="tableOptions"
        :header-props="{ sortIcon: null }"
        :server-items-length="totalRecords"
        :footer-props="{
          showFirstLastPage: true,
          'items-per-page-text': 'Registros por página',
          'items-per-page-options': [10, 20, 30],
        }"
        loading-text="Carregando resultados, aguarde..."
        no-data-text="Nenhum registro"
        no-results-text="Nenhum registro encontrado"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="deep-purple accent-4 white--text font-weight-bold"
            @click="editStudent(item.id)"
          >
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="error"
            @click="removeStudent(item.id)"
          >
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script src="./script.js">
</script>
<style lang="scss" scoped src="./styles.scss">
</style>