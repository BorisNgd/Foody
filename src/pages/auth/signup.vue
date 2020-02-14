<template>
  <f7-page name="signup">
    <f7-navbar title="Création de compte" back-link="Back"></f7-navbar>

    <div class="wrapper">
      <img class="image--cover" :src="profile_image" @click="launchFilePicker" alt="profile_image" />
    </div>

    <f7-list no-airlines-md>
      <f7-list-input
        outline
        floating-label
        :value="name"
        @input="name=$event.target.value"
        label="Name"
        type="text"
        place-holder="Votre Nom"
        clear-button
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        :value="email"
        @input="email=$event.target.value"
        label="Email"
        type="email"
        place-holder="Votre E-mail"
        clear-button
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        :value="password"
        @input="password=$event.target.value"
        label="Password"
        type="password"
        place-holder="Votre mot de passe"
        clear-button
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        :value="c_password"
        @input="c_password=$event.target.value"
        label="Confirm Password"
        type="password"
        place-holder="Confirmez votre mot de passe"
        clear-button
      ></f7-list-input>
    </f7-list>

    <f7-block>
      <f7-button @click="signUp" class="button button-fill button-raised" outline>SIGN UP</f7-button>
      <input type="file" ref="file" style="display:none;" @change="onFilePicked" />
      <br />
      <br />
      <div style="text-align:center;">
        <f7-link href="/signin/">Je possède déja un compte ?? Connectez-vous</f7-link>
      </div>
    </f7-block>
  </f7-page>
</template>

<script>
// import{
//     setTimeout
// } from 'timers';

import { mixin } from "../../js/mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      name: null,
      email: null,
      password: null,
      c_password
    };
  },
  computed: {
    profile_image() {
      return this.$store.getters.profile_image;
    },
    files() {
      return this.$store.getters.files;
    },
    signed_up() {
      return this.$store.getters.signed_up;
    }
  },
  watch: {
    signed_up(value) {
      if (value == true) {
        this.$f7router.navigate("/signin/");
      }
    }
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFilePicked() {
      //read the image file
      this.$store.dispatch("readFile");
    },
    signUp() {
      if (this.name === null || this.name === undefined || this.name === "") {
        alert("Please enter your name");
        return true;
      } else if (
        this.email === null ||
        this.email === undefined ||
        this.email === ""
      ) {
        alert("Please enter your email");
        return true;
      } else if (
        this.password === null ||
        this.password === undefined ||
        this.password === ""
      ) {
        alert("Please enter your password");
        return true;
      } else if (this.password.length < 8) {
        alert("Your password must be accept 8 characters minimal ");
        return true;
      } else if (this.password !== this.c_password) {
        alert("The password don't match");
        return true;
      } else {
        const self = this;
        let payload = {};
        payload.name = this.name;
        payload.email = this.email;
        payload.password = this.password;
        payload.profile_image = this.profile_image;
        if (self.files) {
          self.$store.dispatch("uploadFile").then(url => {
            payload.profile_image = url;
            self.$store.dispatch("signUp", payload);
          });
        } else {
          this.$store.dispatch("signUp", payload);
        }
        //alert(JSON.stringify(payload));
      }
    },
    created() {
      this.$store.commit("setSignedUp", false);
    }
  }
};
</script>

<style scoped>
.wrapper {
  text-align: center;
}

.image--cover {
  width: 150px;
  height: 150px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  margin: 20px;
  object-fit: cover;
  object-position: center;
}
</style>
