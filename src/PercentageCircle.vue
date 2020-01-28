<template>
	<div
		@click="onClick"
		class="c100"
		:class="[
			`p${innerPercent}`,
			!complete ? activeColor : completeColor, size,
			darkMode ? 'dark' : '']">
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
			/**
		     * Percentage of progress (0-100)
		     */
			percent: {
				type: Number,
				default: 0
			},
			/**
		     * Size of percentage circle [small, large, huge]
		     */
			size: {
				type: String,
				default: 'small'
			},
			/**
			 * Color when active.
			 */
			activeColor: {
				type: String,
				default: 'blue'
			},
			/**
			 * Color when complete.
			 */
			completeColor: {
				type: String,
				default: ''
			},
			/**
		     * Animate percentage changes.
		     */
			animate: {
				type: Boolean,
				default: false
			},
			/**
			 * Only applicable when animated is set to true. Speed in which animation changes happen
			 */
			refreshRate: {
				type: Number,
				default: 5
			},
			darkMode: {
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
			},
			onClick(event) {
				/**
			     * Click event.
			     *
			     * @event success
			     * @property {object} click event object
			     */
				this.$emit('click', event)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~css-percentage-circle'
</style>