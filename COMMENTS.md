# GrupoA Educação
# Arquitetura
- Para criar a arquitetura do front tentei me inspirar no meu curto tempo de experiência com Vue/Vuetify, tentei seguir a mesma estrutura dos projetos que eu já fiz em ReactJS
- Já no backend segui uma estrutura padrão MVC (Model, View, Controller), não quis fazer nada muito abstrato, tentei seguir um padrão bem claro e declarativo

# Bibliotecas Front
- [axios](https://github.com/axios/axios) - HTTP
- [v-mask](https://www.npmjs.com/package/v-mask) - Lib para máscaras, usei para "mascarar" o CPF
- [vue-router](https://router.vuejs.org/) - Rotas
- [sweetalert2](https://sweetalert2.github.io/) - Toasts de sucesso e mensagens de erro
- [moment](https://momentjs.com/) - Formatação de datas

# Bibliotecas Back
- [class-validator](https://github.com/typestack/class-validator) - Validação dos campos de classes
- [typeorm](https://typeorm.io/) - ORM
- [cors](https://www.npmjs.com/package/cors) - Ativar CORS para o express

# Pontos a melhorar
 - Colocar a tratamento de exception no front em um único ponto da aplicação
 - Tela de login com autenticação na API
 - Criação de testes unitários para o back
 - Explorar um pouco mais de mixins e filters do vue
 - Usar mais o SCSS

# Documentação Arquitetura
- Vá ate backend/swagger.yml
- Acesse https://editor.swagger.io/ e cole o conteúdo do arquivo


## Como rodar
### Dentro das pastas backend e frontend coloquei um arquivo que explica separadamente como rodar cada uma das camadas