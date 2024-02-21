<template>
    <div>
      <h3 style="margin-top:3%" >User Details</h3>
      <div v-if="loading"><div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
      </div>
    </div>
      <div v-else class="card" style="padding:3%;width: 25rem;margin:auto" >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" style="height:60px;width:60px" class="rounded mx-auto d-block" alt="...">
        <p>ID: {{ user.id }}</p>
        <h3 class="card-title" >{{ user.name }}</h3>
        <p style="margin-top:-12px">@{{ user.username }}</p>
        <p>Email: <a href="mailto:{{ user.email }}">{{ user.email }}</a></p>
        <p>Phone: {{ user.phone }}</p>
        <div>
        <label for="department">Department:</label><br>
        <select v-model="user.department" id="department" @change="updateUserDepartment" class="form-select" style="padding:10px">
          <option value="" disabled selected hidden>Please select department</option>
          <option v-for="department in departments" :key="department" :value="department">{{ department }}</option>
        </select>
        
      </div>
      </div>

     
    </div>
  </template>
  
  <script>
  export default {
    props: {
      userId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        loading: false,
        user: null,
        departments: ['Human Resource', 'Finance', 'Marketing'],
      };
    },
    watch: {
      userId(newUserId) {
        this.fetchUserDetails(newUserId);
      },
    },
    created() {
      this.fetchUserDetails(this.userId);
    },
    methods: {
      async fetchUserDetails(userId) {
        try {
          this.loading = true;
          const response = await this.$axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
          this.user = response.data;
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  