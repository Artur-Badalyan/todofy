'use strict';

module.exports = {
    updateTask: {
        properties: {
            title: { type: 'string', maxLength: 255 },
            description: { type: 'string', maxLength: 255 },
            date: { type: ['string', 'null'], maxLength: 255 },
            completed: { type: 'boolean' },
            important: { type: 'boolean' },
            directoryId: { type: ['number', 'null'], maxLength: 10 },
            userId: { type: 'number', maxLength: 10 },
            isListInView1: { type: 'boolean' }
        },
        required: [],
        additionalProperties: false
    },
    createTask: {
        properties: {
            title: { type: 'string', maxLength: 255 },
            description: { type: 'string', maxLength: 255 },
            date: { type: ['string', 'null'], maxLength: 255 },
            completed: { type: 'boolean' },
            important: { type: 'boolean' },
            directoryId: { type: ['number', 'null'], maxLength: 10 },
            userId: { type: 'number', maxLength: 10 }
        },
        required: ['title', 'date', 'userId'],
        additionalProperties: false
    },
    deleteTask: {
        properties: {
            taskId: { type: 'number', maxLength: 10 },
            // userId: { type: 'number', maxLength: 10 },
        },
        required: ['taskId'],
        additionalProperties: false
    },
};