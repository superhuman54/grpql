import { booleanArg, extendType, idArg, stringArg } from "nexus";
import short from 'short-uuid'
import { OutputDefinitionBlock } from "nexus/dist/definitions/definitionBlocks";
import { TASKS } from "./index";

export const TaskMutations = extendType({
    type: "Mutation",
    definition(t: OutputDefinitionBlock<'Mutation'>): void {
        t.field('createTask', {
            type: 'Task',
            args: {
                content: stringArg({
                    required: true
                })
            },
            resolve: (_root, args) => {

                const newOne = {
                    id: short.generate(),
                    content: args.content,
                    done: false
                }

                TASKS.push(newOne);

                return newOne;
            }
        }) // create task

        t.field('updateTask', {
            type: 'Task',
            args: {
                id: idArg({
                    required: true
                }),
                content: stringArg(),
                done: booleanArg()
            },
            resolve: (_root, args) => {
                const foundIndex = TASKS.findIndex(task => task.id === args.id);

                if (foundIndex > -1) {
                    if (args.content) {
                        TASKS[foundIndex].content = args.content;
                    }
                    if (args.done) {
                        TASKS[foundIndex].done = args.done;
                    }
                    return TASKS[foundIndex];
                }
                throw new Error(`Not found for ${args.id}`);
            }
        }) // update task

        t.field('deleteTask', {
            type: 'Task',
            args: {
                id: idArg({
                    required: true
                })
            },
            resolve: (_root, args) => {
                const targetIndex = TASKS.findIndex(task => task.id === args.id);

                if (targetIndex > -1) {
                    const target = TASKS[targetIndex];
                    TASKS.splice(targetIndex, 1);

                    return target;
                }
                throw Error(`Not found for ${args.id}`);
            }
        })
    }
})
