import { extendType, idArg } from "nexus";
import { OutputDefinitionBlock } from "nexus/dist/definitions/definitionBlocks";
import { TASKS } from "./index";


export const TaskQueries = extendType({
    type: "Query",
    definition(t: OutputDefinitionBlock<'Query'>): void {
        t.field('task', {
            type: 'Task',
            args: {
                id: idArg({
                    required: true
                })
            },
            resolve: (_parent, args) => {
                const task = TASKS.find((task) => task.id === args.id);

                if (task) {
                    return task;
                }
                throw new Error(`Not found for ${args.id}`);
            }
        })

        t.list.field('tasks', {
            type: 'Task',
            resolve: () => {
                return TASKS;
            }
        })
    }
})
