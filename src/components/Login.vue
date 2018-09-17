<template>
	<div id="login">		
		<div class="login-header">LOGIN</div>
		<div v-if="error" class="error-box">{{error}}</div>
		<div class="login-form">			
			<input type="text" placeholder="Username" v-model="username"/>
		</div>
		<div class="login-form">
			<input type="password" placeholder="Password" v-model="password"/>
		</div>
	<button class="login-btn centralize" @click="login">Login</button>
	</div>
</template>
<script>
	export default {
		data: function(){
			return {
				username: "",
				password: ""
			}
		},
		computed:{
			error(){
				return this.$store.getters.error;
			}
		},
		methods:{
			login(){
				this.$store.dispatch('login', {username: this.username, password: this.password}).then(()=>{
					this.$router.push('/pages/');
				});
			}
		}
	}
</script>
<style lang="scss">
	#login {
		color: white;
		width: 600px;
		max-width: 100%;
		margin: 200px auto;
		background: black;
		padding: 20px 0px;		
	}
	.login-header{
		text-align: center;
		font-weight: bold;
		padding: 20px 0px;
		font-size:18px;
	}
	.error-box{
		color: $red;
		text-align: center;
		padding-bottom: 10px;
	}
	.login-form{
		@include centralize;
		width: 100%;
		margin-bottom:10px;
		input {
			width: 240px;
			padding: 10px 20px;
			font-size: 14px;
			border: 2px solid white;
			&:focus {
				outline: none;
				border: 2px solid $gold !important;
			}
		}
	}
	.login-btn{
		border-radius: 0px;
		border: none;
		width: 240px;
		font-size:14px;
		color: black;
		background: $gold;
	}	

</style>