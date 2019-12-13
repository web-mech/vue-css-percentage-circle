<template>
	<div
		@click="(e) => $emit('click', e)"
		class="c100"
		:class="[`p${innerPercent}`, !complete ? activeColor : completeColor, size]">
	    <span>{{innerPercent}}%</span>
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
			},
			animate: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			complete() {
				return this.innerPercent == 100
			}
		},
		watch: {
			percent(percent) {
				this.checkAnimateTo()
			}
		},
		data() {
			return {
				innerPercent: 0,
				timeout: null,
				animationFrame: null
			}
		},
		mounted() {
			this.checkAnimateTo()
		},
		methods: {
			checkAnimateTo() {
				if (this.animate) {
					this.animateTo(true)
				} else {
					this.innerPercent = this.percent
				}
			},
			clearTimeout() {
				clearTimeout(this.timeout)
				Object.assign(this, {
					timeout: null
				})
			},
			animateTo(topFrame = false) {
				

				if (topFrame) {
					this.clearTimeout()		
				}

				if (this.percent > this.innerPercent && !this.complete) {
					this.innerPercent++
				}

				if (this.percent < this.innerPercent && this.innerPercent > 0) {
					this.innerPercent--
				}

		      	if (this.innerPercent !== this.percent) {
		        	this.timeout = setTimeout(() =>{
		        		this.animateTo()
		        	}, 5)
		        	return
		      	}
			}
		}
	}
</script>

<style lang="scss">
	@import '~css-percentage-circle'
</style>