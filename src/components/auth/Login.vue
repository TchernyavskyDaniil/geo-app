<template>
	<div class="login container">
    <form class="card-panel" @submit.prevent="login">
      <h2 class="center deep-purple-text login-title">
        Login
      </h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" v-model="password">
      </div>
      <p v-if="feedback" class="red-text center">
        {{feedback}}
      </p>
      <div class="field btn-field">
        <button class="btn deep-purple">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase'
  
  export default {
    name: "Login",
    data() {
      return {
        email: null,
        password: null,
        feedback: null
      }
    },
    methods: {
      login() {
        if (this.email && this.password) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
              this.$router.push({name : 'GoogleMap'})
            }).catch(err => this.feedback = err.message)
          this.feedback = null
        } else {
          this.feedback = 'Please fill all fields'
        }
      }
    }
  }
</script>

<style>
  .login {
    max-width: 400px;
    margin-top: 60px;
  }
  
  .login-title {
    font-size: 2.4em;
  }
  
  .login .field {
    margin-bottom: 16px;
  }
  
  .btn-field {
    text-align: center;
  }
</style>
