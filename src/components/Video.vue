<template>
	<div>
		<video controls class="mobile">
			<source :src="'/static/video/' + $route.params.id" type="video/mp4"/> Your browser does not support the video tag.
		</video>
	</div>
</template>
<script>
</script>