<template>
    <div>
        <div class="pb-4" align="center">
            <label>Chaser: 
                <button v-if="!editChaser" class="text-xs text-green-800 hover:bg-green-800 rounded-md hover:text-white border-none w-10" @click="startEditChaser">Edit</button>
                <button v-else class="text-xs text-green-800 hover:bg-green-800 hover:text-white border-none" @click="setChaser">Set</button>
            </label>
            <div v-if="editChaser">
                <input class="h-4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500" v-model=editedChaser type="text"/>
            </div>
            <div v-else> 
                {{ chaser }}
            </div>
        </div>
        <div align="center">
            <label class="pr-2 pb-2">Player List:</label>
            <button v-if="!addPlayer" class="text-xs text-green-800 hover:bg-green-800 rounded-md hover:text-white border-none w-20" @click="addPlayer = true">Add Player</button>
            <button v-else class="text-xs text-green-800 hover:bg-green-800 hover:text-white border-none" @click="addPlayerToList">Save</button>
            <div v-if="addPlayer">
                <input class="h-4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500" v-model=player type="text"/>
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

            playerToAdd.id = this.players.length + 1;
            playerToAdd.name = this.player;
            playerToAdd.count = 0;

            this.players.push(playerToAdd);

            this.addPlayer = false;
            this.player = "";
        },

        startEditChaser(){
            if(this.chaser === "None Selected"){
                this.editedChaser = "";
            } else {
                this.editedChaser = this.chaser;
            }

            this.editChaser = true;
        },

        setChaser(){
            this.chaser = this.editedChaser;

            this.editChaser = false;
            this.editedChaser = "";
        },

        setNextChaser(){
            
        }
    }
}
</script>