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
		     * Size of percentage circle [micro, small, big]
		     */
			size: {
				type: String,
				default: 'small'
			},
			/**
			 * Color when active. [blue, green, orange]
			 */
			activeColor: {
				type: String,
				default: 'blue'
			},
			/**
			 * Color when complete. [blue, green, orange]
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

			/**
			 * Toggle between normal and dark themes
			 */
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
				/**
				* @private
				*/
				innerPercent: 0,
				/**
				* @private
				*/
				timeout: null
			}
		},
		mounted() {
			this.setPercent()
		},
		methods: {
			/**
			* @private
			*/
			setPercent() {
				if (this.animate) {
					this.stepTo(true)
				} else {
					this.innerPercent = this.percent
				}
			},
			/**
			* @private
			*/
			clearTimeout() {
				clearTimeout(this.timeout)
				Object.assign(this, {
					timeout: null
				})
			},
			/**
			* @private
			*/
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
			/**
			* @private
			*/
			onClick(event) {
				/**
			     * Click event.
			     *
			     * @event click
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