<template>
	<v-select label="alt" :options="options" :value="value" @input="sendToParent">
        <template slot="option" slot-scope="option">
        	 <font-awesome-icon v-if="option.fontAwesome" :icon="option.class">{{option.alt}}</font-awesome-icon>
        	 <span v-else-if="option.noImg"></span>
            <img v-else class="small-img" :src="option.src" :alt="option.alt" @error="hideImg">{{option.alt}}</img>

        </template>
	</v-select>
</template>
<script>
	import vSelect from 'vue-select'
	export default ({
		props: ["options", "value"],		
		methods: {
			hideImg(event){
    			event.target.style.display="none";
    		},
    		sendToParent(value){    		
    			this.$emit("input", value);    			
    		}
		},
		components: {
			vSelect
		}
	})
</script>
<style lang="scss">
	.dropdown-menu {
		svg {
			margin-right: 10px;
		}
	}
</style>