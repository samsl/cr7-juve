<template>
	<div class="jumbotron">
		{{title}}
		<button v-show="!form" @click="form=true">{{button}}</button>
		<div v-show="form" class="upload-form">
			<div  class="form-group" v-for="field in fields">
	            <label>{{field.name}}:</label>
	            <img-select v-if="field.type === 'imgSelect'" :options="field.options" v-model="$parent[field.vueName]" @input="sendToParent(field)"></img-select>
	            <div class="file-input" v-else-if="field.type === 'file'">
	            <label  class="file-uploader">Choose
	            <input type="file" @change="fileChange(field, $event)">
	                    
	            </label>
	             <label class="file-path" v-show="choose">{{fileName}}</label>
	             </div>
	             <datetime v-else-if="field.type ==='date'||field.type === 'datetime'" :type="field.type" v-model="$parent[field.vueName]"></datetime>
	            <input v-else :type="field.type" :value="field.value" @change="sendToParent(field,$event.target.value)"/>     
	        </div>
	        <button @click="upload">Add</button>
	        <button @click="form=false">Cancel</button>
		</div>
	</div>
</template>
<script>
	import {Datetime} from 'vue-datetime'
	import ImgSelect from "./ImgSelect"
	import 'vue-datetime/dist/vue-datetime.css'
	export default ({
		props: ["title", "button", "fields", "uploadEvent"],
		data: function(){
			return{
				form: false,
				choose: false,
				fileName: ""
			}
		},
		methods: {			
			upload(){
				this.uploadEvent();
				this.fields.forEach(f=>{
					this.$parent[f.vueName] = "";
				});
				this.form=false;
			},
			sendToParent(field, $event){							
				if (field.changeEvent){
					field.changeEvent();
				}					
			},
			fileChange: function(field, $event) {
				console.log($event);
            	const file = event.target.files;
            	if (file.length > 1) {
                	this.error = "We only support upload one file at a time."
	            } else {
	            	const parent = this.$parent;
	                parent[field.vueName] = file[0];
	                this.choose = true;
	                this.fileName = file[0].name;
	            }
        	},
		},
		components: {
			ImgSelect, Datetime
		}
	})
</script>
<style lang="scss">
	.form-group {
	    width: 50%;
	    display: flex;
	    padding: 10px 10px;
	    
	    label {
	        width: 30%;
	    }
	  
	    .vdatetime{
	    	flex-grow:1;
	    	input{
	    		width: 100%;
	    		height: 34px;
	    	}
	    }
	    input {
	        padding: 0px 10px;
	        font-size: 20px;
	        flex-grow: 1;
	    }
	    select{
	        height: 34px;
	    }
	    .v-select{
	    	width: 70%;
	        
	    }
	    [type=search]{
	        width: 30% !important;
	    }
	    .dropdown li a {
	        font-size: 16px;
	        padding: 10px 20px;
	        display: flex;
	        align-items: center;
	    }
	}
	.file-input{

    	display: flex;
    	width: 70%;
    	label: 30%;
	    
	}

	.upload-form {
	    font-size: 20px;
	    font-weight: 400;
	    width: 80%;
	    margin: 10px auto;
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: center;
	}
	.jumbotron {
    width: 100%;
    margin: 20px auto;
    background-color: white;
    font-size: 30px;
    flex-wrap: wrap;
    font-weight: bold;
    @include centralize;
    padding: 20px 0px;
    
	}
	.file-uploader {
	    position: relative;
	    cursor: pointer;
	    width: 30% !important;
	    border: 1px solid #ccc;
	    border-radius: 8px;
	    font-family: $font;
	    font-size: 20px;
	    text-align: center;
	    padding: 0px 5px;

	    &:active {
	        border: 2px solid #ccc;
	    }
	    [type=file] {
	        opacity: 0;
	        width: 1px;
	        height: 1px;
	        position: absolute;
	    }
	}

	.file-path {
	    flex-grow: 1;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    max-width: 45%;
	    font-family: $font;
	    font-size: 20px;
	    padding: 0px 5px;
	}
</style>