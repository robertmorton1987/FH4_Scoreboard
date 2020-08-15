<template>
    <div class="w-full" align="center">
        <div class="w-full pb-4">
            <div class="w-40 bg-gray-500 text-black rounded-md text-6xl">{{ timeRemaining }}</div>
        </div>
        <div class="w-full pb-4">
            <span v-if="showStart && !isRunning"><button class="w-1/4 bg-green-700 text-white rounded-md" @click="startTimer"> <font-awesome-icon :icon="['fas', 'stopwatch']" /> Start Timer</button></span>
            <span v-else-if="showPause && isRunning"><button class="w-1/4 bg-red-700 text-white rounded-md" @click="pauseTimer"> <font-awesome-icon :icon="['fas', 'pause-circle']" /> Pause Timer</button></span>
            <span v-if="!showStart && !isRunning"><button class="w-1/4 bg-green-700 text-white rounded-md" @click="continueTimer"><font-awesome-icon :icon="['fas', 'play-circle']" /> Continue Timer</button></span>
        </div>
        <div v-if="isRunning || showPause" class="w-full">
            <button class="w-1/4 text-red-700 bg-white hover:bg-red-700 hover:text-white rounded-md" @click="cancelTimer"> <font-awesome-icon :icon="['fas', 'ban']" /> Cancel</button>
        </div>
        <div class="pb-4">
            <Players 
                :timerRunning="isRunning"
                :isTimerFinished="isFinished" />
        </div>          
    </div>
</template>

<script>
import Players from './Players.vue'

export default {
    components: {
        Players
    },    
    data() {
        return {
            timeRemaining: "",
            startTime: 1200000,
            currentTime: 0,

            isRunning: false,
            isFinished: false,
            
            showPause: false,
            showStart: false,

            timer: null
        };
    },    
    created() {
        this.showStart = true;
        this.timeRemaining = "20:00";
    },
    
    methods: {
        startTimer(){
            this.showStart = false;
            this.showPause = true;
            this.isRunning = true;
            this.isFinished = false;

            this.currentTime = this.startTime;

            this.timer = setInterval(() => this.handleCountdown(), 1000);
        }, 

        handleCountdown(){

            if(this.isRunning)
            {
                this.currentTime = this.currentTime - 1000;

                if(this.currentTime < 6000 && this.currentTime > 0){
                    var klaxon = new Audio(require("./../assets/sounds/Klaxon.wav"));
                    klaxon.play();                
                }

                if( this.currentTime <= 0){
                    this.timeRemaining = "00:00";
                    
                    this.showStart = true;
                    this.showPause = false;
                    this.isRunning = false;
                    this.isFinished = true;
                } else {
                    var minutes = Math.floor((this.currentTime % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((this.currentTime % (1000 * 60)) / 1000);

                    if (minutes < 10) minutes = "0" + minutes;

                    if (seconds < 10) seconds = "0" + seconds;         
                    
                    this.timeRemaining = minutes + ":" + seconds;
                }
            }
        },

        pauseTimer() {

            this.showStart = false;
            this.showPause = false;
            this.isRunning = false;
        },

        continueTimer() {
            this.showStart = false;
            this.showPause = true;
            this.isRunning = true;
        },

        cancelTimer(){
            this.showStart = true;
            this.showPause = false;
            this.isRunning = false;

            this.startTime = 1200000;
            this.timeRemaining = "20:00"

            clearInterval(this.timer);
        }
    }
}
</script>