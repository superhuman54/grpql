import { mutationType } from "nexus";
import { ObjectDefinitionBlock } from "nexus/dist/definitions/objectType";

export const Mutation = mutationType({
    definition(def: ObjectDefinitionBlock<"Mutation">): void {
        def.string('pun', {
            resolve: (_parent, _args, _context) => {
                return 'pong';
            }
        })
    }
});
