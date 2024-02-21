<template>
    <form @submit.prevent="submitForm">
    <div class="input-group">
        <div class="input-group-prepend">
        <span class="input-group-text" >Name</span>
        </div>
        <input v-model="formData.name" type="text" id="name" required class="form-control">
    </div>
    <br>
    <div class="input-group">
        <div class="input-group-prepend">
        <span class="input-group-text" >Username</span>
        </div>
        <input v-model="formData.username" type="text" id="username" required class="form-control">
    </div>
    <br>
  
    <div class="input-group">
        <div class="input-group-prepend">
        <span class="input-group-text" >Email</span>
        </div>
        <input v-model="formData.email" type="email" id="email" required class="form-control">
    </div>
    <br>

    <div class="input-group">
        <div class="input-group-prepend">
        <span class="input-group-text" >Phone</span>
        </div>
        <input v-model="formData.phone" type="phone" id="phone" required class="form-control">
    </div>
    <br>

      <button class="btn btn-primary btn-lg btn-block" style="font-size:14px" type="submit">{{ action === 'create' ? 'Create' : 'Update' }} User</button>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      user: Object,
      action: String,
    },
    data() {
      return {
        formData: {
          name: '',
          email: '',
          username:'',
          phone:'',
        },
      };
    },
    watch: {
      // Watch for changes to the "user" prop and update the local data
      user: {
        handler(newVal) {
          this.formData = { ...newVal };
        },
        immediate: true,
      },
    },
    methods: {
      submitForm() {
        // Emit an event to notify the parent component about the action
        this.$emit('submit', { ...this.formData }, this.action);
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    max-width: 400px;
    margin: auto;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
  }
  
  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px;
    border: none;
    cursor: pointer;
  }
  </style>
  