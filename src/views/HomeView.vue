<template>
  <div class="home">
    <h1>Welcome to home mfck</h1>

    <hr>
    <div class="main_container">
      <div class="not_logged_in_holder" v-if="!logged_in">
        <v-btn @click="go_to_login()">
          Войти в аккаунт
        </v-btn>
      </div>
      
      <div class="logged_in_holder" v-else>
        <h2>Your profile</h2>
        <br>

        <div>
          <img :src="user_data.avatar">
        </div>
        <div>
          <h3 class="name">{{ user_data.name }}</h3>
          <p class="login">@{{ user_data.login }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
  },
  data(){
    return {
      logged_in: false,
      user_data: {}
    }
  },
  methods: {
    go_to_login(){
      this.$router.push("/login");
    }
  },
  mounted(){
    this.axios({
        method: 'get',
        url: `https://65beac79dcfcce42a6f2d0e6.mockapi.io/social/api/users`
    }).then((response) => {
        console.log(response);
        let found = false;

        response.data.forEach(us => {
          if(us.token == this.$cookies.get("token")){
            found = true;
            this.user_data["name"] = this.$cookies.get("name");
            this.user_data["login"] = this.$cookies.get("login");
            this.user_data["avatar"] = this.$cookies.get("avatar");
          }
        });
        
        if(found) this.logged_in = true;
    }) // доделать поле со списком карточек друзей + страница просмотра профиля человека + скачать виртуалку
  }
}
</script>
<style>
.login{
  margin-top: 0.5vw;
}
</style>