<template lang="html">
	<div class="centerx">
		<vs-popup class="holamundo"  :title="title" :active.sync="popupActive">
			<div v-if="popupActive" class="view-preview w-full flex">
				<video-player ref="player" class="media-video-player card-video" :options="playerOptions" />
			</div>
		</vs-popup>
	</div>
</template>
<script>
import { videoPlayer }     from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
	props:{
		playerOptions:{
			type:Object,
			default(){
				return null
			}
		},

		title:{
			type:String,
			default:''
		},

		show:{
			type:Boolean,
			default:false
		}
	},

	components:{
    videoPlayer,
	},

	computed:{
		popupActive:{
			get(){
				return this.show
			},

			set(){
				this.$emit('close')
				// this.player.dispose()
				return false
			}
		},

		player() {
        return this.$refs.player.player
		}
	}
}
</script>