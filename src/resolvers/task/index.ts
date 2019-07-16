import { objectType } from "nexus";
import { ObjectDefinitionBlock } from "nexus/dist/definitions/objectType";

interface Task {
    id: string,
    content: string,
    done: boolean
}

export const TASKS: Task[] = [];

export const Task = objectType({
    name: 'Task',
    definition(t: ObjectDefinitionBlock<'Task'>): void {
        t.id('id', {
            description: 'identifier'
        });
        t.string('content', {
            description: 'task content'
        });
        t.boolean('done', {
            description: 'indicated the task has been completed'
        })
    }
});

export * from './Query'
export * from './Mutation'

