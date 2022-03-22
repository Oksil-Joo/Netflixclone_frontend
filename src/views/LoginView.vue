<template>
  <section class="container">
    <div class="jumbotron">
        <h1>Welcome to Flashblack!</h1>
        <p class="lead">
        Before revisiting your favourite movies, tv shows or music from yesteryear, please log in with a valid username and password.
        </p>
    </div>
    
   <h2 class="login-flash" v-if="signup">{{ flash }}</h2>
    <h2 class="login-flash" v-if="errors">{{ flash }}</h2>

    <section class="log-in">
      <label class="sr-only" for="inlineFormInputName">Name</label>
      <input v-bind="username" type="text" class="form-control" id="inlineFormInputName" placeholder="username" required>

      <label class="sr-only" for="inlineFormPassword">Name</label>
      <input v-bind="password" type="password" class="form-control" id="inlineFormPassword" placeholder="password" required>
    </section>
    <button
        v-if="signup"
        type="submit" 
        class="btn btn-primary login-submit"
        @click="trySignUp"
      >Sign up!
    </button>
    <button
        type="submit" 
        class="btn btn-primary login-submit"
        @click="tryLogin"
      >Go!
    </button>


  </section>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'TheLogin',

  data() {
    return {
      username: '',
      password: '',
      url: 'users/getone',
      flash: '',
      signup: false,
      errors: false
    }
  },

  methods: {
    tryLogin() {
      this.url = 'users/getone';
      this.login();
    },
    trySignUp() {
      this.url = 'users/signup';
      this.login();
    },

    goToUsers(time, vm) {
      setTimeout(function(){
        vm.$emit('setauth', true);
        vm.$router.push({ name: 'UserSelect'});
      }, time);
    },
    //and use the route to show the next view
    //TODO => should happen on successful login -> this needs to move the fetch call
    login() {
      // this.$router.push({ name: 'UserSelect' })
      // mock up the login functionality => formData is a virtual <form> element's data
      let formData = { username: this.username, password: this.password };

      //pass the form data to our login API
      let url = this.url;

      fetch(url, {
        method: 'POST',
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(data => {
          //this is the result from the /users/getone route handler
          console.table(data);

          switch (data.action) {
            // user isn't in the database
            case 'add':
              this.signup = true;
              this.username = '';
              this.password = '';
              this.flash = 'Hmmm... your username does not exist, try signup';
              break;

              case 'added':
                this.flash = 'Added you to Roku Flashback! Enjoy!   ... redirecting ....';
                this.goToUsers(2500, this);
                break;
// wrong password
              case 'retry':
                document.querySelector(`input[type=${data.field}]`).classList.add('error');
                this.errors = true;
                this.flash = 'Your login info is not correct. please retry';
                break;

              default:
                this.$router.push({ name: 'UserSeclect'});
          }
          // this.$router.push({ name: 'UserSelect' })
          })
      .catch(err => console.error(err));
      
      //mock up the login functionality
      //and use the route to show the neext view
      
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/sass/login.scss";
</style>