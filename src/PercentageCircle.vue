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
			},
			refreshRate: {
				type: Number,
				default: 5
			}
		},
		computed: {
			complete() {
				return this.innerPercent == 100
			}
		},
		watch: {
			percent(percent) {
				this.setPercent()
			}
		},
		data() {
			return {
				innerPercent: 0,
				timeout: null
			}
		},
		mounted() {
			this.setPercent()
		},
		methods: {
			setPercent() {
				if (this.animate) {
					this.stepTo(true)
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
			stepTo(topFrame = false) {
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
					this.timeout = setTimeout(() => {
						this.stepTo()
					}, this.refreshRate)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~css-percentage-circle'
</style>