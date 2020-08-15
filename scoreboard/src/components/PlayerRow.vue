<template>
    <div class="flex sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div v-if="!editName" class="flex w-1/4">{{ player.name }}</div>
        <div v-else class="flex w-1/4">
            <input class="h-4 w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 focus:outline-none focus:bg-white focus:border-blue-500" v-model=player.name type="text"/>
        </div>
        <div class="flex w-1/5 justify-center">{{ player.count }}</div>
        <div class="flex w-1/5 justify-center"> <button @click="incrementCount" class="w-8 bg-green-700 text-white hover:bg-white hover:text-green-700 rounded-full "> <font-awesome-icon :icon="['fas', 'plus']" /> </button></div>
        <div class="flex w-1/5 justify-center"> <button @click="decrementCount" class="w-8 bg-red-700 text-white hover:bg-white hover:text-red-700 rounded-full items-center"> <font-awesome-icon :icon="['fas', 'minus']" /> </button></div>     
        <div v-if="!editName" class="flex w-1/3 content-center"> <button @click="editName = true" class="w-12 text-red-700 text-xs hover:bg-red-700 hover:text-white rounded-lg"> <font-awesome-icon :icon="['fas', 'edit']" /> Edit</button></div>     
        <div v-else class="flex w-1/3 content-center"> <button @click="editName = false" class="w-12 text-green-700 text-xs hover:bg-green-700 hover:text-white rounded-lg"> <font-awesome-icon :icon="['fas', 'save']" /> Save </button></div>     
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
