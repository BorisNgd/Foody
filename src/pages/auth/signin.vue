<template>
  <f7-page name="signin">
    <f7-navbar title="Se Connecter" back-link="Back"></f7-navbar>

    <f7-list no-airlines-md>
      <f7-list-input
        outline
        floating-label
        :value="email"
        @input="email=$event.target.value"
        label="Email"
        type="email"
        place-holder="Your E-mail"
        clear-button
      ></f7-list-input>

      <f7-list-input
        outline
        floating-label
        :value="password"
        @input="password=$event.target.value"
        label="Password"
        type="password"
        place-holder="Your Password"
        clear-button
      ></f7-list-input>
    </f7-list>

    <f7-block>
      <f7-button class="button button-fill button-raised" outline>SIGN IN</f7-button>
      <br />
      <br />
      <div style="text-align:center;">
        <f7-link href="/signup/">Don't have an account ? Sign Up here</f7-link>
      </div>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null
    };
  }
};
</script>
