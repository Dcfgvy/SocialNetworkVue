<template>
    <div class="d-flex justify-center">
        <v-card width="600px" class="mt-12 pa-10">
            <v-card-title>
                Войдите в аккаунт
            </v-card-title>

            <v-text-field
                label="Введите логин"
                v-model="login"
                outlined
            ></v-text-field>

            <v-text-field
                label="Введите пароль"
                v-model="password"
                outlined
            ></v-text-field>

            <v-btn @click="authenticate">
                Войти
            </v-btn>
        </v-card>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
        login: "",
        password: "",
    }
  },
  methods: {
    authenticate(){
        this.axios({
            method: 'get',
            url: `https://65beac79dcfcce42a6f2d0e6.mockapi.io/social/api/users`
        }).then((response) => {
            console.log(response);
            let found = false;

            response.data.forEach(us => {
                if(us.login == this.login && us.password == this.password){
                    (this.$cookies.keys()).forEach(key => {
                        this.$cookies.remove(key);
                    })

                    this.$cookies.set("token", us.token);
                    this.$cookies.set("name", us.name);
                    this.$cookies.set("login", us.login);
                    this.$cookies.set("avatar", us.avatar);
                    found = true;
                }
            });
            
            if(!found) window.alert("User not found!");
            else{
                this.$router.push("/");
            }
        })
    }
  }
}
</script>
