const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        min: 50,
        max: 512,
        required: true,
    },
    content: {
        type: Number,
        min: 100,
        max: 10000,
        required: true,
    },
    image: {
        type: String,
        min: 20,
        required: true,
    },
    category: {
        type: String,
        enum: ['Thể thao', 'Điện ảnh', 'Trò chơi', 'Xã hội', 'Đời sống', 'Sức khỏe', 'Thể loại khác'],
        default: 'Thể loại khác'
    },
    isMain: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: String,
        default: Date.now,
    },
    updatedAt: {
        type: String,
        default: '',
    },
});

const News = mongoose.model('News', newsSchema);

module.exports = News;

