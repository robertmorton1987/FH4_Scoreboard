const scoreboardSchema = {
    type: 'object',
    properties: {
        location: {
            type: 'string',
        },
        carClass: {
            type: 'string',
        },        
        runner: {
            type: 'string',
        },            
        isChaserStock: {
            type: 'boolean',
            default: false
        },
        useSimDamage: {
            type: 'boolean',
            default: false
        },        
        scores: {
            type: 'string',
        },        
    },
}; 
module.exports = scoreboardSchema;