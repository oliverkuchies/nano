type NanoInstance<InitialState = unknown> = 
{
    value: InitialState
}

export const stateHashmap : Record<string, unknown> = {};

function storeInMap<InitialState>(identifier: string, instance: NanoInstance<InitialState>) {
    stateHashmap[identifier] = instance;
    return instance;
}

function findAndUpdateOrCreateState<InitialState>(identifier: string, initialState: InitialState) : NanoInstance<InitialState> {
    return storeInMap(identifier, createState<InitialState>(initialState, identifier))
}

function createState<InitialState>(initialState: InitialState, identifier: string) : NanoInstance<InitialState> {
    let currentState : InitialState = initialState;

    function setState(value : InitialState) {
        currentState = value;
        findAndUpdateOrCreateState(identifier, value);
    }

    const state = new Proxy(
        {
            value: currentState
        },
        {
            get: () => {
                return currentState; 
            },
            set: (_obj, _prop, value) => {
                setState(value);
                return true;
            }
        }
    );

    return state
}

export function useNano<InitialState>(identifier : string, initialState : InitialState) : NanoInstance<InitialState> {
    return findAndUpdateOrCreateState<InitialState>(identifier, initialState);
} 