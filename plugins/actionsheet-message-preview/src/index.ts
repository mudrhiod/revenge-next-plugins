import patchActionSheet from './lib/patchActionSheet'

let cleanup: (() => void) | null = null;

export default plugin({
	start() {
		patchActionSheet()
	},
	stop() {
		if (cleanup) {
			cleanup()
			cleanup = null
		}
	},
})
