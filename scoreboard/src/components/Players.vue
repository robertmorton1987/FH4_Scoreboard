<template>
    <div>
        <div class="pb-4" align="center">
            <label>Chaser: 
            </label>
            <div v-if="editChaser">
                <div>
                    <input class="h-4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500" v-model=editedChaser type="text"/>
                </div>
                <div class="justify-evenly">
                    <button class="text-xs text-green-800 hover:bg-green-800 hover:text-white border-none rounded-md w-10" @click="setChaser">Set</button>
                    <button class="text-xs text-red-700 hover:bg-red-700 hover:text-white border-none rounded-md w-10" @click="cancelSetChaser">Cancel</button>               
                </div>
            </div>
            <div v-else> 
                {{ chaser }}
                <div>
                    <button class="text-xs text-green-800 hover:bg-green-800 rounded-md hover:text-white border-none w-10" @click="startEditChaser">Edit</button>
                </div>                
            </div>
        </div>
        <div align="center">
            <label class="pr-2 pb-2">Player List:</label>
            <div v-if="!addPlayer">
                <button class="text-xs text-green-800 hover:bg-green-800 rounded-md hover:text-white border-none w-20" @click="addPlayer = true">Add Player</button>
            </div>
            <div v-else>
                <div>
                    <input class="h-4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500" v-model=player type="text"/>
                </div>
                <div class="justify-evenly">
                    <button class="text-xs text-green-800 hover:bg-green-800 hover:text-white border-none rounded-md w-10" @click="addPlayerToList">Save</button>
                    <button class="text-xs text-red-700 hover:bg-red-700 hover:text-white border-none rounded-md w-10" @click="cancelAddPlayer">Cancel</button>                
                </div>
            </div>
            <div v-if="players.length > 0" class="pt-2">
                <div v-for="player in players" :key="player.id">
                    <PlayerRow
                        :player="player" />
                    <div class="py-2">
                        <hr />
                    </div>
                </div>
            </div>
        </div>     
        <div v-if="isTimerFinished" class="content-center">
            <button class="h-4 w-1/4 rounded-md text-xs bg-gray-700 text-white hover:text-gray-700 hover:bg-white hover:font-bold" @click="setNextChaser">
                Set Next Chaser
            </button>
        </div>   
    </div>
</template>

<script>
import PlayerRow from './PlayerRow.vue';

export default {
    components: {
        PlayerRow
    },

    props:{
        timerRunning: {
            type: Boolean,
            required: false,
            default: true
        },
        isTimerFinished: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data(){
        return {
            chaser: "None Selected",
            editedChaser: "",
            players: [],
            player: null,

            editChaser: false,
            addPlayer: false
        }
    },

    methods: {
        addPlayerToList(){
            var playerToAdd = {};

            playerToAdd.name = this.player;
            playerToAdd.count = 0;

            this.players.push(playerToAdd);

            this.addPlayer = false;
            this.player = "";
        },

        cancelAddPlayer(){
            this.player = "";
            this.addPlayer = false;
        },

        startEditChaser(){
            if(this.chaser === "None Selected"){
                this.editedChaser = "";
            } else {
                this.editedChaser = this.chaser;
            }

            this.editChaser = true;
        },

        cancelSetChaser(){
            this.editChaser = false;
            this.editedChaser = "";
        },

        setChaser(){
            this.chaser = this.editedChaser;

            this.editChaser = false;
            this.editedChaser = "";
        },

        setNextChaser(){
            var max = {};

            max.name = "";
            max.count = -1;

            this.players.forEach(player => {
                if(player.count > max.count){
                    max = player;
                }
            });

            var newPlayer = {};

            newPlayer.name = this.chaser;
            newPlayer.count = 0;

            this.chaser = max.name;

            max.name = newPlayer.name;

            this.players.forEach(player => {
                player.count = 0;
            });

            this.isTimerFinished = false;
        }
    }
}
</script>