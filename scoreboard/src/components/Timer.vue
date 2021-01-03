<template>
    <div class="w-full" align="center">
        <div class="flex w-full pb-4">
            <div class="flex w-1/3 items-center justify-center px-4">
                <div class="flex w-1/2  text-xs font-bold text-gray-600">
                    Car class (Chaser/Player):                              
                </div>         
                <div class="flex w-1/2 mx-2">
                    <select class="h-10 items-center text-sm block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="carClass">
                        <option value="">Select</option>
                        <option v-for="option in carClasses" v-bind:key="option.value" >
                            {{ option.text }}
                        </option>
                    </select>            
                </div>                 
            </div>
            <div class="flex w-1/3 bg-gray-500 text-black rounded-md text-6xl justify-center">{{ timeRemaining }}</div>
            <div class="flex w-1/3 items-center justify-center px-4">
                <div class="flex row w-1/5 mx-2 items-center">
                    <div class="flex text-xs font-bold text-gray-600">
                        Location:                              
                    </div>                         
                </div>
                <div class="flex row w-4/5 mx-2">
                    <select class="h-10 items-center text-sm block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="location">
                        <option value="">Location</option>
                        <option v-for="option in locations" v-bind:key="option.value">
                            {{ option.text }}
                        </option>
                    </select>            
                </div>                     
            </div>
        </div>
        <div class="flex w-full">
            <div class="flex w-1/3 justify-center items-center">
                <label class="w-full block text-gray-500 font-bold">
                    <input class="mr-2 leading-tight" type="checkbox" v-model="useStock">
                    <span class="text-xs">
                        Chasers Use Stock Vehicles
                    </span>
                </label> 
            </div>
            <div class="flex w-1/3 justify-center">
                <div v-if="showStart && !isRunning" class="w-full mx-2 pb-2"><button class="w-full bg-green-700 text-white hover:text-green-700 hover:bg-white rounded-md" @click="startTimer"> <font-awesome-icon :icon="['fas', 'stopwatch']" /> Start Timer</button></div>
                <div v-if="showPause && isRunning" class="w-full mx-2 pb-2"><button class="w-full text-red-700 bg-white hover:bg-red-700 hover:text-white rounded-md" @click="pauseTimer"> <font-awesome-icon :icon="['fas', 'pause-circle']" /> Pause Timer</button></div>
                <div v-if="!showStart && !isRunning" class="w-full mx-2 pb-2"><button class="w-full bg-green-700 text-white hover:text-green-700 hover:bg-white rounded-md" @click="continueTimer"><font-awesome-icon :icon="['fas', 'play-circle']" /> Continue Timer</button></div>
            </div>
            <div class="flex w-1/3 items-center justify-center">
                <label class="w-full block text-gray-500 font-bold">
                    <input class="mr-2 leading-tight" type="checkbox" v-model="useSimulation">
                    <span class="text-xs">
                        Use Simulation Damage
                    </span>
                </label>  
            </div>
        </div>
        <div v-if="isRunning || showPause" class="w-full">
            <button class="w-1/4 text-red-700 bg-white hover:bg-red-700 hover:text-white rounded-md" @click="cancelTimer"> <font-awesome-icon :icon="['fas', 'ban']" /> Cancel</button>
        </div>
        <div class="pb-4">
            <Players 
                :timerRunning="isRunning"
                :isTimerFinished="isFinished"
                :players="players"
                :chaser="chaser" />
        </div>          
        <div class="pb-4" v-if="isFinished">
            <button @click="saveData">Save</button>
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
            carClass: "",
            location: "",
            players: [],
            chaser: "",            
            useStock: false,
            useSimulation: false,            

            carClasses: [
                { text: "C/D", value: "C/D" },
                { text: "B/C", value: "B/C" },
                { text: "A/B", value: "A/B" },
                { text: "S1/A", value: "S1/A" },
                { text: "S2/S1", value: "S2/S1" },
                { text: "X/S2", value: "X/S2" }
            ],
            locations: [
                { text: "Ambleside", value: "A" },
                { text: "Broadway", value: "B" },
                { text: "Edinburgh", value: "E" }
            ],

            //startTime: 1200000,
            startTime: 10000,
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
        // this.timeRemaining = "20:00";
        this.timeRemaining = "00:10"

        this.$root.$on("changeChaser", name => {
            this.chaser = name;
        });        
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

                // if(this.currentTime < 6000 && this.currentTime > 0){
                //     var klaxon = new Audio(require("./../assets/sounds/Klaxon.wav"));
                //     klaxon.play();                
                // }

                if( this.currentTime <= 0){
                    this.timeRemaining = "00:00";
                    
                    this.showStart = true;
                    this.showPause = false;
                    this.isRunning = false;
                    this.isFinished = true;

                    clearInterval(this.timer);
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

            // this.startTime = 1200000;
            // this.timeRemaining = "20:00"
            this.startTime = 10000;
            this.timeRemaining = "00:10"

            clearInterval(this.timer);
        },

        saveData(){
            var msg = "";

            msg += "Car Class: " + this.carClass;
            msg += " Location: " + this.location;
            msg += " Chaser Use Stock: " + this.useStock;
            msg += " Simulation Damage: " + this.useSimulation;

            this.players.forEach((player) => {
                msg += " Player: " + player.name;
                msg += " - Tag Count: " + player.count;
            })

            msg += " Chaser: " + this.chaser;

            var json = JSON.stringify(msg);

            alert(json);

            //Todo - Find a way to store this... For Now - only store previous game.
        }     
    }
}
</script>

