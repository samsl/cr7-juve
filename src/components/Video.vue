<template>
	<div>
		<video controls class="mobile">
			<source :src="'https://drive.google.com/uc?export=download&id=' + $route.params.id" type="video/mp4"/> Your browser does not support the video tag.
		</video>
	</div>
</template>
<script>
</script>