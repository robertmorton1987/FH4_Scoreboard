<template>
    <div class="flex w-1/4">
        <div v-if="!editName" class="w-1/4">{{ player.name }}</div>
        <div v-else class="w-1/4">
            <input class="h-4 w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 focus:outline-none focus:bg-white focus:border-blue-500" v-model=player.name type="text"/>
        </div>
        <div class="w-1/5">{{ player.count }}</div>
        <div class="w-1/5 content-center"> <button @click="incrementCount" class="w-8 bg-green-700 text-white font-bold hover:bg-white hover:text-green-700 rounded-full "> + </button></div>
        <div class="w-1/5 content-center"> <button @click="decrementCount" class="w-8 bg-red-700 text-white font-bold hover:bg-white hover:text-red-700 rounded-full"> - </button></div>     
        <div v-if="!editName" class="w-1/3 content-center"> <button @click="editName = true" class="w-10 text-red-700 font-bold hover:bg-red-700 hover:text-white rounded-lg">Edit</button></div>     
        <div v-else class="w-1/3 content-center"> <button @click="editName = false" class="w-10 text-green-700 font-bold hover:bg-green-700 hover:text-white rounded-lg">Save</button></div>     
    </div>
</template>

<script>
export default {
    props:{
        player: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            editName: false
        };
    },       

    methods: {
        incrementCount(){
            this.player.count++;
        },

        decrementCount(){
            if(this.player.count >= 0){
                this.player.count--;
            }
        }
    }
}
</script>
