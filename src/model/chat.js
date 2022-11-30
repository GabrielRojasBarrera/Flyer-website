const {Schema, model} = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');


const ChatSchema = new Schema(
    {
        user: {type: String},
        msg:{type: String},   
        timestamp: {type: Date, default: Date.now},
       
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

ChatSchema.plugin(mongooseLeanVirtuals);

module.exports = model('Chat', ChatSchema);
