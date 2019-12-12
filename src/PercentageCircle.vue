<template>
	<div
		@click="(e) => $emit('click', e)"
		class="c100"
		:class="[`p${percent}`, !complete ? activeColor : completeColor, size]">
	    <span>{{percent}}%</span>
	    <div class="slice">
	        <div class="bar"></div>
	        <div class="fill"></div>
	    </div>
	</div>
</template>

<script>
	export default {
		props: {
			percent: {
				type: Number,
				default: 0
			},
			size: {
				type: String,
				default: 'small'
			},
			activeColor: {
				type: String,
				default: 'blue'
			},
			completeColor: {
				type: String,
				default: ''
			}
		},
		computed: {
			complete() {
				return this.percent == 100
			}
		}
	}
</script>

<style lang="scss">
	@import '~css-percentage-circle'
</style>